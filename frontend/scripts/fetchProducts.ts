import { access, writeFile } from 'fs/promises';
import { join } from 'path';

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'http://localhost:8000/api/v1';
const OUTPUT_PATH = join(process.cwd(), 'src/data/products.json');

async function fetchProducts() {
  try {
    await access(OUTPUT_PATH);
    console.log('Products already exist at:', OUTPUT_PATH, '— skipping fetch.');
    return;
  } catch {
    // File does not exist, proceed with fetch
  }

  console.log('Fetching products from:', PRODUCT_SERVICE_URL);

  const response = await fetch(`${PRODUCT_SERVICE_URL}/products`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  
  console.log(`Fetched ${data.data?.length || 0} products`);

  await writeFile(OUTPUT_PATH, JSON.stringify(data, null, 2));
  
  console.log('Products saved to:', OUTPUT_PATH);
}

fetchProducts().catch((error) => {
  console.error('Error:', error.message);
  process.exit(1);
});
