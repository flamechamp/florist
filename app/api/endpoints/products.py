from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.schemas import product_schemas
from app.services import product_service
from app.db.database import get_db

router = APIRouter()

@router.post("/", response_model=product_schemas.ProductResponse)
def create_product(
    product_data: product_schemas.ProductCreate,
    db_session: Session = Depends(get_db)
):
    return product_service.create_product_with_components(
        db_session=db_session, product_data=product_data
    )

@router.get("/", response_model=List[product_schemas.ProductResponse])
def get_all_products(
    skip: int = 0, limit: int = 100, db_session: Session = Depends(get_db)
):
    return product_service.get_all_products(db_session, skip, limit)

# Add placeholder files for other endpoints if they don't exist