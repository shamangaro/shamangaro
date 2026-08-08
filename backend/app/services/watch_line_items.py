"""Serialize and parse watches multi-model line items in order internal_notes."""

from __future__ import annotations

import json
import re
from dataclasses import dataclass
from typing import Any
from urllib.parse import unquote

LINE_ITEMS_PREFIX = "line_items="
LINE_ITEMS_PATTERN = re.compile(r"line_items=([^;]+)")


@dataclass(frozen=True)
class WatchLineItemData:
    variant_id: str
    variant_label: str
    quantity: int
    image: str | None = None


def serialize_line_items(items: list[WatchLineItemData]) -> str:
    payload = [
        {
            "variant_id": item.variant_id,
            "variant_label": item.variant_label,
            "quantity": item.quantity,
            **({"image": item.image} if item.image else {}),
        }
        for item in items
    ]
    encoded = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
    return f"{LINE_ITEMS_PREFIX}{encoded}"


def parse_line_items(notes: str | None) -> list[dict[str, Any]]:
    if not notes:
        return []
    match = LINE_ITEMS_PATTERN.search(notes)
    if not match:
        return []
    raw = unquote(match.group(1).strip())
    try:
        parsed = json.loads(raw)
    except json.JSONDecodeError:
        return []
    if not isinstance(parsed, list):
        return []
    result: list[dict[str, Any]] = []
    for entry in parsed:
        if not isinstance(entry, dict):
            continue
        variant_id = str(entry.get("variant_id", "")).strip()
        quantity = entry.get("quantity")
        if not variant_id or not isinstance(quantity, int) or quantity < 1:
            continue
        result.append(
            {
                "watch_id": variant_id,
                "watch_name": str(entry.get("variant_label") or variant_id),
                "model_number": str(entry.get("variant_label") or variant_id),
                "image": entry.get("image"),
                "quantity": quantity,
            }
        )
    return result


def merge_internal_notes(*parts: str | None) -> str | None:
    cleaned = [part.strip() for part in parts if part and part.strip()]
    if not cleaned:
        return None
    return "; ".join(cleaned)
