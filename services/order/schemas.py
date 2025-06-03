from app import ma
from models import Order, OrderItem, OrderStatus
from marshmallow import fields

class OrderSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Order
        load_instance = True

    items = fields.Nested("OrderItemSchema", many=True)
    status = fields.Method("get_status_value", "load_status_value", required=True)

    def get_status_value(self, obj):
        return obj.status.value if obj.status else None

    def load_status_value(self, value):
        if value is None:
            return None
        try:
            return OrderStatus(value)
        except ValueError:
            raise ValueError(f"'{value}' is not a valid OrderStatus")

    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)


class OrderItemSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = OrderItem
        load_instance = True
        include_fk = True

    order = fields.Nested("OrderSchema", exclude=('items',))

    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)

order_schema = OrderSchema()
orders_schema = OrderSchema(many=True)

order_item_schema = OrderItemSchema()
order_items_schema = OrderItemSchema(many=True)
