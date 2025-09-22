from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas import purchase_order_schemas
from app.services import purchase_order_service
from app.db.database import get_db
from fastapi.responses import Response
from app.services import pdf_service

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
    
@router.post("/generate-invoice", summary="Generate a PDF Invoice")
def generate_invoice(
    db: Session = Depends(get_db)
):
    """
    Generates a PDF for a sample order.
    In a real app, you'd fetch an order's details from the DB.
    """
    # --- This is sample data. You would get this from your database. ---
    sample_customer_name = "Ms Meri Gajali"
    sample_items = [
        {"description": "Bunga meja\nHappy Birthday, Pak Tikno!\nFrom Meri, Edi F, Tata, Dwi, Mega  S, Heykal, Arif, Yoga, Fauzi", "price": 2700000.00, "quantity": 1, "total": 2700000.00},
        {"description": "Ongkos Kirim", "price": 100000.00, "quantity": 1, "total": 100000.00},
    ]
    sample_total = 2800000.00
    # --------------------------------------------------------------------

    try:
        pdf_bytes, filename = pdf_service.generate_invoice_pdf(
            db=db,
            customer_name=sample_customer_name,
            items=sample_items,
            total=sample_total
        )

        headers = {
            'Content-Disposition': f'inline; filename="{filename}.pdf"'
        }
        return Response(
            content=pdf_bytes, 
            media_type='application/pdf', 
            headers=headers
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate PDF: {e}")