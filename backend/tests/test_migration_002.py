"""Tests for migration 002_admin_v2."""

import importlib.util
from pathlib import Path


def _load_migration():
    path = (
        Path(__file__).resolve().parents[1]
        / "alembic"
        / "versions"
        / "002_admin_v2.py"
    )
    spec = importlib.util.spec_from_file_location("migration_002", path)
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module


def test_migration_002_structure():
    module = _load_migration()
    assert module.revision == "002_admin_v2"
    assert module.down_revision == "001_orders_admin"
    assert callable(module.upgrade)
    assert callable(module.downgrade)

    source = Path(
        __file__).resolve().parents[1] / "alembic" / "versions" / "002_admin_v2.py"
    text = source.read_text(encoding="utf-8")
    assert "autocommit_block()" in text
    assert "ADD VALUE IF NOT EXISTS 'CONTACTED'" in text
    assert "UPDATE orders" in text
    assert "internal_notes" in text
