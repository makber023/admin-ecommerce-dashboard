"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 5000 ? 0 : 300;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#F2F2F2] font-mono">
      <div className="bg-[#E6E6E6] border-b border-[#D0D0D0] px-8 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/collections"
            className="flex items-center gap-2 text-black text-sm tracking-widest hover:underline"
          >
            <ArrowLeft size={16} />
            CONTINUE SHOPPING
          </Link>
          <h1 className="text-xl tracking-widest font-semibold text-black">
            YOUR CART
          </h1>
          <span className="text-sm text-[#4D4D4D] tracking-wider">
            {items.length} {items.length === 1 ? "ITEM" : "ITEMS"}
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-16">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 gap-8">
            <ShoppingBag size={64} className="text-[#B0B0B0]" strokeWidth={1} />
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-black mb-3">
                Your cart is empty
              </h2>
              <p className="text-[#4D4D4D] text-lg">
                Discover pieces crafted for the discerning gentleman.
              </p>
            </div>
            <Link href="/collections">
              <button className="px-12 py-4 bg-black text-white text-sm tracking-widest hover:bg-[#333] transition">
                EXPLORE COLLECTION
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 flex flex-col gap-0">
              <div className="hidden md:grid grid-cols-12 text-xs tracking-widest text-[#888] pb-4 border-b border-[#D0D0D0]">
                <span className="col-span-6">PRODUCT</span>
                <span className="col-span-2 text-center">PRICE</span>
                <span className="col-span-2 text-center">QTY</span>
                <span className="col-span-2 text-right">TOTAL</span>
              </div>

              {items.map((item) => (
                <div
                  key={`${item.id}-${item.variant}`}
                  className="grid grid-cols-12 items-center py-8 border-b border-[#D0D0D0] gap-4"
                >
                  <div className="col-span-12 md:col-span-6 flex items-center gap-5">
                    <div className="relative w-24 h-24 bg-[#E6E6E6] flex-shrink-0 overflow-hidden">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag size={24} className="text-[#B0B0B0]" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-black font-semibold text-sm tracking-wide">
                        {item.name}
                      </span>
                      {item.variant && (
                        <span className="text-xs text-[#888]">
                          {item.variant}
                        </span>
                      )}
                      <button
                        onClick={() => removeItem(item.id, item.variant)}
                        className="flex items-center gap-1 text-xs text-[#888] hover:text-black transition w-fit"
                      >
                        <X size={12} />
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="col-span-4 md:col-span-2 text-center text-sm text-[#4D4D4D]">
                    Rs. {item.price.toFixed(2)}
                  </div>

                  <div className="col-span-4 md:col-span-2 flex items-center justify-center gap-3">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.variant, item.quantity - 1)
                      }
                      className="w-7 h-7 flex items-center justify-center border border-[#D0D0D0] hover:border-black hover:bg-black hover:text-white transition text-black"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm w-4 text-center font-semibold text-black">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.variant, item.quantity + 1)
                      }
                      className="w-7 h-7 flex items-center justify-center border border-[#D0D0D0] hover:border-black hover:bg-black hover:text-white transition text-black"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <div className="col-span-4 md:col-span-2 text-right text-sm font-semibold text-black">
                    Rs. {(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-[#E6E6E6] p-8 flex flex-col gap-6 sticky top-8">
                <h2 className="text-sm tracking-widest font-semibold text-black border-b border-[#D0D0D0] pb-4">
                  ORDER SUMMARY
                </h2>

                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between text-[#4D4D4D]">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#4D4D4D]">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-700">Free</span>
                      ) : (
                        `Rs. ${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-[#888]">
                      Free shipping on orders over Rs. 5000
                    </p>
                  )}
                </div>

                <div className="flex justify-between font-semibold text-black border-t border-[#D0D0D0] pt-4">
                  <span className="tracking-wider">TOTAL</span>
                  <span>Rs. {total.toFixed(2)}</span>
                </div>
                <Link href="/checkout">
                  <button className="w-full py-4 bg-black text-white text-sm tracking-widest hover:bg-[#333] transition">
                    PROCEED TO CHECKOUT
                  </button>
                </Link>
                <div className="text-center">
                  <Link
                    href="/collections"
                    className="text-xs text-[#888] tracking-wider hover:text-black transition underline"
                  >
                    CONTINUE SHOPPING
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
