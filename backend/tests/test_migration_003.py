"""Tests for migration 003_fake_detection."""

import importlib.util
from pathlib import Path


def _load_migration():
    path = (
        Path(__file__).resolve().parents[1]
        / "alembic"
        / "versions"
        / "003_fake_detection.py"
    )
    spec = importlib.util.spec_from_file_location("migration_003", path)
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module


def test_migration_003_structure():
    module = _load_migration()
    assert module.revision == "003_fake_detection"
    assert module.down_revision == "002_admin_v2"
    assert callable(module.upgrade)
    assert callable(module.downgrade)

    source = (
        Path(__file__).resolve().parents[1]
        / "alembic"
        / "versions"
        / "003_fake_detection.py"
    )
    text = source.read_text(encoding="utf-8")
    assert "CREATE TABLE IF NOT EXISTS blacklist_customers" in text
    assert "ADD COLUMN IF NOT EXISTS is_risk" in text
    assert "CREATE INDEX IF NOT EXISTS ix_blacklist_customers_phone" in text
    assert "CREATE INDEX IF NOT EXISTS ix_orders_is_risk" in text
    assert "if_not_exists=True" not in text
    assert "op.add_column" not in text
