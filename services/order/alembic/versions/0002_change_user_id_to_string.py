"""change user_id to string

Revision ID: 0002
Revises: 843715704629
Create Date: 2025-02-18

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = '0002'
down_revision: Union[str, None] = '843715704629'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.alter_column('order', 'user_id', existing_type=sa.Integer(), type_=sa.String(255), existing_nullable=False)


def downgrade() -> None:
    op.alter_column('order', 'user_id', existing_type=sa.String(255), type_=sa.Integer(), existing_nullable=False)
