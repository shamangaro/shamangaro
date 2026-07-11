from dataclasses import dataclass


@dataclass(frozen=True)
class Offer:
    id: str
    name: str
    quantity: int
    unit_price: float
    total_price: float


OFFERS: dict[str, Offer] = {
    "solo": Offer("solo", "كرسي واحد", 1, 249.0, 249.0),
    "duo": Offer("duo", "كرسيين", 2, 229.0, 458.0),
    "family": Offer("family", "3 كراسي", 3, 219.0, 657.0),
}


def get_offer(offer_id: str) -> Offer | None:
    return OFFERS.get(offer_id)
