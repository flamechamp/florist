from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas import purchase_order_schemas
from app.services import purchase_order_service
from app.db.database import get_db

router = APIRouter()

@router.post("/", response_model=purchase_order_schemas.PurchaseOrderResponse)
def create_purchase_order(
    po_data: purchase_order_schemas.PurchaseOrderCreate,
    db: Session = Depends(get_db)
):
    try:
        return purchase_order_service.create_purchase_order_and_update_inventory(
            db_session=db, po_data=po_data
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="An internal error occurred.")