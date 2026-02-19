from datetime import datetime, timedelta
from decimal import Decimal

from sqlalchemy.orm import selectinload
from sqlmodel import Session, select

from models import Order, OrderItem, OrderItemCreate, OrderStatus
from serializers import serialize_order, serialize_order_item


def get_order_item(session: Session, order_id: int, item_id: int):
    statement = select(OrderItem).where(OrderItem.order_id == order_id, OrderItem.id == item_id)
    return session.exec(statement).first()


def add_item_to_order(session: Session, order_id: int, item_data: OrderItemCreate):
    order = session.get(Order, order_id)
    if not order:
        return None

    product_total_price = item_data.product_unit_price * item_data.product_quantity

    order_item = OrderItem(
        order_id=order_id,
        product_id=item_data.product_id,
        product_name=item_data.product_name,
        product_brand=item_data.product_brand,
        product_description=item_data.product_description,
        product_image=item_data.product_image,
        product_unit_price=item_data.product_unit_price,
        product_total_price=product_total_price,
        product_quantity=item_data.product_quantity,
    )

    session.add(order_item)
    session.commit()
    session.refresh(order_item)

    return serialize_order_item(order_item)


def remove_item_from_order(session: Session, order_id: int, item_id: int):
    try:
        item = get_order_item(session, order_id, item_id)
        if not item:
            return False

        session.delete(item)
        session.commit()
        return True
    except Exception as e:
        session.rollback()
        raise e


def create_order(
    session: Session,
    user_id: str,
    items_data: list[dict],
    purchase_date: datetime,
    total_price: Decimal,
):
    expected_delivery_date = purchase_date + timedelta(weeks=1)

    order = Order(
        user_id=user_id,
        purchase_date=purchase_date,
        expected_delivery_date=expected_delivery_date,
        total_price=total_price,
        status=OrderStatus.PENDING,
    )
    try:
        session.add(order)
        session.flush()

        items_list: list[OrderItem] = []
        for item in items_data:
            order_item = OrderItem(
                order_id=order.id,
                product_id=item.get('product_id', 1),
                product_name=item.get('product_name', 'Unknown Product'),
                product_brand=item.get('product_brand', 'Unknown Brand'),
                product_description=item.get('product_description', ''),
                product_image=item.get('product_image', ''),
                product_unit_price=Decimal(str(item.get('product_unit_price', 0))),
                product_total_price=Decimal(str(item.get('product_total_price', 0))),
                product_quantity=item.get('product_quantity', 1),
            )
            items_list.append(order_item)

        session.add_all(items_list)
        session.commit()
        session.refresh(order)

        session.refresh(order, ['items'])
        return serialize_order(order)
    except Exception as err:
        session.rollback()
        raise Exception('Failed to create order') from err


def get_order_by_id(session: Session, order_id: int):
    try:
        statement = select(Order).options(selectinload(Order.items)).where(Order.id == order_id)
        order = session.exec(statement).first()

        return serialize_order(order) if order else None
    except Exception as e:
        raise Exception(f'Failed to get order by ID: {str(e)}') from e


def get_orders_by_user_id(session: Session, user_id: str):
    try:
        statement = select(Order).options(selectinload(Order.items)).where(Order.user_id == user_id)
        orders = session.exec(statement).all()

        return [serialize_order(order) for order in orders]
    except Exception as e:
        raise Exception(f'Failed to get orders by user ID: {str(e)}') from e


def update_order_status(session: Session, order_id: int, new_status: OrderStatus):
    try:
        order = session.get(Order, order_id)
        if not order:
            return None
        order.status = new_status
        session.add(order)
        session.commit()
        session.refresh(order)

        session.refresh(order, ['items'])
        return serialize_order(order)
    except Exception as e:
        raise Exception(f'Failed to update order status: {str(e)}') from e


def delete_order(session: Session, order_id: int) -> bool:
    order = session.get(Order, order_id)
    if not order:
        return False
    try:
        session.delete(order)
        session.commit()
        return True
    except Exception as e:
        session.rollback()
        raise Exception(f'Failed to delete order: {str(e)}') from e
