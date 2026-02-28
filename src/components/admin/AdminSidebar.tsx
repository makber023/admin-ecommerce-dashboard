"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Tag,
  Users,
  Settings,
  LucideIcon,
} from "lucide-react";

const navItems: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: Tag },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-full bg-card border border-border rounded-2xl flex flex-col p-4">
      {/* Brand */}
      <div className="px-3 py-3 mb-6 border-b border-border">
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-0.5">
          Admin Panel
        </p>
        <h2 className="text-base font-semibold tracking-tight">
          Control Centre
        </h2>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group ${
                isActive
                  ? "bg-foreground text-background font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon
                size={16}
                className={`shrink-0 transition-transform group-hover:scale-110 ${
                  isActive ? "text-background" : ""
                }`}
              />
              {label}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-background/60" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pt-4 mt-4 border-t border-border">
        <p className="text-[11px] text-muted-foreground">v1.0.0</p>
      </div>
    </aside>
  );
}
