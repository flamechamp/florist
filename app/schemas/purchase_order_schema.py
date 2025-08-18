# app/schemas/purchase_order_schemas.py

from pydantic import BaseModel
from typing import List

# This schema defines a single item in the purchase list
class PurchaseOrderItemCreate(BaseModel):
    inventory_item_id: int
    quantity: int
    purchase_price: float

# This is the main schema for the incoming request
class PurchaseOrderCreate(BaseModel):
    vendor_id: int
    items: List[PurchaseOrderItemCreate]

# --- Response Schemas (what the API sends back) ---
class PurchaseOrderItemResponse(PurchaseOrderItemCreate):
    id: int

    class Config:
        orm_mode = True # Helps Pydantic read data from ORM models

class PurchaseOrderResponse(BaseModel):
    id: int
    vendor_id: int
    total_cost: float
    items: List[PurchaseOrderItemResponse]

    class Config:
        orm_mode = True