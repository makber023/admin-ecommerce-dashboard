import prisma from "@/lib/prisma";
import ProductGrid from "@/components/client/ProductGrid";
import Sorting from "@/components/client/Sorting";
import { notFound } from "next/navigation";

interface Params {
  slug: string;
}

export default async function CollectionPage({ params }: { params: Params }) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) {
    return notFound();
  }

  const products = await prisma.product.findMany({
    where: { categoryId: category.id },
    orderBy: { price: "desc" },
    select: {
      id: true,
      slug: true,
      name: true,
      price: true,
      image: true,
    },
  });

  const formattedProducts = products.map((p) => ({
    ...p,
    image: p.image ?? undefined,
  }));

  return (
    <div className="py-32 bg-[#E6E6E6]" data-header="light">
      <div className="max-w-full mx-auto px-4">
        <h2 className="text-[1.3rem] mb-8 text-center text-black uppercase tracking-wider font-mono">
          {category.name} Collection
        </h2>

        <Sorting totalProducts={formattedProducts.length} />
        <div className="px-[10vw]">
          <ProductGrid products={formattedProducts} />
        </div>
      </div>
    </div>
  );
}
