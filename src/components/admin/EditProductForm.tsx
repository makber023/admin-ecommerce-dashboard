"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ImageIcon, X, ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Product } from "../../types/product";
import { Category } from "../../types/category";

interface EditProductFormProps {
  product: Product;
  categories: Category[];
}

export default function EditProductForm({
  product,
  categories,
}: EditProductFormProps) {
  const router = useRouter();

  const [name, setName] = useState(product.name);
  const [slug, setSlug] = useState(product.slug);
  const [description, setDescription] = useState(product.description ?? "");
  const [image, setImage] = useState(product.image ?? "");
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [categoryId, setCategoryId] = useState<number | "">(
    product.categoryId ?? "",
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  function handleNameChange(value: string) {
    setName(value);
    setSlug(
      value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
    );
  }

  async function openPicker() {
    if (images.length === 0) {
      const res = await fetch("/api/images");
      const data = await res.json();
      setImages(data);
    }
    setShowPicker((s) => !s);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          slug,
          description,
          image,
          price: Number(price),
          stock: Number(stock),
          categoryId: categoryId === "" ? null : Number(categoryId),
        }),
      });
      if (!res.ok) throw new Error("Failed to update product");
      router.push("/admin/products");
      router.refresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl">
      {/* Page header */}
      <div className="flex items-center gap-3 pb-5 ">
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => router.back()}
          className="shrink-0"
        >
          <ArrowLeft size={16} />
        </Button>
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Products
          </p>
          <h1 className="text-xl font-semibold tracking-tight">Edit Product</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* ── Left: Image col (2/5) ─────────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <Label>Image</Label>

            {/* Preview */}
            <div className="relative w-full rounded-xl overflow-hidden border border-border bg-muted group">
              {/* Preview */}
              {image ? (
                <div className="relative w-full rounded-xl overflow-hidden border border-border group">
                  <Image
                    src={image}
                    alt="Preview"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto"
                  />
                  <button
                    type="button"
                    onClick={() => setImage("")}
                    className="absolute top-2 right-2 p-1 rounded-full bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <div className="w-full py-10 rounded-xl border border-border border-dashed bg-muted flex flex-col items-center justify-center gap-2 text-muted-foreground">
                  <Package size={28} />
                  <span className="text-xs">No image selected</span>
                </div>
              )}
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={openPicker}
              className="justify-start gap-2 text-muted-foreground"
            >
              <ImageIcon size={13} />
              {image ? "Change image" : "Select image…"}
            </Button>

            {/* Picker grid */}
            {showPicker && (
              <div className="grid grid-cols-3 gap-1.5 border border-border rounded-lg p-2 max-h-48 overflow-y-auto">
                {images.map((src) => (
                  <div
                    key={src}
                    onClick={() => {
                      setImage(src);
                      setShowPicker(false);
                    }}
                    className={`relative aspect-square cursor-pointer rounded-md border-2 overflow-hidden transition-all hover:opacity-90 ${
                      image === src ? "border-foreground" : "border-transparent"
                    }`}
                  >
                    <Image src={src} alt={src} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Fields col (3/5) ───────────────────────────── */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Name + Slug */}
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="slug">
                  Slug
                  <span className="ml-1 text-[11px] text-muted-foreground font-normal">
                    (auto)
                  </span>
                </Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="grid gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="resize-none"
                rows={4}
              />
            </div>

            {/* Price + Stock */}
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="price">Price (Rs)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min={0}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  required
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  min={0}
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div className="grid gap-1.5">
              <Label>Category</Label>
              <Select
                value={categoryId === "" ? "none" : String(categoryId)}
                onValueChange={(v) =>
                  setCategoryId(v === "none" ? "" : Number(v))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="No category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No category</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            {/* Actions */}
            <div className="flex items-center gap-3 pt-1 mt-auto border-t border-border">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving…" : "Update Product"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
