import json
import os
import time

from definitions.raw_product import RawProduct
from gemini.config import (
    MODEL_NAME,
    client,
    generate_content_config,
)


def prepare_input_product_str(products: list[RawProduct]) -> list[str]:
    batches = []
    for i in range(0, len(products), 10):
        batch = products[i : i + 10]
        batch_str = '\n---\n'.join(str(product) for product in batch)
        batches.append(batch_str)
    print(f'Created {len(batches)} batches from {len(products)} products')
    return batches


def save_batch_progress(completed_batches):
    track_path = os.path.join(project_root, 'services', 'product', 'data', 'batch_progress.json')
    with open(track_path, 'w') as f:
        json.dump(completed_batches, f)


def load_successful_batches():
    track_path = os.path.join(project_root, 'services', 'product', 'data', 'batch_progress.json')
    if os.path.exists(track_path):
        with open(track_path) as f:
            return json.load(f)
    return []


def save_successful_batch(batch_index):
    track_path = os.path.join(project_root, 'services', 'product', 'data', 'batch_progress.json')
    successful = load_successful_batches()
    if batch_index not in successful:
        successful.append(batch_index)
        with open(track_path, 'w') as f:
            json.dump(successful, f)


def generate_product_info(batches: list[str]) -> list[str]:
    data = []
    total_batches = len(batches)
    successful_batches = load_successful_batches()
    completed_batches = successful_batches.copy()
    batch_index = 0

    while batch_index < total_batches:
        if batch_index in successful_batches:
            print(f'Skipping batch {batch_index + 1} (already processed)')
            batch_index += 1
            continue

        i = batch_index + 1
        batch = batches[batch_index]
        print(f'\nProcessing batch [{i}/{total_batches}]...')
        first_product = batch.split('\n---\n')[0]
        print(f'Batch preview: {first_product[:100]}...')

        try:
            response = client.models.generate_content(
                model=MODEL_NAME,
                contents=[batch],
                config=generate_content_config,
            )

            if response.text:
                try:
                    parsed_data = json.loads(response.text)
                    if isinstance(parsed_data, list):
                        expected_products = 10 if i < total_batches - 1 else (len(batches) % 10 or 10)
                        actual_products = len(parsed_data)

                        if actual_products != expected_products:
                            print(f'WARNING: Expected {expected_products} products, got {actual_products} in batch {i}')

                        data.extend(parsed_data)
                        print(f'Added {actual_products} products from batch (Total: {len(data)})')

                        if parsed_data and len(parsed_data) > 0:
                            first_product = parsed_data[0]
                            print(f'First product in batch {i}:')
                            print(f'  Name: {first_product.get("name", "N/A")}')
                            print(f'  Brand: {first_product.get("brand", "N/A")}')
                            print(f'  Summary: {first_product.get("summary", "N/A")[:100]}...')
                    else:
                        data.append(parsed_data)
                        print(f'Added 1 product from this batch (Total: {len(data)})')
                except json.JSONDecodeError:
                    data.append(response.text)
                    print('Stored as string (JSON parsing failed)')
                print(f'Generated content length: {len(response.text)} characters')
            else:
                print('No content generated for this batch')

            if batch_index < total_batches - 1:
                print('Waiting 30 seconds before next batch...')
                time.sleep(30)
            batch_index += 1
            completed_batches.append(batch_index - 1)

        except Exception as e:
            print(f'\nError processing batch {i}: {str(e)}')

            if 'RESOURCE_EXHAUSTED' in str(e) or 'quota' in str(e).lower():
                print('Daily quota exceeded! Saving progress and exiting...')
                write_output(data)
                save_batch_progress(completed_batches)
                print(f'Progress saved: {len(data)} products generated')
                print(
                    'To resume tomorrow, re-run the script - it will skip '
                    'already processed products. You can resume from where '
                    'you left off.'
                )
                break

            if batch_index < total_batches - 1:
                print('Retrying same batch after 30 seconds...')
                time.sleep(30)

    save_batch_progress(completed_batches)
    return data


def write_output(data: list[str]) -> None:
    output_path = os.path.join(project_root, 'services', 'product', 'data', 'generated_products.json')
    with open(output_path, 'w') as f:
        json.dump(data, f, indent=2)


project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))

data_file_path = os.path.join(project_root, 'services', 'product', 'data', 'products.json')


def get_or_generate_products() -> list[str]:
    output_path = os.path.join(project_root, 'services', 'product', 'data', 'generated_products.json')

    if os.path.exists(output_path):
        print('Found existing generated_products.json, loading from cache')
        with open(output_path) as f:
            return json.load(f)

    print('No existing generated_products.json found, starting generation pipeline')
    print(f'Attempting to read products from {data_file_path}')

    if not os.path.exists(data_file_path):
        print(f'Error: File not found at {data_file_path}')
        exit(1)

    with open(data_file_path) as f:
        products: list[RawProduct] = json.load(f)

    print(f'Loaded {len(products)} products. Preparing to generate with Gemini...')
    batches = prepare_input_product_str(products)
    print(f'Prepared {len(batches)} batches of products.')

    data = generate_product_info(batches)
    write_output(data)
    return data


if __name__ == '__main__':
    data = get_or_generate_products()
    print(f'Total products: {len(data)}')
