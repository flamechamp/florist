# app/services/purchase_order_service.py

from sqlalchemy.orm import Session
from .. import db, schemas

def create_purchase_order_and_update_inventory(
    db_session: Session, po_data: schemas.purchase_order_schemas.PurchaseOrderCreate
):
    """
    Creates a purchase order record and updates inventory levels in a single transaction.
    """
    # Start a transaction (handled by dependency injection, but conceptually here)
    try:
        # 1. Calculate total cost
        total_cost = sum(item.quantity * item.purchase_price for item in po_data.items)

        # 2. Create the main PurchaseOrder record
        new_po = db.models.PurchaseOrder(
            vendor_id=po_data.vendor_id,
            total_cost=total_cost
        )
        db_session.add(new_po)
        db_session.flush() # Assigns an ID to new_po without committing

        # 3. Create PurchaseOrderItem records and update inventory
        for item_data in po_data.items:
            # Create the purchase order item linked to the main PO
            po_item = db.models.PurchaseOrderItem(
                purchase_order_id=new_po.id,
                inventory_item_id=item_data.inventory_item_id,
                quantity=item_data.quantity,
                purchase_price=item_data.purchase_price
            )
            db_session.add(po_item)

            # Find the inventory item to update its stock
            inventory_item = db_session.query(db.models.InventoryItem).filter(
                db.models.InventoryItem.id == item_data.inventory_item_id
            ).first()

            if inventory_item:
                inventory_item.quantity_on_hand += item_data.quantity
            else:
                # If item doesn't exist, raise an error and the transaction will roll back
                raise ValueError(f"Inventory item with ID {item_data.inventory_item_id} not found.")

        db_session.commit() # Commit all changes to the database
        db_session.refresh(new_po)
        return new_po

    except Exception as e:
        db_session.rollback() # If any step fails, undo everything
        raise e