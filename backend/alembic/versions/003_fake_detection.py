"""Fake order detection: blacklist table and order risk flag."""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "003_fake_detection"
down_revision: Union[str, None] = "002_admin_v2"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "blacklist_customers",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("phone", sa.String(length=20), nullable=False),
        sa.Column("name", sa.String(length=200), nullable=True),
        sa.Column("address", sa.Text(), nullable=True),
        sa.Column("city", sa.String(length=100), nullable=True),
        sa.Column("reason", sa.Text(), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id"),
        if_not_exists=True,
    )
    op.create_index(
        "ix_blacklist_customers_phone",
        "blacklist_customers",
        ["phone"],
        if_not_exists=True,
    )

    op.add_column(
        "orders",
        sa.Column("is_risk", sa.Boolean(), server_default="false", nullable=False),
        if_not_exists=True,
    )
    op.create_index(
        "ix_orders_is_risk", "orders", ["is_risk"], if_not_exists=True
    )


def downgrade() -> None:
    op.drop_index("ix_orders_is_risk", table_name="orders", if_exists=True)
    op.drop_column("orders", "is_risk", if_exists=True)
    op.drop_index(
        "ix_blacklist_customers_phone", table_name="blacklist_customers", if_exists=True
    )
    op.drop_table("blacklist_customers", if_exists=True)
