import Link from "next/link";
import Image from "next/image";

interface Product {
  name: string;
  slug: string;
  price: number;
  image?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="flex flex-col items-center  hover:scale-102 transition-transform"
    >
      <div className="relative w-full aspect-[4/5]">
        <Image
          src={product.image || "/images/luxury-watch-bg.jpg"}
          alt={product.name}
          fill
          className="object-cover rounded-md"
        />
      </div>

      <h3 className="text-center mt-2 text-sm font-mono tracking-wider text-black">
        {product.name}
      </h3>
      <p className="text-center text-sm text-[#4D4D4D] font-mono tracking-wider">
        Rs. {product.price.toLocaleString()}
      </p>
    </Link>
  );
}
