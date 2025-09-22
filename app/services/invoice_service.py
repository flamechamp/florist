from sqlalchemy.orm import Session
from app.db import models

def get_next_invoice_number(db: Session) -> int:
    """
    Gets the next invoice number in a thread-safe way.
    """
    counter = db.query(models.InvoiceCounter).with_for_update().first()
    if not counter:
        # First time running, create the counter starting at 1
        counter = models.InvoiceCounter(last_invoice_number=1)
        db.add(counter)
    else:
        counter.last_invoice_number += 1

    db.commit()
    return counter.last_invoice_number