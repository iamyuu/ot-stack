import { SidebarInset, SidebarProvider } from '@repo/ui/components/sidebar';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AppHeader } from '~/components/layout/app-header';
import { AppSidebar } from '~/components/layout/app-sidebar';

export const Route = createFileRoute('/(admin)')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
