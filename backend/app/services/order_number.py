from sqlalchemy import func, select, text
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.order import Order


async def generate_order_number(session: AsyncSession) -> str:
    try:
        result = await session.execute(text("SELECT nextval('order_number_seq')"))
        seq = result.scalar_one()
    except Exception:
        result = await session.execute(select(func.count(Order.id)))
        seq = (result.scalar_one() or 0) + 1
    return f"SH-{seq:06d}"
