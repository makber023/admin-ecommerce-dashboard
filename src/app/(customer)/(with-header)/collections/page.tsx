import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function CollectionPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: { products: true },
      },
    },
  });

  return (
    <div className=" font-mono bg-[#F2F2F2]">
      <div className="bg-[#E6E6E6] border-b border-[#D0D0D0] pt-24 pb-10 px-8 text-center">
        <h4 className="text-sm tracking-widest text-[#888] mb-3">BROWSE</h4>
        <h1 className="text-5xl font-semibold text-black">Collections</h1>
        <p className="text-[#4D4D4D] mt-4 text-lg">
          Curated pieces for the discerning gentleman.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="max-w-6xl mx-auto px-8 pt-10 pb-28">
        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <p className="text-[#888] tracking-widest text-sm">
              NO COLLECTIONS FOUND
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-[#D0D0D0]">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/collections/${category.slug}`}
                className="group bg-[#F2F2F2] p-12 flex flex-col gap-4 hover:bg-[#E6E6E6] transition-colors duration-300"
              >
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-semibold text-black tracking-wide group-hover:underline underline-offset-4 decoration-1">
                    {category.name}
                  </h2>
                  {category._count?.products !== undefined && (
                    <p className="text-xs tracking-widest text-[#888]">
                      {category._count.products}{" "}
                      {category._count.products === 1 ? "PRODUCT" : "PRODUCTS"}
                    </p>
                  )}
                </div>
                <span className="text-sm tracking-widest text-black mt-4 group-hover:underline underline-offset-4 decoration-1">
                  SHOP NOW →
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
