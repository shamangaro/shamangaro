from dataclasses import dataclass

WATCHES_PRODUCT_SLUG = "montres-femmes"
WATCHES_PRODUCT_NAME = "Montres Femmes Élégantes"
WATCHES_UNIT_PRICE = 249.0
WATCHES_SOURCE_PAGE = "/products/montres-femmes"
WATCHES_MAX_QUANTITY = 99

WATCH_VARIANTS: dict[str, str] = {
    "taupe": "Taupe",
    "burgundy": "Burgundy",
    "navy-blue": "Navy Blue",
}

WATCH_VARIANT_IMAGES: dict[str, str] = {
    "taupe": "/images/montres-femmes/slide-01-packaging.png",
    "burgundy": "/images/montres-femmes/slide-04-burgundy.png",
    "navy-blue": "/images/montres-femmes/slide-02-navy.png",
}


@dataclass(frozen=True)
class WatchLineItemResolved:
    variant_id: str
    variant_label: str
    quantity: int
    image: str


@dataclass(frozen=True)
class ProductOrder:
    offer_id: str
    offer_name: str
    quantity: int
    unit_price: float
    total_price: float
    selected_variant: str
    source_page: str
    line_items: tuple[WatchLineItemResolved, ...] = ()


def _validate_quantity(quantity: int) -> None:
    if quantity < 1 or quantity > WATCHES_MAX_QUANTITY:
        raise ValueError("الكمية غير صالحة")


def resolve_watches_order(
    *,
    selected_variant: str,
    quantity: int,
    source_page: str | None,
) -> ProductOrder:
    variant_key = selected_variant.strip().lower()
    variant_label = WATCH_VARIANTS.get(variant_key)
    if not variant_label:
        raise ValueError("الطراز المحدد غير صالح")

    _validate_quantity(quantity)

    unit_price = WATCHES_UNIT_PRICE
    total_price = round(unit_price * quantity, 2)
    image = WATCH_VARIANT_IMAGES.get(variant_key, "")

    line_item = WatchLineItemResolved(
        variant_id=variant_key,
        variant_label=variant_label,
        quantity=quantity,
        image=image,
    )

    return ProductOrder(
        offer_id=WATCHES_PRODUCT_SLUG,
        offer_name=f"{WATCHES_PRODUCT_NAME} — {variant_label}",
        quantity=quantity,
        unit_price=unit_price,
        total_price=total_price,
        selected_variant=variant_label,
        source_page=source_page or WATCHES_SOURCE_PAGE,
        line_items=(line_item,),
    )


def resolve_watches_multi_order(
    *,
    line_items: list[dict[str, int | str]],
    source_page: str | None,
) -> ProductOrder:
    if not line_items:
        raise ValueError("يجب اختيار ساعة واحدة على الأقل")

    resolved: list[WatchLineItemResolved] = []
    totals: dict[str, int] = {}

    for raw in line_items:
        variant_key = str(raw.get("variant_id", "")).strip().lower()
        variant_label = WATCH_VARIANTS.get(variant_key)
        if not variant_label:
            raise ValueError("الطراز المحدد غير صالح")
        qty = raw.get("quantity")
        if not isinstance(qty, int):
            raise ValueError("الكمية غير صالحة")
        _validate_quantity(qty)
        totals[variant_key] = totals.get(variant_key, 0) + qty

    for variant_key, qty in totals.items():
        resolved.append(
            WatchLineItemResolved(
                variant_id=variant_key,
                variant_label=WATCH_VARIANTS[variant_key],
                quantity=qty,
                image=WATCH_VARIANT_IMAGES.get(variant_key, ""),
            )
        )

    resolved.sort(key=lambda item: item.variant_id)
    total_quantity = sum(item.quantity for item in resolved)
    _validate_quantity(total_quantity)

    unit_price = WATCHES_UNIT_PRICE
    total_price = round(unit_price * total_quantity, 2)

    if len(resolved) == 1:
        offer_name = f"{WATCHES_PRODUCT_NAME} — {resolved[0].variant_label}"
        selected_variant = resolved[0].variant_label
    else:
        parts = [f"{item.variant_label}×{item.quantity}" for item in resolved]
        offer_name = f"{WATCHES_PRODUCT_NAME} ({', '.join(parts)})"
        selected_variant = ", ".join(parts)

    return ProductOrder(
        offer_id=WATCHES_PRODUCT_SLUG,
        offer_name=offer_name,
        quantity=total_quantity,
        unit_price=unit_price,
        total_price=total_price,
        selected_variant=selected_variant,
        source_page=source_page or WATCHES_SOURCE_PAGE,
        line_items=tuple(resolved),
    )
