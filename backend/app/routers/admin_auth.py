from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.dependencies import get_current_admin
from app.auth.password import verify_password
from app.auth.session import COOKIE_NAME, create_access_token
from app.config import settings
from app.database import get_db
from app.models.admin_user import AdminUser
from app.schemas.auth import AdminLoginRequest, AdminUserResponse

router = APIRouter(prefix="/admin", tags=["admin-auth"])


@router.post("/login", response_model=AdminUserResponse)
async def admin_login(
    payload: AdminLoginRequest,
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(AdminUser).where(
            AdminUser.username == payload.username,
            AdminUser.is_active.is_(True),
        )
    )
    admin = result.scalar_one_or_none()
    if not admin or not verify_password(payload.password, admin.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="اسم المستخدم أو كلمة المرور غير صحيحة",
        )

    token = create_access_token(admin.id, admin.username)
    response.set_cookie(
        key=COOKIE_NAME,
        value=token,
        httponly=True,
        secure=settings.COOKIE_SECURE and not settings.DEBUG,
        samesite="lax",
        path="/",
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )
    return AdminUserResponse(id=admin.id, username=admin.username)


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
async def admin_logout(response: Response):
    response.delete_cookie(key=COOKIE_NAME, path="/")
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/me", response_model=AdminUserResponse)
async def admin_me(admin: AdminUser = Depends(get_current_admin)):
    return AdminUserResponse(id=admin.id, username=admin.username)
