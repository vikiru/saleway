"""rename_order_tables_to_avoid_reserved_keyword

Revision ID: 469c445ffef3
Revises: 0002
Create Date: 2026-03-06 18:24:24.870818

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '469c445ffef3'
down_revision: Union[str, Sequence[str], None] = '0002'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.rename_table('order', 'orders')
    op.rename_table('orderitem', 'order_items')
    
    # Update foreign key on order_items to point to orders
    op.drop_constraint('orderitem_order_id_fkey', 'order_items', type_='foreignkey')
    op.create_foreign_key(op.f('order_items_order_id_fkey'), 'order_items', 'orders', ['order_id'], ['id'])
    
    # Rename primary key constraints for consistency
    op.execute('ALTER TABLE orders RENAME CONSTRAINT order_pkey TO orders_pkey')
    op.execute('ALTER TABLE order_items RENAME CONSTRAINT orderitem_pkey TO order_items_pkey')


def downgrade() -> None:
    """Downgrade schema."""
    op.rename_table('orders', 'order')
    op.rename_table('order_items', 'orderitem')
    
    # Restore original foreign key name
    op.drop_constraint(op.f('order_items_order_id_fkey'), 'orderitem', type_='foreignkey')
    op.create_foreign_key('orderitem_order_id_fkey', 'orderitem', 'order', ['order_id'], ['id'])
    
    # Restore primary key names
    op.execute('ALTER TABLE order RENAME CONSTRAINT orders_pkey TO order_pkey')
    op.execute('ALTER TABLE orderitem RENAME CONSTRAINT order_items_pkey TO orderitem_pkey')
