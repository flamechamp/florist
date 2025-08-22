from pydantic import BaseModel
from typing import List

# This defines the "recipe" item: a component ID and the quantity needed
class ProductCompositionCreate(BaseModel):
    component_id: int
    quantity: int

# The main schema now expects a list of composition items
class ProductCreate(BaseModel):
    name: str
    sale_price: float
    components: List[ProductCompositionCreate]

# --- Response Schemas ---
# We need a schema to represent the composition in the response
class ProductCompositionResponse(BaseModel):
    component_id: int
    quantity: int
    # You might want to include component name here too for convenience
    
    class Config:
        orm_mode = True

class ProductResponse(BaseModel):
    id: int
    name: str
    sale_price: float
    components: List[ProductCompositionResponse]

    class Config:
        orm_mode = True