import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware

from logger import logger
from products import (
    fetch_all_products,
    fetch_product_by_id,
    fetch_products_by_brand,
    fetch_products_by_category,
    fetch_products_by_name,
)

app = FastAPI()

origins = [
    'http://localhost',
    'http://localhost:3000',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['GET'],
    allow_headers=['*'],
)

app.add_middleware(GZipMiddleware, minimum_size=1000, compresslevel=5)


@app.get('/api/v1/health')
def health_check():
    return {'message': 'Product service is running.'}


@app.get('/api/v1/products')
async def get_products():
    return await fetch_all_products()


@app.get('/api/v1/products/{product_id}')
async def get_product(product_id: int):
    return await fetch_product_by_id(product_id)


@app.get('/api/v1/products/category/{category}')
async def get_products_by_category(category: str):
    return await fetch_products_by_category(category)


@app.get('/api/v1/products/brand/{brand}')
async def get_products_by_brand(brand: str):
    return await fetch_products_by_brand(brand)


@app.get('/api/v1/products/search/{name}')
async def get_products_by_name(name: str):
    return await fetch_products_by_name(name)


if __name__ == '__main__':
    logger.info('Starting product service on port 8000')
    uvicorn.run(app, host='0.0.0.0', port=8000)
