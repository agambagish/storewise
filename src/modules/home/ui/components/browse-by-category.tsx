"use client";

import Link from "next/link";

import { useQuery } from "@tanstack/react-query";

import { Skeleton } from "@/components/ui/skeleton";
import { orpc } from "@/orpc/client";

export function BrowseByCategory() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <h2 className="mb-6 font-bold text-2xl">Browse by Category</h2>
      <CategoryGrid />
    </div>
  );
}

function CategoryGrid() {
  const { data, isLoading } = useQuery(orpc.categories.getMany.queryOptions());

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i.toString()} className="aspect-3/2 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {data?.map((category) => (
        <Link
          key={category.id}
          href={`/${category.slug}`}
          className="group flex aspect-3/2 flex-col justify-center rounded-lg border p-6 text-center transition-all hover:shadow-md"
        >
          <span className="mb-2 text-3xl">{category.emoji}</span>
          <h3 className="font-medium transition-colors group-hover:text-primary">
            {category.label}
          </h3>
        </Link>
      ))}
    </div>
  );
}
