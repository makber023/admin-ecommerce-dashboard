"use client";

import { useCartStore } from "@/store/useCartStore";

interface AddToCartButtonProps {
  id: string;
  name: string;
  price: number;
  image?: string;
  variant?: string;
}

export default function AddToCartButton({
  id,
  name,
  price,
  image,
  variant,
}: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <button
      onClick={() => addItem({ id, name, price, image, variant })}
      className="flex-1 bg-black text-white px-8 py-3 text-xs tracking-[0.2em] uppercase transform transition-transform duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Add to Cart
    </button>
  );
}
