import prisma from "@/lib/prisma";
import CategoriesTable from "@/components/admin/CategoriesTable";

export default async function CategoriesPage() {
  let categories = [];

  try {
    categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { products: true } } },
    });
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }

  return (
    <div className="min-h-screen p-6 md:p-10 space-y-5">
      <div className="flex items-end justify-between border-b border-border pb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
            Admin Panel
          </p>
          <h1 className="text-3xl  tracking-tight">Categories</h1>
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
      <CategoriesTable categories={categories} />
    </div>
  );
}
