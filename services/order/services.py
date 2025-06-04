from datetime import datetime, timedelta, timezone

from app import db

from models import Order, OrderItem, OrderStatus


def create_order(user_id: int, items_data: list, purchase_date: datetime = None) -> Order:
    if purchase_date is None:
        purchase_date = datetime.now(timezone.utc)

    expected_delivery_date = purchase_date + timedelta(weeks=1)

    new_order = Order(
        user_id=user_id,
        purchase_date=purchase_date,
        expected_delivery_date=expected_delivery_date,
        status=OrderStatus.PENDING
    )

    for item_data in items_data:
        order_item = OrderItem(
            product_id=item_data['product_id'],
            product_name=item_data['product_name'],
            product_brand=item_data['product_brand'],
            product_description=item_data['product_description'],
            product_image=item_data['product_image'],
            product_unit_price=item_data['product_unit_price'],
            product_total_price=item_data['product_total_price'],
            product_quantity=item_data['product_quantity']
        )
        new_order.items.append(order_item)

    db.session.add(new_order)
    db.session.commit()
    return new_order

def get_order_by_id(order_id: int) -> Order | None:
    return db.session.get(Order, order_id)

def get_orders_by_user_id(user_id: int) -> list[Order]:
    return db.session.execute(db.select(Order).where(Order.user_id == user_id)).scalars().all()

def update_order_status(order_id: int, new_status: OrderStatus) -> Order | None:
    order = db.session.get(Order, order_id)
    if order:
        order.status = new_status
        db.session.commit()
        return order
    return None

def delete_order(order_id: int) -> bool:
    order = db.session.get(Order, order_id)
    if order:
        db.session.delete(order)
        db.session.commit()
        return True
    return False
