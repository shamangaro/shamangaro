import re

MOROCCAN_CITIES = {
    "الدار البيضاء",
    "كازابلانكا",
    "casablanca",
    "الرباط",
    "rabat",
    "مراكش",
    "marrakech",
    "marrakesh",
    "فاس",
    "fes",
    "fès",
    "طنجة",
    "tanger",
    "tangier",
    "أكادير",
    "agadir",
    "مكناس",
    "meknes",
    "meknès",
    "وجدة",
    "oujda",
    "القنيطرة",
    "kenitra",
    "تطوان",
    "tetouan",
    "تémara",
    "تمارة",
    "temara",
    "سلا",
    "salé",
    "sale",
    "الجديدة",
    "el jadida",
    "بني ملال",
    "beni mellal",
    "خريبكة",
    "khouribga",
    "نador",
    "nador",
    "المحمدية",
    "mohammedia",
    "سطات",
    "settat",
    "العرائش",
    "larache",
    "إنزكان",
    "inzegan",
}


def extract_city_from_address(address: str) -> str | None:
    if not address:
        return None

    text = address.strip()
    if not text:
        return None

    for part in re.split(r"[،,|\n/]+", text):
        candidate = part.strip()
        if not candidate:
            continue
        lowered = candidate.lower()
        for city in MOROCCAN_CITIES:
            if city.lower() in lowered or lowered in city.lower():
                return candidate[:120]
        if len(candidate) >= 3:
            return candidate[:120]

    return text[:120]
