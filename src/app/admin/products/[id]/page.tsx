import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditProductForm from "@/components/admin/EditProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) return notFound();

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  if (!product) return notFound();

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

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
      <EditProductForm product={product} categories={categories} />
    </div>
  );
}
