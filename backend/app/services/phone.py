import re

MOROCCAN_PHONE_ERROR = "أدخل رقم مغربي صالح (10 أرقام، يبدأ بـ 06 أو 07)"


def normalize_moroccan_phone(phone: str) -> str:
    cleaned = re.sub(r"[\s.\-()]", "", phone.strip())
    if cleaned.startswith("+212"):
        cleaned = "0" + cleaned[4:]
    elif cleaned.startswith("212") and len(cleaned) >= 12:
        cleaned = "0" + cleaned[3:]
    return cleaned


def is_valid_moroccan_phone(phone: str) -> bool:
    normalized = normalize_moroccan_phone(phone)
    return bool(re.fullmatch(r"0[67]\d{8}", normalized))
