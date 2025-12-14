from flask import Blueprint, jsonify, request
from pydantic import ValidationError

from database import get_session
from models import Order, OrderCreate, OrderItemCreate, OrderStatus
from response import ErrorResponse, SuccessResponse
from services import (
    add_item_to_order,
    create_order,
    delete_order,
    get_order_by_id,
    get_order_item,
    get_orders_by_user_id,
    remove_item_from_order,
    update_order_status,
)

orders_bp = Blueprint('orders', __name__, url_prefix='/orders')


@orders_bp.route('', methods=['POST'])
def create_order_route():
    try:
        payload = request.get_json()
        if not payload:
            return jsonify(ErrorResponse(success=False, error='No data provided').model_dump()), 400

        validated_data = OrderCreate.model_validate(payload)

        with get_session() as session:
            new_order: Order = create_order(
                session=session,
                user_id=validated_data.user_id,
                items_data=validated_data.items,
                purchase_date=validated_data.purchase_date,
                total_price=validated_data.total_price,
            )

        return jsonify(
            SuccessResponse(
                success=True,
                message='Order created',
                data=new_order,
            ).model_dump(mode='json')
        ), 201

    except ValidationError:
        return jsonify(ErrorResponse(success=False, error='Invalid input format or missing fields.').model_dump()), 400
    except Exception:
        import traceback

        traceback.print_exc()
        return jsonify(
            ErrorResponse(
                success=False,
                error='An unexpected error occurred. Please try again.',
            ).model_dump()
        ), 500


@orders_bp.route('/debug', methods=['GET'])
def debug_orders():
    try:
        with get_session() as session:
            from sqlmodel import select

            orders = session.exec(select(Order)).all()
            order_ids = [order.id for order in orders]
            return jsonify({'success': True, 'order_ids': order_ids, 'count': len(order_ids)})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@orders_bp.route('/<int:order_id>/items', methods=['GET'])
def get_order_items_route(order_id: int):
    try:
        with get_session() as session:
            order = get_order_by_id(session=session, order_id=order_id)
            if not order:
                return jsonify(ErrorResponse(success=False, error='Order not found').model_dump()), 404

            return jsonify(
                SuccessResponse(success=True, message='Order items retrieved', data=order.get('items', [])).model_dump()
            ), 200
    except Exception:
        return jsonify(
            ErrorResponse(success=False, error='An error occurred while fetching order items').model_dump()
        ), 500


@orders_bp.route('/<int:order_id>/items/<int:item_id>', methods=['GET'])
def get_order_item_route(order_id: int, item_id: int):
    try:
        with get_session() as session:
            item = get_order_item(session=session, order_id=order_id, item_id=item_id)
            if not item:
                return jsonify(ErrorResponse(success=False, error='Item not found').model_dump()), 404

            return jsonify(SuccessResponse(success=True, message='Order item retrieved', data=item).model_dump()), 200
    except Exception:
        return jsonify(
            ErrorResponse(success=False, error='An error occurred while fetching the order item').model_dump()
        ), 500


@orders_bp.route('/<int:order_id>/items', methods=['POST'])
def add_order_item_route(order_id: int):
    try:
        payload = request.get_json()
        if not payload:
            return jsonify(ErrorResponse(success=False, error='No data provided').model_dump()), 400

        validated_data = OrderItemCreate.model_validate(payload)

        with get_session() as session:
            item = add_item_to_order(session=session, order_id=order_id, item_data=validated_data)

            if not item:
                return jsonify(ErrorResponse(success=False, error='Order not found').model_dump()), 404

            return jsonify(SuccessResponse(success=True, message='Item added to order', data=item).model_dump()), 201

    except ValidationError as e:
        return jsonify(ErrorResponse(success=False, error=str(e)).model_dump()), 400
    except Exception:
        return jsonify(
            ErrorResponse(success=False, error='An error occurred while adding item to order').model_dump()
        ), 500


@orders_bp.route('/<int:order_id>/items/<int:item_id>', methods=['DELETE'])
def remove_order_item_route(order_id: int, item_id: int):
    try:
        with get_session() as session:
            success = remove_item_from_order(session=session, order_id=order_id, item_id=item_id)

            if not success:
                return jsonify(ErrorResponse(success=False, error='Item not found').model_dump()), 404

            return jsonify(
                SuccessResponse(success=True, message='Item removed from order', data=None).model_dump()
            ), 200
    except Exception as e:
        return jsonify(
            ErrorResponse(
                success=False, error=f'An error occurred while removing item from order: {str(e)}'
            ).model_dump()
        ), 500


@orders_bp.route('/<int:order_id>', methods=['GET'])
def get_order_route(order_id: int):
    try:
        with get_session() as session:
            order = get_order_by_id(session=session, order_id=order_id)
        if not order:
            return jsonify(ErrorResponse(success=False, error='Order not found').model_dump()), 404

        return jsonify(SuccessResponse(success=True, message='Order retrieved', data=order).model_dump()), 200
    except Exception:
        return jsonify(
            ErrorResponse(
                success=False,
                error='An unexpted error occured. Please try again',
            ).model_dump()
        ), 500


@orders_bp.route('/user/<int:user_id>', methods=['GET'])
def get_orders_by_user_route(user_id: int):
    try:
        with get_session() as session:
            orders = get_orders_by_user_id(session=session, user_id=user_id)

        if len(orders) == 0:
            return jsonify(ErrorResponse(success=False, error='No orders found').model_dump()), 404
        return jsonify(SuccessResponse(data=orders, success=True, message='Orders retrieved').model_dump()), 200
    except Exception:
        return jsonify(
            ErrorResponse(
                success=False,
                error='An unexpected error occurred. Please try again.',
            ).model_dump()
        ), 500


@orders_bp.route('/<int:order_id>', methods=['PUT'])
def update_order_route(order_id: int):
    session = None
    try:
        data = request.get_json()
        if not data or 'status' not in data:
            return jsonify(ErrorResponse(success=False, error='Missing required fields').model_dump()), 400
        new_status = OrderStatus(data['status'])
        with get_session() as session:
            updated_order = update_order_status(session=session, order_id=order_id, new_status=new_status)
        if not updated_order:
            return jsonify(ErrorResponse(success=False, error='Order not found').model_dump()), 404
        return jsonify(
            SuccessResponse(success=True, message='Order status updated', data=updated_order).model_dump()
        ), 200
    except Exception:
        return jsonify(
            ErrorResponse(
                success=False,
                error='An unexpected error occurred. Please try again.',
            ).model_dump()
        ), 500


@orders_bp.route('/<int:order_id>', methods=['DELETE'])
def delete_order_route(order_id: int):
    try:
        with get_session() as session:
            success = delete_order(session=session, order_id=order_id)
        if not success:
            return jsonify(ErrorResponse(success=False, error='Order not found').model_dump()), 404
        return jsonify(SuccessResponse(success=True, message='Order deleted', data=order_id).model_dump()), 200
    except Exception:
        return jsonify(
            ErrorResponse(
                success=False,
                error='An unexpected error occurred. Please try again.',
            ).model_dump()
        ), 500
