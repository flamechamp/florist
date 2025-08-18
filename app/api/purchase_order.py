# app/api/endpoints/purchase_orders.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ... import schemas, services
from ...db.database import get_db # Your dependency to get a DB session

router = APIRouter()

@router.post(
    "/",
    response_model=schemas.purchase_order_schemas.PurchaseOrderResponse,
    summary="Create Purchase Order and Add to Inventory"
)
def create_purchase_order(
    po_data: schemas.purchase_order_schemas.PurchaseOrderCreate,
    db: Session = Depends(get_db)
):
    """
    Receives a list of purchased flowers and a vendor.
    1. Creates a new PurchaseOrder record.
    2. Adds the purchased quantities to the main inventory.
    """
    try:
        created_po = services.purchase_order_service.create_purchase_order_and_update_inventory(
            db_session=db, po_data=po_data
        )
        return created_po
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="An internal error occurred.")