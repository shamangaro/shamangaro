"""Admin v2: CONTACTED status and internal notes."""

from typing import Sequence, Union

from alembic import op

revision: str = "002_admin_v2"
down_revision: Union[str, None] = "001_orders_admin"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # New enum values must be committed before use (PostgreSQL requirement).
    with op.get_context().autocommit_block():
        op.execute(
            "ALTER TYPE order_status ADD VALUE IF NOT EXISTS 'CONTACTED'"
        )

    op.execute(
        """
        UPDATE orders
        SET status = 'CONTACTED'
        WHERE status::text = 'PREPARING'
        """
    )
    op.execute(
        "ALTER TABLE orders ADD COLUMN IF NOT EXISTS internal_notes TEXT"
    )


def downgrade() -> None:
    op.execute("ALTER TABLE orders DROP COLUMN IF EXISTS internal_notes")
