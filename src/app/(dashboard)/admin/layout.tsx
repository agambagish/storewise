import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AdminDashboardSidebar } from "@/modules/dashboard/components/admin-dashboard-sidebar";
import { DashboardHeader } from "@/modules/dashboard/components/dashboard-header";

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminDashboardSidebar />
      <SidebarInset className="@container/content">
        <div className="h-full w-full flex-1">
          <DashboardHeader />
          <div className="@7xl/content:mx-auto @7xl/content:w-full @7xl/content:max-w-7xl p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
