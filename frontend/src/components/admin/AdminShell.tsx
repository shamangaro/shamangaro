"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ClipboardCheck, LayoutDashboard, LogOut, Package } from "lucide-react";
import { adminLogout } from "@/lib/orders";
import { Logo } from "@/components/shared/Logo";
import { NotificationBell } from "@/components/admin/NotificationBell";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin/dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/admin/orders", label: "الطلبات", icon: Package },
  { href: "/admin/confirmation", label: "التأكيد", icon: ClipboardCheck },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await adminLogout();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f5f5f5]">
      <header className="sticky top-0 z-30 border-b border-navy/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-3 py-3 sm:px-4 sm:py-4">
          <Logo variant="wordmark" size="sm" href={null} subtitle="CRM" />
          <nav className="order-3 flex w-full gap-1 sm:order-none sm:w-auto">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active =
                pathname === href ||
                (href !== "/admin/dashboard" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-bold transition-colors sm:flex-none",
                    active
                      ? "bg-navy text-white"
                      : "text-navy hover:bg-navy/5"
                  )}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{label}</span>
                  <span className="sm:hidden">{label.split(" ")[0]}</span>
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-1">
            <NotificationBell />
            <button
              onClick={handleLogout}
              className="flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-navy hover:bg-navy/5"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">خروج</span>
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl overflow-x-clip p-3 md:p-6">
        {children}
      </main>
    </div>
  );
}
