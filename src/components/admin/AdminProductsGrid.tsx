"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Pencil, Trash2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image?: string | null;
}

interface ProductsGridProps {
  products: Product[];
  setProducts?: React.Dispatch<React.SetStateAction<Product[]>>;
  isLoading?: boolean;
  error?: string | null;
}

export default function ProductsGrid({
  products,
  setProducts,
  isLoading,
  error,
}: ProductsGridProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const productToDelete = products.find((p) => p.id === confirmId);

  async function handleDelete() {
    if (!confirmId) return;
    setDeletingId(confirmId);
    setDeleteError(null);
    try {
      const res = await fetch(`/api/products/${confirmId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete product.");
      }
      setProducts?.((prev) => prev.filter((p) => p.id !== confirmId));
      setConfirmId(null);
    } catch (err: unknown) {
      setDeleteError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  // ── States ────────────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-card overflow-hidden animate-pulse"
          >
            <div className="aspect-[4/3] bg-muted" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-sm text-destructive">
          Failed to load products: {error}
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
        <div className="p-4 rounded-full bg-muted text-muted-foreground">
          <Package size={24} />
        </div>
        <p className="text-sm text-muted-foreground">No products found.</p>
      </div>
    );
  }

  // ── Grid ──────────────────────────────────────────────────────────────────

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Image */}
            {/* Image */}
            <div className="relative bg-muted overflow-hidden">
              {product.image ? (
                <div className="relative group">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={0}
                    height={0}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Stock badge */}
                  <div
                    className={`absolute top-2 right-2 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                      product.stock > 0
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of stock"}
                  </div>
                </div>
              ) : (
                <div className="w-full py-12 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                  <Package size={28} />
                  <span className="text-xs">No image</span>
                  {/* Stock badge for no-image state */}
                  <div
                    className={`absolute top-2 right-2 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                      product.stock > 0
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of stock"}
                  </div>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4">
              <h2 className="text-sm font-medium truncate">{product.name}</h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Rs. {product.price.toFixed(2)}
              </p>
            </div>

            {/* Actions */}
            <div className="px-4 pb-4 flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-1.5"
                asChild
              >
                <Link href={`/admin/products/${product.id}`}>
                  <Pencil size={13} />
                  Edit
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => {
                  setDeleteError(null);
                  setConfirmId(product.id);
                }}
                disabled={deletingId === product.id}
              >
                <Trash2 size={13} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!confirmId}
        onOpenChange={(o) => !o && setConfirmId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete product?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <strong>{productToDelete?.name}</strong>. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {deleteError && (
            <p className="text-sm text-destructive px-1">{deleteError}</p>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={!!deletingId}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deletingId ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
