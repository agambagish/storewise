import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export function CTASection() {
  return (
    <div className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 font-bold text-3xl">
            Start Selling Your Digital Assets
          </h2>
          <p className="mb-8 text-muted-foreground">
            Join thousands of creators earning from their digital products
          </p>
          <Link href="/sell" className={buttonVariants({ size: "lg" })}>
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
