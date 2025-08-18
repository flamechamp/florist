# app/api/routers.py
from fastapi import APIRouter
from .endpoints import orders, products, inventory, vendors, purchase_orders # Add purchase_orders

api_router = APIRouter()

api_router.include_router(orders.router, prefix="/orders", tags=["Orders"])
api_router.include_router(products.router, prefix="/products", tags=["Products"])
# ... other routers
api_router.include_router(purchase_orders.router, prefix="/purchase-orders", tags=["Purchasing"])