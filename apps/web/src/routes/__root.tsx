import { Toaster } from '@repo/ui/components/sonner';
import { Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Toaster />
      <div className="p-2 md:p-4">
        <Outlet />
      </div>
    </>
  );
}
