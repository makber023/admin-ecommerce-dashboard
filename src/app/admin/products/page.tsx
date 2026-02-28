import prisma from "@/lib/prisma";
import ProductsGrid from "@/components/admin/AdminProductsGrid";

export default async function ProductsPage() {
  let products = [];

  try {
    products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        image: true,
      },
    });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }

  return (
    <div className="min-h-screen p-6 md:p-10 space-y-5">
      <div className="flex items-end justify-between border-b border-border pb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
            Admin Panel
          </p>
          <h1 className="text-3xl  tracking-tight">Products</h1>
        </div>
        <p className="text-sm text-muted-foreground hidden md:block">
          {new Date().toLocaleDateString("en-PK", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <ProductsGrid products={products} />
    </div>
  );
}
