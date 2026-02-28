"use client";

import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";

interface ProductActionsProps {
  id: string;
  name: string;
  price: number;
  image?: string | null;
  stock: number;
}

export default function ProductActions({
  id,
  name,
  price,
  image,
  stock,
}: ProductActionsProps) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = () => {
    if (stock === 0) return;
    addItem({ id, name, price, image: image ?? undefined });
  };

  const handleBuyNow = () => {
    if (stock === 0) return;
    addItem({ id, name, price, image: image ?? undefined });
    router.push("/checkout");
  };

  return (
    <div className="flex gap-3 mb-10">
      <button
        onClick={handleAddToCart}
        disabled={stock === 0}
        className="flex-1 bg-black text-white px-8 py-3 text-xs tracking-[0.2em] uppercase transform transition-transform duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {stock === 0 ? "Out of Stock" : "Add to Cart"}
      </button>

      <button
        onClick={handleBuyNow}
        disabled={stock === 0}
        className="flex-1 text-black border border-black px-8 py-3 text-xs tracking-[0.2em] uppercase transform transition-transform duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Buy Now
      </button>
    </div>
  );
}
