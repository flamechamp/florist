from pydantic import BaseModel

class ComponentResponse(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True