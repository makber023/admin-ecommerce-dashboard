import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import ProductDescription from "./ProductDescription";
import ProductActions from "@/components/client/ProductActions";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-30 ">
        <nav className="flex items-center gap-2 text-xs tracking-widest text-gray-400 uppercase font-light">
          <span className="hover:text-gray-700 cursor-pointer transition-colors">
            Home
          </span>
          <span>—</span>
          {product.category && (
            <>
              <span className="hover:text-gray-700 cursor-pointer transition-colors capitalize">
                {product.category.name}
              </span>
              <span>—</span>
            </>
          )}
          <span className="text-gray-700">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 md:items-center">
          <div className="relative">
            {product.stock <= 5 && product.stock > 0 && (
              <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-sm px-3 py-1 text-[10px] tracking-widest uppercase text-amber-700 border border-amber-200">
                Only {product.stock} left
              </div>
            )}
            {product.stock === 0 && (
              <div className="absolute top-4 left-4 z-10 bg-black px-3 py-1 text-[10px] tracking-widest uppercase text-white">
                Sold Out
              </div>
            )}

            <div className="relative aspect-[3/4] flex items-center justify-center overflow-hidden group">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              ) : (
                <div className="flex flex-col items-center gap-3 text-gray-300">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <p className="text-sm tracking-widest uppercase">No Image</p>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-[10px] tracking-[0.3em] text-gray-400 uppercase">
                Mahram
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
          </div>

          <div className="md:px-[5%] flex flex-col">
            {product.category && (
              <span className="text-[12px] tracking-widest text-gray-400 uppercase px-3 py-3 text-center">
                {product.category.name}
              </span>
            )}

            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 leading-[1.1] mb-6 uppercase text-center">
              {product.name}
            </h1>

            <div className="w-12 h-px bg-gray-900 mb-6 self-center" />

            {product.description && (
              <div className="mb-6 text-center">
                <ProductDescription description={product.description} />
              </div>
            )}

            {/* Price */}
            <p className="text-lg mb-1 font-mono tracking-wider">
              Rs. {product.price.toLocaleString("en-IN")}
            </p>
            <p className="text-[11px] text-gray-400 tracking-wider mb-6">
              Taxes included.{" "}
              <span className="underline underline-offset-2 hover:text-gray-600 cursor-pointer transition-colors">
                Shipping
              </span>{" "}
              calculated at checkout.
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-2 mb-4">
              <label
                htmlFor="quantity"
                className="text-[10px] tracking-[0.3em] text-gray-400 uppercase"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                min={1}
                max={product.stock}
                defaultValue={1}
                className="w-20 border rounded px-2 py-1 text-center text-sm"
              />
            </div>

            {/* Add to Cart + Buy Now */}
            <ProductActions
              id={String(product.id)}
              name={product.name}
              price={product.price}
              image={product.image}
              stock={product.stock}
            />

            {/* Trust signals */}
            <div className="pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
              {[
                { label: "Authenticity", value: "Guaranteed" },
                { label: "Returns", value: "14 Day Policy" },
                { label: "Packaging", value: "Luxury Gift Box" },
                { label: "Support", value: "White Glove Service" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[10px] tracking-widest text-gray-400 uppercase mb-1">
                    {label}
                  </p>
                  <p className="text-xs text-gray-700">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
