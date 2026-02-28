"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, ImageIcon, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

type FormState = {
  name: string;
  slug: string;
  description: string;
  image: string;
  price: string;
  stock: string;
  categoryId: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  slug: "",
  description: "",
  image: "",
  price: "",
  stock: "1",
  categoryId: "",
};

export default function AddProductButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    [],
  );

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  async function openPicker() {
    if (images.length === 0) {
      const res = await fetch("/api/images");
      const data = await res.json();
      setImages(data);
    }
    setShowPicker((s) => !s);
  }

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  // Auto-generate slug from name
  function handleNameChange(value: string) {
    set("name", value);
    set(
      "slug",
      value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
          categoryId: form.categoryId ? Number(form.categoryId) : null,
        }),
      });
      if (!res.ok) throw new Error("Failed to create product");
      setOpen(false);
      setForm(EMPTY_FORM);
      setShowPicker(false);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        size="sm"
        onClick={() => {
          setForm(EMPTY_FORM);
          setError(null);
          setOpen(true);
        }}
      >
        <Plus size={14} className="mr-1.5" />
        Add Product
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 pt-1">
            {/* Name */}
            <div className="grid gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="e.g. Wireless Headphones"
                value={form.name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
              />
            </div>

            {/* Slug */}
            <div className="grid gap-1.5">
              <Label htmlFor="slug">
                Slug
                <span className="ml-1 text-[11px] text-muted-foreground font-normal">
                  (auto-generated)
                </span>
              </Label>
              <Input
                id="slug"
                placeholder="wireless-headphones"
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="grid gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Short product description…"
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                className="resize-none"
                rows={3}
              />
            </div>

            {/* Image Picker */}
            <div className="grid gap-1.5">
              <Label>Image</Label>

              {/* Preview */}
              {form.image && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border group">
                  <Image
                    src={form.image}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => set("image", "")}
                    className="absolute top-2 right-2 p-1 rounded-full bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}

              <Button
                type="button"
                variant="outline"
                onClick={openPicker}
                className="justify-start gap-2 text-muted-foreground"
              >
                <ImageIcon size={14} />
                {form.image ? "Change image" : "Select image…"}
              </Button>

              {showPicker && (
                <div className="grid grid-cols-4 gap-2 border border-border rounded-lg p-2.5 max-h-44 overflow-y-auto">
                  {images.map((src) => (
                    <div
                      key={src}
                      onClick={() => {
                        set("image", src);
                        setShowPicker(false);
                      }}
                      className={`relative aspect-square cursor-pointer rounded-md border-2 overflow-hidden transition-all hover:opacity-90 ${
                        form.image === src
                          ? "border-foreground"
                          : "border-transparent"
                      }`}
                    >
                      <Image
                        src={src}
                        alt={src}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price + Stock side by side */}
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="price">Price (Rs)</Label>
                <Input
                  id="price"
                  type="number"
                  min={0}
                  placeholder="0"
                  value={form.price}
                  onChange={(e) => set("price", e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  min={0}
                  placeholder="1"
                  value={form.stock}
                  onChange={(e) => set("stock", e.target.value)}
                />
              </div>
            </div>

            {/* Category */}
            <div className="grid gap-1.5">
              <Label>Category</Label>
              <Select
                value={form.categoryId}
                onValueChange={(v) => set("categoryId", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving…" : "Save Product"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
