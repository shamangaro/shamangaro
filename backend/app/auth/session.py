from datetime import datetime, timedelta, timezone

from jose import JWTError, jwt

from app.config import settings

COOKIE_NAME = "shamangaro_admin_session"


def create_access_token(admin_id: int, username: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    payload = {
        "sub": str(admin_id),
        "username": username,
        "exp": expire,
        "type": "admin",
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def decode_access_token(token: str) -> dict | None:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        if payload.get("type") != "admin":
            return None
        return payload
    except JWTError:
        return None
