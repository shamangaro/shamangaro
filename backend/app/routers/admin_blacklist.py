from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.dependencies import get_current_admin
from app.database import get_db
from app.models.admin_user import AdminUser
from app.models.blacklist import BlacklistCustomer
from app.schemas.blacklist import BlacklistCreate, BlacklistResponse
from app.services.phone import normalize_moroccan_phone

router = APIRouter(prefix="/admin/blacklist", tags=["admin-blacklist"])


@router.get("", response_model=list[BlacklistResponse])
async def list_blacklist(
    _admin: AdminUser = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(BlacklistCustomer).order_by(BlacklistCustomer.created_at.desc())
    )
    return result.scalars().all()


@router.post("", response_model=BlacklistResponse, status_code=status.HTTP_201_CREATED)
async def add_to_blacklist(
    payload: BlacklistCreate,
    _admin: AdminUser = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    phone = normalize_moroccan_phone(payload.phone)

    existing = await db.execute(
        select(BlacklistCustomer).where(BlacklistCustomer.phone == phone)
    )
    if existing.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="هذا الرقم موجود بالفعل في القائمة السوداء",
        )

    entry = BlacklistCustomer(
        phone=phone,
        name=payload.name,
        address=payload.address,
        city=payload.city,
        reason=payload.reason.strip(),
    )
    db.add(entry)
    await db.flush()
    return entry


@router.delete("/{entry_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_from_blacklist(
    entry_id: int,
    _admin: AdminUser = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(BlacklistCustomer).where(BlacklistCustomer.id == entry_id)
    )
    entry = result.scalar_one_or_none()
    if not entry:
        raise HTTPException(status_code=404, detail="العميل غير موجود في القائمة السوداء")

    await db.delete(entry)
    await db.flush()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
