import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-20 px-6 font-mono">
      <div className="max-w-[90%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <a href="#" className="block text-sm hover:underline">
            Contact
          </a>
          <a href="#" className="block text-sm hover:underline">
            Returns & exchanges
          </a>
          <a href="#" className="block text-sm hover:underline">
            Shipping & delivery
          </a>
          <a href="#" className="block text-sm hover:underline">
            Payment / Security & Privacy policy
          </a>
        </div>

        <div className="space-y-2">
          <a href="#" className="block text-sm hover:underline">
            Warranty
          </a>
          <a href="#" className="block text-sm hover:underline">
            Disclaimer
          </a>
          <a href="#" className="block text-sm hover:underline">
            Product manuals
          </a>
          <a href="#" className="block text-sm hover:underline">
            Gift vouchers
          </a>
        </div>

        <div className="space-y-4">
          <div className="flex space-x-4 text-sm">
            <a href="#" className="hover:underline">
              Facebook
            </a>
            <span>/</span>
            <a href="#" className="hover:underline">
              Instagram
            </a>
            <span>/</span>
            <a href="#" className="hover:underline">
              Pinterest
            </a>
          </div>

          <form className="flex border border-white">
            <input
              type="email"
              placeholder="MAHRAM Newsletter"
              className="flex-1 px-4 py-2 bg-black text-white placeholder-white outline-none"
            />
            <button type="submit" className="px-4 border-l border-white">
              +
            </button>
          </form>

          {/* Text */}
          <p className="text-xs leading-relaxed tracking-wide">
            Sign up to receive news, exclusive offers and 10% off your first
            order.
            <br />
            Unsubscribe at any time.
            <br />© MAHRAM Collective 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
