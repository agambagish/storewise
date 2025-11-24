import { useMemo } from "react";
import { usePathname } from "next/navigation";

const routeMapping: Record<string, Array<{ label: string; href: string }>> = {
  "/admin": [{ label: "Store Applications", href: "/admin" }],
  "/admin/payout-settings": [
    { label: "Store Applications", href: "/admin" },
    { label: "Payout Settings", href: "/admin/payout-settings" },
  ],
};

export function useBreadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    if (routeMapping[pathname]) {
      return routeMapping[pathname];
    }

    const segments = pathname.split("/").filter(Boolean);

    return segments.map((segment, i) => {
      const href = `/${segments.slice(0, i + 1).join("/")}`;

      return {
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        href,
      };
    });
  }, [pathname]);

  return breadcrumbs;
}
