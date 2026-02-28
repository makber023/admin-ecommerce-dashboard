"use client";

import Link from "next/link";
import { Menu, ShoppingBag, Search, User, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/store/useCartStore";

export default function CustomerHeader() {
  const totalItems = useCartStore((s) => s.totalItems());
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const [theme, setTheme] = useState<"light" | "dark" | "transparent">(
    "transparent",
  );
  const headerHeight = 100;

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-header]"),
    );

    const handleScroll = () => {
      let currentTheme = "transparent";
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= headerHeight) {
          currentTheme = section.dataset.header as typeof theme;
        }
      }
      setTheme(currentTheme as typeof theme);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = theme === "dark" ? "text-white" : "text-black";

  if (status === "loading") return null;

  const isLoggedIn = !!session;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${textColor}`}
    >
      <div className="mx-auto px-10 py-6 flex items-center justify-between">
        {/* Left — Menu + Search */}
        <div className="flex items-center gap-16">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 tracking-widest text-sm font-medium uppercase"
            aria-label="Open menu"
          >
            <Menu size={18} strokeWidth={1.5} />
            <span>Menu</span>
          </button>

          <button
            aria-label="Search"
            className="flex items-center gap-2 tracking-widest text-sm font-medium uppercase"
          >
            <Search size={18} strokeWidth={1.5} />
            <span>Search</span>
          </button>
        </div>

        {/* Center — Logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-3xl font-bold tracking-[0.3em] uppercase"
        >
          MAHRAM
        </Link>

        <div className="flex items-center gap-16">
          <Link
            href={
              isLoggedIn
                ? session.user?.role === "admin"
                  ? "/admin"
                  : "/account"
                : "/auth/signin"
            }
            className="flex items-center gap-2 tracking-widest text-sm font-medium uppercase"
          >
            <User size={18} strokeWidth={1.5} />
            <span>
              {isLoggedIn ? (session.user?.name ?? "Account") : "Sign In"}
            </span>
          </Link>
          <Link href="/cart" className="relative p-2 flex items-center gap-2">
            <div className="relative">
              <ShoppingBag size={18} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-black text-white text-[9px] rounded-full flex items-center justify-center font-medium">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </div>
            <span className="tracking-widest text-xs font-medium uppercase">
              Cart
            </span>
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-500 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-8 py-6 text-black">
          <span className="text-xs font-medium tracking-widest uppercase">
            Mahram
          </span>
          <button onClick={() => setOpen(false)} aria-label="Close menu">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        <nav className="flex flex-col px-8 py-4 text-black">
          {[
            { label: "Home", href: "/" },
            { label: "Shoes", href: "/collections/shoes" },
            { label: "Watches", href: "/collections/watches" },
            { label: "Wallets", href: "/collections/wallets" },
            { label: "Accessories", href: "/collections/accessories" },
            { label: "Contact", href: "/contact" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="py-4 text-2xl font-medium border-b border-gray-100 tracking-wide hover:opacity-50 transition-opacity duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>
    </header>
  );
}
