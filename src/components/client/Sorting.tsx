"use client";

import { useState } from "react";

interface CategorySortRowProps {
  totalProducts: number;
  onSortChange?: (sort: string) => void;
}

export default function CategorySortRow({
  totalProducts,
  onSortChange,
}: CategorySortRowProps) {
  const [sort, setSort] = useState("Price, High to Low");

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    if (onSortChange) onSortChange(e.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto mb-6 px-4 md:px-10">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <span className="text-black font-medium">Sort by:</span>
          <select
            value={sort}
            onChange={handleSortChange}
            className=" rounded px-3 py-1"
          >
            <option>Price, High to Low</option>
            <option>Price, Low to High</option>
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </div>

        {/* Total products on the right */}
        <div className="text-black font-medium">
          {totalProducts} Product{totalProducts !== 1 && "s"}
        </div>
      </div>
    </div>
  );
}
