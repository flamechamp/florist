from fastapi import APIRouter
from app.api.endpoints import purchase_orders, products
# Import other endpoint modules here as you create them (e.g., vendors, inventory)

api_router = APIRouter()
api_router.include_router(purchase_orders.router, prefix="/purchase-orders", tags=["Purchase Orders"])
api_router.include_router(products.router, prefix="/products", tags=["Products"])
# Include other routers here