import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      image: true,
      stock: true,
      category: {
        select: { name: true },
      },
    },
  });

  const hasProducts = products.length > 0;

  return (
    <div className="max-w-[90rem] mx-auto px-6 py-12">
      <h1 className="text-2xl  mb-10 mt-20 text-center">ALL PRODUCTS</h1>

      {hasProducts ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 space-y-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group block overflow-hidden"
            >
              {product.image ? (
                <div className="relative w-full aspect-[4/5]">
                  <Image
                    src={product.image || "/images/luxury-watch-bg.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-95 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="aspect-square bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No image</span>
                </div>
              )}

              <div className="pt-1 mb-4">
                <h3 className="text-center text-sm font-mono tracking-wider text-black hover:underline">
                  {product.name}
                </h3>

                <p className="text-center text-sm text-[#4D4D4D] font-mono tracking-wider">
                  Rs. {product.price.toLocaleString()}
                </p>

                {product.stock === 0 && (
                  <p className="text-sm text-red-600 mt-2">Out of stock</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">No products available yet.</p>
          <Link
            href="/collections"
            className="mt-6 inline-block text-blue-600 hover:underline"
          >
            ← Browse collections
          </Link>
        </div>
      )}
    </div>
  );
}
