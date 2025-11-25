import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AdminDashboardSidebar } from "@/modules/dashboard/components/admin-dashboard-sidebar";
import { DashboardHeader } from "@/modules/dashboard/components/dashboard-header";

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminDashboardSidebar />
      <SidebarInset>
        <div className="h-full w-full flex-1">
          <DashboardHeader />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
