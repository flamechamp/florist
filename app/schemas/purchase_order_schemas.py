from pydantic import BaseModel
from typing import List

class PurchaseOrderItemCreate(BaseModel):
    inventory_item_id: int
    quantity: int
    purchase_price: float

class PurchaseOrderCreate(BaseModel):
    vendor_id: int
    items: List[PurchaseOrderItemCreate]

class PurchaseOrderItemResponse(PurchaseOrderItemCreate):
    id: int
    class Config:
        orm_mode = True

class PurchaseOrderResponse(BaseModel):
    id: int
    vendor_id: int
    total_cost: float
    items: List[PurchaseOrderItemResponse]
    class Config:
        orm_mode = True