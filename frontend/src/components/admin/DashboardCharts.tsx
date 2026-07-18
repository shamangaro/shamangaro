"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AnalyticsData } from "@/lib/orders";

const COLORS = ["#111111", "#333333", "#555555", "#777777", "#999999", "#bbbbbb"];

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-navy/10 bg-white p-4 md:p-6">
      <h3 className="mb-4 text-sm font-bold text-navy">{title}</h3>
      <div className="h-64">{children}</div>
    </div>
  );
}

export function DashboardCharts({ analytics }: { analytics: AnalyticsData }) {
  const revenueByDay = analytics.revenue_by_day.map((d) => ({
    ...d,
    label: d.date.slice(5),
  }));

  const revenueByMonth = analytics.revenue_by_month.map((d) => ({
    ...d,
    label: d.month.slice(0, 7),
  }));

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <ChartCard title="الإيرادات اليومية">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueByDay}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="label" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v) => [`${v} د.م`, "الإيراد"]} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#111111"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="الإيرادات الشهرية">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={revenueByMonth}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="label" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v) => [`${v} د.م`, "الإيراد"]} />
            <Bar dataKey="revenue" fill="#111111" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="الطلبات حسب المدينة">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={analytics.orders_by_city}
              dataKey="count"
              nameKey="city"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label={({ name, value }) => `${name} (${value})`}
            >
              {analytics.orders_by_city.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="أفضل المدن">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={analytics.orders_by_city.slice(0, 8)}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis type="number" tick={{ fontSize: 11 }} />
            <YAxis
              type="category"
              dataKey="city"
              width={80}
              tick={{ fontSize: 11 }}
            />
            <Tooltip />
            <Bar dataKey="count" fill="#111111" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
