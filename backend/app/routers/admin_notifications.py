from datetime import datetime, timezone

from fastapi import APIRouter, Depends, Query
from fastapi.responses import StreamingResponse

from app.auth.dependencies import get_current_admin
from app.models.admin_user import AdminUser
from app.schemas.order import NotificationSummaryResponse
from app.services.order_notifications import (
    drain_pending_notifications,
    mark_notification_seen,
)

router = APIRouter(prefix="/admin/notifications", tags=["admin-notifications"])


@router.get("/summary", response_model=NotificationSummaryResponse)
async def notification_summary(
    since: str | None = None,
    _admin: AdminUser = Depends(get_current_admin),
):
    since_dt = None
    if since:
        try:
            since_dt = datetime.fromisoformat(since)
            if since_dt.tzinfo is None:
                since_dt = since_dt.replace(tzinfo=timezone.utc)
        except ValueError:
            since_dt = None

    items = drain_pending_notifications(since_dt)
    latest = items[-1]["order_number"] if items else None
    return NotificationSummaryResponse(
        pending_count=len(items),
        latest_order_number=latest,
        items=items,
    )


@router.post("/seen")
async def notifications_seen(_admin: AdminUser = Depends(get_current_admin)):
    mark_notification_seen()
    return {"ok": True}


@router.get("/stream")
async def notifications_stream(
    _admin: AdminUser = Depends(get_current_admin),
):
    async def event_generator():
        import asyncio
        import json

        while True:
            items = drain_pending_notifications(None)
            payload = {
                "pending_count": len(items),
                "items": items[-5:],
            }
            yield f"data: {json.dumps(payload)}\n\n"
            await asyncio.sleep(5)

    return StreamingResponse(event_generator(), media_type="text/event-stream")
