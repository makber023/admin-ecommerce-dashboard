"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  Bell,
  Search,
  Moon,
  Sun,
  ChevronDown,
  LogOut,
  UserCircle,
  LayoutDashboard,
} from "lucide-react";
import AddProductButton from "./Add-Product";

export default function AdminHeader() {
  const { data: session } = useSession();
  const [openMenu, setOpenMenu] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const menuRef = useRef<HTMLDivElement>(null);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const initials =
    session?.user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "A";

  return (
    <header className="w-full bg-card border-b border-border">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-14 flex items-center gap-4">
          {/* Brand */}
          <Link href="/admin" className="flex items-center gap-2.5 shrink-0">
            <div className="w-7 h-7 rounded-md bg-foreground flex items-center justify-center">
              <span className="text-background text-xs font-bold tracking-tight">
                M
              </span>
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground leading-none">
                E‑commerce
              </p>
              <p className="text-sm font-semibold tracking-tight leading-tight">
                Admin
              </p>
            </div>
          </Link>

          {/* Divider */}
          <div className="hidden sm:block h-5 w-px bg-border" />

          {/* Search */}
          <div className="flex-1 max-w-sm">
            <label className="relative flex items-center">
              <Search
                size={14}
                className="absolute left-3 text-muted-foreground pointer-events-none"
              />
              <input
                className="w-full rounded-lg border border-border bg-muted/50 py-1.5 pl-8 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 focus:border-foreground/30 transition-all"
                placeholder="Search products, orders…"
                type="search"
              />
            </label>
          </div>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-1">
            <AddProductButton />

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            {/* Notifications */}
            <button
              className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Notifications"
            >
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-rose-500" />
            </button>

            {/* Divider */}
            <div className="h-5 w-px bg-border mx-1" />

            {/* User menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpenMenu((s) => !s)}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-muted transition-colors"
                aria-haspopup="true"
                aria-expanded={openMenu}
              >
                {/* Avatar */}
                <div className="w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-semibold shrink-0">
                  {initials}
                </div>
                <div className="hidden md:block text-left leading-tight">
                  <p className="text-xs font-medium truncate max-w-[100px]">
                    {session?.user?.name ?? "Admin"}
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate max-w-[100px]">
                    {session?.user?.email ?? ""}
                  </p>
                </div>
                <ChevronDown
                  size={14}
                  className={`text-muted-foreground transition-transform duration-200 ${openMenu ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown */}
              {openMenu && (
                <div className="absolute right-0 mt-1.5 w-52 bg-card border border-border rounded-xl shadow-lg z-20 overflow-hidden py-1">
                  {/* User info header */}
                  <div className="px-3 py-2.5 border-b border-border mb-1">
                    <p className="text-xs font-medium truncate">
                      {session?.user?.name ?? "Admin"}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {session?.user?.email}
                    </p>
                  </div>

                  <Link
                    href="/"
                    onClick={() => setOpenMenu(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <UserCircle size={14} />
                    Home
                  </Link>
                  <Link
                    href="/admin"
                    onClick={() => setOpenMenu(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <LayoutDashboard size={14} />
                    Admin Portal
                  </Link>

                  <div className="border-t border-border mt-1 pt-1">
                    <button
                      onClick={() => signOut({ callbackUrl: "/admin/login" })}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-rose-500 hover:bg-rose-500/10 transition-colors"
                    >
                      <LogOut size={14} />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
