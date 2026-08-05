from dataclasses import dataclass

WATCHES_PRODUCT_SLUG = "montres-femmes"
WATCHES_PRODUCT_NAME = "Montres Femmes Élégantes"
WATCHES_UNIT_PRICE = 245.0
WATCHES_SOURCE_PAGE = "/products/montres-femmes"

WATCH_VARIANTS: dict[str, str] = {
    "taupe": "Taupe",
    "burgundy": "Burgundy",
    "navy-blue": "Navy Blue",
}


@dataclass(frozen=True)
class ProductOrder:
    offer_id: str
    offer_name: str
    quantity: int
    unit_price: float
    total_price: float
    selected_variant: str
    source_page: str


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

    if quantity < 1 or quantity > 10:
        raise ValueError("الكمية غير صالحة")

    unit_price = WATCHES_UNIT_PRICE
    total_price = round(unit_price * quantity, 2)

    return ProductOrder(
        offer_id=WATCHES_PRODUCT_SLUG,
        offer_name=f"{WATCHES_PRODUCT_NAME} — {variant_label}",
        quantity=quantity,
        unit_price=unit_price,
        total_price=total_price,
        selected_variant=variant_label,
        source_page=source_page or WATCHES_SOURCE_PAGE,
    )
