"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Check, Lock } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { calculateShipping } from "@/lib/shipping";

interface FormData {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  country: string;
  postalCode: string;
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  name: keyof FormData;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="w-full">
      <label className="block text-[10px] tracking-widest uppercase text-[#555] mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border-b border-[#444] bg-transparent pb-3 text-sm text-black placeholder:text-[#AAA] focus:outline-none focus:border-black transition-colors duration-200"
      />
    </div>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="text-xs tracking-[0.2em] uppercase text-black font-semibold mb-6 pb-3 border-b border-[#E0E0E0]">
      {title}
    </h2>
  );
}

export default function CheckoutPage() {
  const [completed, setCompleted] = useState(false);
  const { items, totalPrice, clearCart } = useCartStore();
  const subtotal = totalPrice();
  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;

  const [form, setForm] = useState<FormData>({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "",
    postalCode: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = () => {
    clearCart();
    setCompleted(true);
  };

  if (completed) {
    return (
      <div className="h-screen bg-[#F2F2F2] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center mx-auto mb-8">
            <Check size={22} strokeWidth={1.5} className="text-white" />
          </div>
          <h1 className="text-3xl font-semibold tracking-wide text-black mb-4">
            Order Confirmed
          </h1>
          <p className="text-sm text-[#666] leading-relaxed mb-10">
            Thank you for your order. A confirmation has been sent to{" "}
            <span className="text-black">{form.email || "your email"}</span>.
          </p>
          <Link
            href="/"
            className="text-xs tracking-widest uppercase underline underline-offset-4 text-black hover:opacity-50 transition-opacity"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="h-screen bg-white flex flex-col items-center justify-center gap-6">
        <p className="text-xs tracking-widest uppercase text-[#999]">
          Your cart is empty
        </p>
        <Link
          href="/collections"
          className="text-xs tracking-widest uppercase underline underline-offset-4 text-black hover:opacity-50 transition-opacity"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white flex overflow-hidden">
      <div className="flex-1 flex flex-col px-8 md:px-16 lg:px-20 py-10 overflow-hidden">
        <div className="flex items-center justify-between mb-8 flex-shrink-0">
          <Link
            href="/"
            className="text-xl font-bold tracking-[0.3em] uppercase text-black"
          >
            MAHRAM
          </Link>
          <Link
            href="/cart"
            className="flex items-center gap-1.5 text-xs tracking-widest uppercase text-[#888] hover:text-black transition-colors"
          >
            <ChevronLeft size={13} strokeWidth={1.5} />
            Back to Cart
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-10 flex-1 min-h-0">
          <div className="flex flex-col gap-10 overflow-y-auto pr-1">
            <section>
              <SectionHeading title="Contact Information" />
              <div className="flex flex-col gap-8">
                <Field
                  label="Email Address"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="you@example.com"
                />
                <Field
                  label="Phone Number"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="+92 300 0000000"
                />
              </div>
            </section>

            <section>
              <SectionHeading title="Shipping Address" />
              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-2 gap-8">
                  <Field
                    label="First Name"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="John"
                  />
                  <Field
                    label="Last Name"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                  />
                </div>
                <Field
                  label="Address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="123 Main Street"
                />
                <Field
                  label="Apartment, suite, etc. (optional)"
                  name="apartment"
                  value={form.apartment}
                  onChange={handleChange}
                  placeholder="Apt 4B"
                />
                <div className="grid grid-cols-2 gap-8">
                  <Field
                    label="City"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Karachi"
                  />
                  <Field
                    label="Postal Code"
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    placeholder="75500"
                  />
                </div>
                <Field
                  label="Country"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="Pakistan"
                />
              </div>
            </section>
          </div>

          <div className="flex flex-col justify-between">
            <section>
              <SectionHeading title="Payment Details" />
              <div className="flex flex-col gap-8">
                <Field
                  label="Name on Card"
                  name="cardName"
                  value={form.cardName}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
                <Field
                  label="Card Number"
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={handleChange}
                  placeholder="4242 4242 4242 4242"
                />
                <div className="grid grid-cols-2 gap-8">
                  <Field
                    label="Expiry Date"
                    name="expiry"
                    value={form.expiry}
                    onChange={handleChange}
                    placeholder="MM / YY"
                  />
                  <Field
                    label="CVV"
                    name="cvv"
                    value={form.cvv}
                    onChange={handleChange}
                    placeholder="123"
                  />
                </div>
                <p className="flex items-center gap-2 text-[10px] tracking-wider text-[#888]">
                  <Lock size={11} strokeWidth={1.5} />
                  Your payment information is encrypted and secure.
                </p>
              </div>
            </section>

            <div>
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-black text-white text-xs tracking-[0.25em] uppercase py-5 hover:bg-[#222] transition-colors duration-200"
              >
                Place Order — Rs. {total.toLocaleString()}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[420px] bg-[#F2F2F2] px-8 md:px-12 py-20 lg:py-16 border-l border-[#E8E8E8] flex-shrink-0 flex flex-col overflow-y-auto">
        <h3 className="text-[10px] tracking-widest uppercase text-[#999] mb-10 flex-shrink-0">
          Order Summary
        </h3>

        <div className="flex flex-col gap-6 mb-10">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.variant}`}
              className="flex items-start justify-between gap-4"
            >
              <div className="w-16 h-16 bg-[#E0E0E0] rounded-sm flex-shrink-0 relative overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#E6E6E6]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-black truncate">
                  {item.name}
                </p>
                {item.variant && (
                  <p className="text-[11px] text-[#999] mt-1">{item.variant}</p>
                )}
                <p className="text-[11px] text-[#999]">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm text-black font-medium">
                Rs. {(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-[#DCDCDC] mb-8" />
        <div className="flex flex-col gap-4 text-sm">
          <div className="flex justify-between text-[#666]">
            <span>Subtotal</span>
            <span>Rs. {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-[#666]">
            <span>Shipping</span>
            <span>
              {shipping === 0 ? (
                <span className="text-green-700">Free</span>
              ) : (
                `Rs. ${shipping.toLocaleString()}`
              )}
            </span>
          </div>
          <div className="border-t border-[#DCDCDC] pt-4 flex justify-between font-semibold text-black tracking-wide">
            <span>Total</span>
            <span>Rs. {total.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-auto pt-10 flex flex-col gap-3">
          {[
            "Free returns within 30 days",
            "Secure & encrypted payment",
            "Worldwide shipping available",
          ].map((text) => (
            <div key={text} className="flex items-center gap-3">
              <div className="w-1 h-1 rounded-full bg-[#999]" />
              <p className="text-[11px] tracking-wide text-[#999]">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
