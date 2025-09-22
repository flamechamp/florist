from fastapi import APIRouter
from app.api.endpoints import purchase_orders, products, components # 1. Import components

api_router = APIRouter()
api_router.include_router(purchase_orders.router, prefix="/purchase-orders", tags=["Purchase Orders"])
api_router.include_router(products.router, prefix="/products", tags=["Products"])
api_router.include_router(components.router, prefix="/components", tags=["Components"]) # 2. Include the new router