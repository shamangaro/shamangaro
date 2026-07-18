"use client";

import { CheckCircle2, Circle, Phone, StickyNote } from "lucide-react";
import type { OrderTimelineEvent } from "@/lib/orders";
import { STATUS_LABELS } from "@/lib/orders";

const EVENT_ICONS: Record<string, typeof Circle> = {
  ORDER_CREATED: Circle,
  STATUS_CHANGE: CheckCircle2,
  NOTE: StickyNote,
  CALL: Phone,
};

function formatEventTime(iso: string) {
  return new Date(iso).toLocaleString("ar-MA", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function eventLabel(event: OrderTimelineEvent): string {
  if (event.event_type === "ORDER_CREATED") {
    return "تم إنشاء الطلب";
  }
  if (event.event_type === "STATUS_CHANGE" && event.status) {
    return STATUS_LABELS[event.status] ?? event.status;
  }
  if (event.event_type === "NOTE") {
    return event.note ?? "ملاحظة";
  }
  if (event.event_type === "CALL") {
    return event.note ? `مكالمة — ${event.note}` : "مكالمة";
  }
  return event.note ?? event.event_type;
}

export function OrderTimeline({ events }: { events: OrderTimelineEvent[] }) {
  if (events.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">لا يوجد سجل بعد</p>
    );
  }

  return (
    <ol className="relative space-y-0 border-r-2 border-navy/10 pr-6">
      {events.map((event) => {
        const Icon = EVENT_ICONS[event.event_type] ?? Circle;
        const label = eventLabel(event);

        return (
          <li key={event.id} className="relative pb-6 last:pb-0">
            <span className="absolute -right-[13px] flex h-6 w-6 items-center justify-center rounded-full bg-white ring-2 ring-navy/10">
              <Icon size={12} className="text-navy" />
            </span>
            <div>
              <p className="text-sm font-bold text-navy">{label}</p>
              {event.note &&
                event.event_type === "STATUS_CHANGE" &&
                event.note !== label && (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {event.note}
                  </p>
                )}
              <p className="mt-1 text-xs text-muted-foreground">
                {formatEventTime(event.created_at)}
                {event.admin_username && ` — ${event.admin_username}`}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
