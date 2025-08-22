from sqlalchemy.orm import Session
from app.db import models
from app.schemas import purchase_order_schemas

def create_purchase_order_and_update_inventory(
    db_session: Session, po_data: purchase_order_schemas.PurchaseOrderCreate
):
    try:
        total_cost = sum(item.quantity * item.purchase_price for item in po_data.items)
        new_po = models.PurchaseOrder(vendor_id=po_data.vendor_id, total_cost=total_cost)
        db_session.add(new_po)
        db_session.flush()

        for item_data in po_data.items:
            po_item = models.PurchaseOrderItem(
                purchase_order_id=new_po.id,
                inventory_item_id=item_data.inventory_item_id,
                quantity=item_data.quantity,
                purchase_price=item_data.purchase_price
            )
            db_session.add(po_item)

            inventory_item = db_session.query(models.InventoryItem).filter(
                models.InventoryItem.id == item_data.inventory_item_id
            ).first()

            if inventory_item:
                inventory_item.quantity_on_hand += item_data.quantity
            else:
                raise ValueError(f"Inventory item with ID {item_data.inventory_item_id} not found.")

        db_session.commit()
        db_session.refresh(new_po)
        return new_po
    except Exception as e:
        db_session.rollback()
        raise e