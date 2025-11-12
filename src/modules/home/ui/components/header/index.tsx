import { StoreLogo } from "@/components/store-logo";

import { MainNav } from "./main-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <StoreLogo
              name="Storewise"
              href="/"
              color="var(--primary)"
              icon="Origami"
            />
            <MainNav />
          </div>
          {/* TODO: Cart Sheet & User Dropdown */}
        </div>
      </div>
    </header>
  );
}
