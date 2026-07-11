"""Initial orders and admin users tables."""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "001_orders_admin"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

ORDER_STATUS_VALUES = (
    "NEW",
    "CONFIRMED",
    "PREPARING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
)

order_status = postgresql.ENUM(
    *ORDER_STATUS_VALUES,
    name="order_status",
    create_type=False,
)


def _ensure_order_status_enum() -> None:
    values_sql = ", ".join(f"'{value}'" for value in ORDER_STATUS_VALUES)
    op.execute(
        f"""
        DO $$ BEGIN
            CREATE TYPE order_status AS ENUM ({values_sql});
        EXCEPTION
            WHEN duplicate_object THEN NULL;
        END $$;
        """
    )


def upgrade() -> None:
    op.execute("CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1")

    _ensure_order_status_enum()

    op.create_table(
        "admin_users",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("username", sa.String(length=100), nullable=False),
        sa.Column("password_hash", sa.String(length=255), nullable=False),
        sa.Column("is_active", sa.Boolean(), server_default="true", nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("username"),
        if_not_exists=True,
    )
    op.create_index(
        "ix_admin_users_username",
        "admin_users",
        ["username"],
        if_not_exists=True,
    )

    op.create_table(
        "orders",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("order_number", sa.String(length=20), nullable=False),
        sa.Column("customer_name", sa.String(length=200), nullable=False),
        sa.Column("phone", sa.String(length=20), nullable=False),
        sa.Column("address", sa.Text(), nullable=False),
        sa.Column("offer_id", sa.String(length=20), nullable=False),
        sa.Column("offer_name", sa.String(length=100), nullable=False),
        sa.Column("quantity", sa.Integer(), nullable=False),
        sa.Column("unit_price", sa.Numeric(10, 2), nullable=False),
        sa.Column("total_price", sa.Numeric(10, 2), nullable=False),
        sa.Column(
            "status",
            order_status,
            server_default="NEW",
            nullable=False,
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column("deleted_at", sa.DateTime(timezone=True), nullable=True),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("order_number"),
        if_not_exists=True,
    )
    op.create_index(
        "ix_orders_order_number",
        "orders",
        ["order_number"],
        if_not_exists=True,
    )
    op.create_index(
        "ix_orders_phone", "orders", ["phone"], if_not_exists=True
    )
    op.create_index(
        "ix_orders_status", "orders", ["status"], if_not_exists=True
    )


def downgrade() -> None:
    op.drop_index("ix_orders_status", table_name="orders")
    op.drop_index("ix_orders_phone", table_name="orders")
    op.drop_index("ix_orders_order_number", table_name="orders")
    op.drop_table("orders")
    op.drop_index("ix_admin_users_username", table_name="admin_users")
    op.drop_table("admin_users")
    op.execute("DROP TYPE IF EXISTS order_status")
    op.execute("DROP SEQUENCE IF EXISTS order_number_seq")
