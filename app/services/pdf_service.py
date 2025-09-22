from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML
from app.services import invoice_service
from sqlalchemy.orm import Session
from datetime import datetime
import pathlib

def generate_invoice_pdf(db: Session, customer_name: str, items: list, total: float) -> bytes:
    """
    Generates a PDF invoice from an HTML template.
    """
    # 1. Get the next invoice number
    # next_inv_num = invoice_service.get_next_invoice_number(db)
    # invoice_number_str = f"IV-{datetime.now().strftime('%m%d%y')}-cp{next_inv_num}"
    next_inv_num = 1016
    invoice_number_str = f"IV-{datetime.now().strftime('%m')}{next_inv_num:04}-cp{datetime.now().strftime('%y')}"

    # 2. Set up Jinja2 to load the template
    env = Environment(loader=FileSystemLoader('./templates'))
    template = env.get_template('invoice_template.html')
    logo_path = pathlib.Path('templates/assets/header_invoice.png').resolve()
    whatsapp_icon_path = pathlib.Path('templates/assets/whatsapp.png').resolve()
    mail_icon_path = pathlib.Path('templates/assets/mail.png').resolve()
    instagram_icon_path = pathlib.Path('templates/assets/instagram.png').resolve()

    # 3. Prepare the data for the template
    template_data = {
        "invoice_number": invoice_number_str,
        "customer_name": customer_name,
        "date": datetime.now().strftime('%d-%b-%y'),
        "items": items,
        "total": total,
        "logo_url": logo_path.as_uri(),
        "whatsapp_icon_url": whatsapp_icon_path.as_uri(),
        "mail_icon_url": mail_icon_path.as_uri(),
        "instagram_icon_url": instagram_icon_path.as_uri(),
    }

    # 4. Render the HTML with the data
    rendered_html = template.render(template_data)

    # 5. Convert the rendered HTML to a PDF
    pdf_bytes = HTML(string=rendered_html).write_pdf()

    return pdf_bytes, invoice_number_str