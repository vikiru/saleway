from models import Order


def order_to_dict(order: Order):
    return {
        'id': order.id,
        'user_id': order.user_id,
        'purchase_date': order.purchase_date.isoformat(),
        'expected_delivery_date': order.expected_delivery_date.isoformat(),
        'total_price': float(order.total_price),
        'status': order.status.value,
        'created_at': order.created_at.isoformat(),
        'updated_at': order.updated_at.isoformat(),
        'items': [
            {
                'id': item.id,
                'product_id': item.product_id,
                'product_name': item.product_name,
                'product_brand': item.product_brand,
                'product_description': item.product_description,
                'product_image': item.product_image,
                'product_unit_price': float(item.product_unit_price),
                'product_total_price': float(item.product_total_price),
                'product_quantity': item.product_quantity,
                'created_at': item.created_at.isoformat(),
                'updated_at': item.updated_at.isoformat(),
            }
            for item in getattr(order, 'items', [])
        ],
    }
