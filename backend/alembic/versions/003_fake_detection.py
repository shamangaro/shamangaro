"""Fake order detection: blacklist table and order risk flag."""

from typing import Sequence, Union

from alembic import op

revision: str = "003_fake_detection"
down_revision: Union[str, None] = "002_admin_v2"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute(
        """
        CREATE TABLE IF NOT EXISTS blacklist_customers (
            id SERIAL PRIMARY KEY,
            phone VARCHAR(20) NOT NULL,
            name VARCHAR(200),
            address TEXT,
            city VARCHAR(100),
            reason TEXT NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
        """
    )
    op.execute(
        "CREATE INDEX IF NOT EXISTS ix_blacklist_customers_phone "
        "ON blacklist_customers (phone)"
    )
    op.execute(
        "ALTER TABLE orders ADD COLUMN IF NOT EXISTS is_risk "
        "BOOLEAN NOT NULL DEFAULT FALSE"
    )
    op.execute(
        "CREATE INDEX IF NOT EXISTS ix_orders_is_risk ON orders (is_risk)"
    )


def downgrade() -> None:
    op.execute("DROP INDEX IF EXISTS ix_orders_is_risk")
    op.execute("ALTER TABLE orders DROP COLUMN IF EXISTS is_risk")
    op.execute("DROP INDEX IF EXISTS ix_blacklist_customers_phone")
    op.execute("DROP TABLE IF EXISTS blacklist_customers")
