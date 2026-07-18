"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getAnalytics,
  getOrderStats,
  type AnalyticsData,
  type OrderStats,
} from "@/lib/orders";
import { DashboardCharts } from "@/components/admin/DashboardCharts";
import { cn } from "@/lib/utils";

function StatCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4",
        highlight ? "border-gold/40 bg-gold/10" : "border-navy/10 bg-white"
      )}
    >
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-xl font-black text-navy sm:text-2xl">{value}</p>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [statsData, analyticsData] = await Promise.all([
        getOrderStats(),
        getAnalytics(),
      ]);
      setStats(statsData);
      setAnalytics(analyticsData);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, [load]);

  if (loading && !stats) {
    return (
      <p className="py-20 text-center text-muted-foreground">جاري التحميل...</p>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-navy">لوحة التحكم</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          نظرة عامة على الطلبات والإيرادات
        </p>
      </div>

      {stats && (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
            <StatCard
              label="طلبات اليوم"
              value={stats.today_orders}
              highlight
            />
            <StatCard
              label="في انتظار التأكيد"
              value={stats.waiting_confirmation_orders}
            />
            <StatCard label="مؤكد" value={stats.confirmed_orders} />
            <StatCard label="تم التغليف" value={stats.packed_orders} />
            <StatCard label="تم الشحن" value={stats.shipped_orders} />
            <StatCard label="تم التوصيل" value={stats.delivered_orders} />
            <StatCard label="ملغاة" value={stats.cancelled_orders} />
            <StatCard label="لا رد" value={stats.no_answer_orders} />
            <StatCard label="اتصل لاحقاً" value={stats.callback_orders} />
          </div>

          <div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-3">
            <StatCard
              label="إيرادات اليوم"
              value={`${stats.today_sales} د.م`}
              highlight
            />
            <StatCard
              label="إيرادات الأسبوع"
              value={`${stats.week_sales} د.م`}
            />
            <StatCard
              label="إيرادات الشهر"
              value={`${stats.month_sales} د.م`}
            />
          </div>
        </>
      )}

      {analytics && (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <StatCard
              label="معدل التحويل"
              value={`${analytics.conversion_rate}%`}
            />
            <StatCard
              label="نسبة التوصيل"
              value={`${analytics.delivered_rate}%`}
            />
            <StatCard
              label="نسبة الإلغاء"
              value={`${analytics.cancelled_rate}%`}
            />
            <StatCard
              label="متوسط السلة"
              value={`${analytics.average_basket} د.م`}
            />
          </div>

          <DashboardCharts analytics={analytics} />
        </>
      )}
    </div>
  );
}
