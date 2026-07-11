from fastapi import Cookie, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.session import COOKIE_NAME, decode_access_token
from app.database import get_db
from app.models.admin_user import AdminUser


async def get_current_admin(
    shamangaro_admin_session: str | None = Cookie(default=None, alias=COOKIE_NAME),
    db: AsyncSession = Depends(get_db),
) -> AdminUser:
    if not shamangaro_admin_session:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="غير مصرح — يرجى تسجيل الدخول",
        )

    payload = decode_access_token(shamangaro_admin_session)
    if not payload or not payload.get("sub"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="جلسة غير صالحة أو منتهية",
        )

    result = await db.execute(
        select(AdminUser).where(
            AdminUser.id == int(payload["sub"]),
            AdminUser.is_active.is_(True),
        )
    )
    admin = result.scalar_one_or_none()
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="المستخدم غير موجود أو غير نشط",
        )
    return admin
