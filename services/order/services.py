from collections import defaultdict
from datetime import datetime, timedelta
from decimal import Decimal
from sqlmodel import select, Session
from models import Order, OrderItem, OrderStatus
from util import order_to_dict


def create_order(
    session: Session,
    user_id: int,
    items_data: list[OrderItem],
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
                product_id=item.product_id,
                product_name=item.product_name,
                product_brand=item.product_brand,
                product_description=item.product_description,
                product_image=item.product_image,
                product_unit_price=item.product_unit_price,
                product_total_price=item.product_total_price,
                product_quantity=item.product_quantity,
            )
            items_list.append(order_item)

        session.add_all(items_list)
        session.commit()
        return order
    except Exception:
        session.rollback()
        raise Exception('Failed to create order')


def get_order_by_id(session: Session, order_id: int):
    try:
        statement = (
            select(Order, OrderItem)
            .where(Order.id == order_id)
            .join(OrderItem, isouter=True)
        )
        result = session.exec(statement).all()

        order, *_ = result[0]
        items = [item for _, item in result]
        setattr(order, 'items', items)
        return order_to_dict(order)
    except Exception as e:
        raise Exception(f'Failed to get order by ID: {str(e)}')


def get_orders_by_user_id(session: Session, user_id: int):
    statement = (
        select(Order, OrderItem)
        .where(Order.user_id == user_id)
        .join(OrderItem, isouter=True)
    )
    result = session.exec(statement).all()

    orders_map = defaultdict(list)
    orders = {}

    for order, item in result:
        orders[order.id] = order
        if item:
            orders_map[order.id].append(item)

    order_list = []
    for order_id, order in orders.items():
        items = orders_map.get(order_id, [])
        setattr(order, 'items', items)
        order_list.append(order_to_dict(order))

    return order_list


def update_order_status(
    session: Session, order_id: int, new_status: OrderStatus
):
    order = session.get(Order, order_id)
    if not order:
        return None
    order.status = new_status
    try:
        session.add(order)
        session.commit()
        session.refresh(order)
        return order_to_dict(order)
    except Exception as e:
        session.rollback()
        raise Exception(f'Failed to update order status: {str(e)}')


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
        raise Exception(f'Failed to delete order: {str(e)}')
