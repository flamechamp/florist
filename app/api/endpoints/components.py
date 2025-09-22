from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.schemas import component_schemas
from app.services import component_service
from app.db.database import get_db

router = APIRouter()

@router.get("/", response_model=List[component_schemas.ComponentResponse])
def get_all_components(db: Session = Depends(get_db)):
    """
    Retrieves a list of all master components.
    """
    return component_service.get_all_components(db_session=db)