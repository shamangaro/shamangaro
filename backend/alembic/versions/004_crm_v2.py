"""CRM V2: extended statuses, city, agent, timeline, notes, calls."""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "004_crm_v2"
down_revision: Union[str, None] = "003_fake_detection"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    with op.get_context().autocommit_block():
        for value in (
            "WAITING_CONFIRMATION",
            "PACKED",
            "NO_ANSWER",
            "CALLBACK",
        ):
            op.execute(
                f"ALTER TYPE order_status ADD VALUE IF NOT EXISTS '{value}'"
            )

    op.add_column("orders", sa.Column("city", sa.String(120), nullable=True))
    op.add_column(
        "orders",
        sa.Column("confirmation_agent_id", sa.Integer(), nullable=True),
    )
    op.create_foreign_key(
        "fk_orders_confirmation_agent",
        "orders",
        "admin_users",
        ["confirmation_agent_id"],
        ["id"],
        ondelete="SET NULL",
    )
    op.create_index("ix_orders_city", "orders", ["city"])

    op.create_table(
        "order_status_events",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column(
            "order_id",
            sa.Integer(),
            sa.ForeignKey("orders.id", ondelete="CASCADE"),
            nullable=False,
            index=True,
        ),
        sa.Column("event_type", sa.String(40), nullable=False),
        sa.Column("status", sa.String(40), nullable=True),
        sa.Column("note", sa.Text(), nullable=True),
        sa.Column(
            "admin_id",
            sa.Integer(),
            sa.ForeignKey("admin_users.id", ondelete="SET NULL"),
            nullable=True,
        ),
        sa.Column("admin_username", sa.String(100), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )

    op.create_table(
        "order_notes",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column(
            "order_id",
            sa.Integer(),
            sa.ForeignKey("orders.id", ondelete="CASCADE"),
            nullable=False,
            index=True,
        ),
        sa.Column("body", sa.Text(), nullable=False),
        sa.Column(
            "admin_id",
            sa.Integer(),
            sa.ForeignKey("admin_users.id", ondelete="SET NULL"),
            nullable=True,
        ),
        sa.Column("admin_username", sa.String(100), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )

    op.create_table(
        "order_calls",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column(
            "order_id",
            sa.Integer(),
            sa.ForeignKey("orders.id", ondelete="CASCADE"),
            nullable=False,
            index=True,
        ),
        sa.Column("outcome", sa.String(40), nullable=False),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column(
            "admin_id",
            sa.Integer(),
            sa.ForeignKey("admin_users.id", ondelete="SET NULL"),
            nullable=True,
        ),
        sa.Column("admin_username", sa.String(100), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )

    op.execute(
        """
        UPDATE orders
        SET city = NULLIF(TRIM(SPLIT_PART(address, '،', 1)), '')
        WHERE city IS NULL AND address IS NOT NULL
        """
    )


def downgrade() -> None:
    op.drop_table("order_calls")
    op.drop_table("order_notes")
    op.drop_table("order_status_events")
    op.drop_index("ix_orders_city", table_name="orders")
    op.drop_constraint("fk_orders_confirmation_agent", "orders", type_="foreignkey")
    op.drop_column("orders", "confirmation_agent_id")
    op.drop_column("orders", "city")
