from dataclasses import dataclass

WATCHES_PRODUCT_SLUG = "montres-femmes"
WATCHES_PRODUCT_NAME = "Montres Femmes Élégantes"
WATCHES_UNIT_PRICE = 260.0
WATCHES_SOURCE_PAGE = "/products/montres-femmes"
WATCHES_MAX_QUANTITY = 99

WATCH_VARIANTS: dict[str, str] = {
    "taupe": "Taupe",
    "burgundy": "Burgundy",
    "navy-blue": "Navy Blue",
    "two-tone-white": "Two-tone White",
    "two-tone-brown": "Two-tone Brown",
    "gold-brown": "Gold Brown",
    "navy-leather": "Navy Leather",
    "burgundy-oval": "Burgundy Oval",
    "cream-leather": "Cream Leather",
    "silver-blue": "Silver Blue",
    "twotone-green": "Two-tone Green",
    "gold-green-stones": "Gold Green Stones",
    "twotone-white-gold": "Two-tone White Gold",
    "leopard-panther": "Leopard Panther",
    "twotone-white-alt": "Two-tone White Alt",
    "oval-gold-black": "Oval Gold Black",
    "oval-silver-black": "Oval Silver Black",
    "square-gold-green": "Square Gold Green",
    "oval-gold-cream": "Oval Gold Cream",
    "square-gold-white": "Square Gold White",
    "square-gold-brown": "Square Gold Brown",
    "octagon-silver": "Octagon Silver",
    "cushion-navy": "Cushion Navy",
    "cushion-cream": "Cushion Cream",
    "square-gold-ivory": "Square Gold Ivory",
    "silver-pink": "Silver Pink",
}

WATCH_VARIANT_IMAGES: dict[str, str] = {
    "taupe": "/images/montres-femmes/slide-01-packaging.png",
    "burgundy": "/images/montres-femmes/slide-04-burgundy.png",
    "navy-blue": "/images/montres-femmes/slide-02-navy.png",
    "two-tone-white": "/images/montres-femmes/watch-01-twotone-white.jpg",
    "two-tone-brown": "/images/montres-femmes/watch-02-twotone-brown.jpg",
    "gold-brown": "/images/montres-femmes/watch-03-gold-brown.jpg",
    "navy-leather": "/images/montres-femmes/watch-04-navy-leather.jpg",
    "burgundy-oval": "/images/montres-femmes/watch-05-burgundy-oval.jpg",
    "cream-leather": "/images/montres-femmes/watch-06-cream-leather.jpg",
    "silver-blue": "/images/montres-femmes/gallery-01-silver-blue.jpg",
    "twotone-green": "/images/montres-femmes/gallery-02-twotone-green.jpg",
    "gold-green-stones": "/images/montres-femmes/gallery-03-gold-green-stones.jpg",
    "twotone-white-gold": "/images/montres-femmes/gallery-04-twotone-white.jpg",
    "leopard-panther": "/images/montres-femmes/gallery-05-leopard-panther.jpg",
    "twotone-white-alt": "/images/montres-femmes/gallery-06-twotone-white-alt.jpg",
    "oval-gold-black": "/images/montres-femmes/gallery-07-oval-gold-black.jpg",
    "oval-silver-black": "/images/montres-femmes/gallery-08-oval-silver-black.jpg",
    "square-gold-green": "/images/montres-femmes/gallery-09-square-gold-green.jpg",
    "oval-gold-cream": "/images/montres-femmes/gallery-10-oval-gold-cream.jpg",
    "square-gold-white": "/images/montres-femmes/gallery-11-square-gold-white.jpg",
    "square-gold-brown": "/images/montres-femmes/gallery-12-square-gold-brown.jpg",
    "octagon-silver": "/images/montres-femmes/gallery-13-octagon-silver.jpg",
    "cushion-navy": "/images/montres-femmes/gallery-14-cushion-navy.jpg",
    "cushion-cream": "/images/montres-femmes/gallery-15-cushion-cream.jpg",
    "square-gold-ivory": "/images/montres-femmes/gallery-16-square-gold-ivory.jpg",
    "silver-pink": "/images/montres-femmes/gallery-17-silver-pink.jpg",
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


HANGER_PRODUCT_SLUG = "etendoir-mural"
HANGER_PRODUCT_NAME = "مجفف ملابس جداري"
HANGER_UNIT_PRICE = 349.0
HANGER_OFFER_TOTALS = {1: 349.0, 2: 599.0, 3: 799.0}
HANGER_SOURCE_PAGE = "/products/etendoir-mural"
HANGER_MAX_QUANTITY = 3


def resolve_hanger_order(*, quantity: int = 1, source_page: str | None) -> ProductOrder:
    """Wall rack. Quantity is 1, 2, or 3, with a fixed total for each offer."""
    if quantity < 1 or quantity > HANGER_MAX_QUANTITY:
        raise ValueError("الكمية غير صالحة")
    total_price = HANGER_OFFER_TOTALS[quantity]
    return ProductOrder(
        offer_id=HANGER_PRODUCT_SLUG,
        offer_name=HANGER_PRODUCT_NAME,
        quantity=quantity,
        unit_price=HANGER_UNIT_PRICE,
        total_price=total_price,
        selected_variant="",
        source_page=source_page or HANGER_SOURCE_PAGE,
    )


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
