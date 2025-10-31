import Image from "next/image";
import Link from "next/link";

import { ArrowRight, Package, Store, TrendingUp, Users } from "lucide-react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const dummyProducts = [
  {
    id: "1",
    name: "Minimal Icon Set",
    price: 29,
    category: "graphics",
    image: "/dummy-p1.png",
  },
  {
    id: "2",
    name: "Dashboard UI Kit",
    price: 79,
    category: "ui-kits",
    image: "/dummy-p2.png",
  },
  {
    id: "3",
    name: "Modern Sans Font Family",
    price: 49,
    category: "fonts",
    image: "/dummy-p3.png",
  },
  {
    id: "4",
    name: "Abstract Illustrations Pack",
    price: 39,
    category: "graphics",
    image: "/dummy-p4.png",
  },
  {
    id: "5",
    name: "Mobile App UI Kit",
    price: 59,
    category: "ui-kits",
    image: "/dummy-p5.png",
  },
];

export function Hero() {
  return (
    <div className="overflow-hidden border-b bg-linear-to-br from-background via-muted/30 to-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Badge variant="secondary" className="mb-6">
              <TrendingUp className="mr-1 size-3" />
              10,000+ Premium Assets Available
            </Badge>
            <h1 className="mb-6 font-bold text-4xl md:text-6xl lg:text-7xl">
              Premium Digital Assets for Creators
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Discover thousands of high-quality design resources from talented
              creators worldwide
            </p>
            <div className="mb-12 flex flex-wrap gap-4">
              <Link href="/products" className={buttonVariants({ size: "lg" })}>
                Browse Products
                <ArrowRight />
              </Link>
              <Link
                href="/sell"
                className={buttonVariants({ size: "lg", variant: "outline" })}
              >
                <Store />
                Become a Seller
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-6 border-border/50 border-t pt-8 md:gap-8">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Package className="size-5 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-2xl">10k+</div>
                  <div className="text-muted-foreground text-xs">Products</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Users className="size-5 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-2xl">5k+</div>
                  <div className="text-muted-foreground text-xs">Creators</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <TrendingUp className="size-5 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-2xl">4.9/5</div>
                  <div className="text-muted-foreground text-xs">Rating</div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden grid-cols-2 gap-4 lg:grid">
            {dummyProducts.map((product, index) => (
              <Link
                key={product.id}
                href={`/products/${product.category}/${product.id}`}
                className={cn(
                  "group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg",
                  index === 0 && "col-span-2",
                )}
              >
                <AspectRatio ratio={index === 0 ? 2.35 / 1 : 3 / 2}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="absolute right-4 bottom-4 left-4">
                      <h3 className="mb-1 font-semibold text-sm text-white">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-white/90 text-xs">
                          ${product.price}
                        </span>
                        <Badge
                          variant="secondary"
                          className="text-xs capitalize"
                        >
                          {product.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </AspectRatio>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
