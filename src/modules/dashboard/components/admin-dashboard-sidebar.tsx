"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { ClipboardEdit, HandCoins } from "lucide-react";

import { StoreLogo } from "@/components/store-logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const SIDEBAR_LINKS = [
  {
    label: "Store Applications",
    slug: "",
    icon: ClipboardEdit,
  },
  {
    label: "Payout Settings",
    slug: "payout-settings",
    icon: HandCoins,
  },
];

export function AdminDashboardSidebar() {
  const activeSegment = useSelectedLayoutSegment();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <StoreLogo
                name="Admin"
                href="/admin"
                color="var(--primary)"
                icon="Shield"
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_LINKS.map((link) => (
                <SidebarMenuItem key={link.slug}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      activeSegment === link.slug ||
                      (link.slug === "" && activeSegment === null)
                    }
                  >
                    <Link
                      href={link.slug ? `/admin/${link.slug}` : "/admin"}
                      className={
                        activeSegment === link.slug
                          ? "opacity-100"
                          : "opacity-80"
                      }
                    >
                      <link.icon />
                      {link.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
