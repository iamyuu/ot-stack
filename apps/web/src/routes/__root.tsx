import { Toaster } from '@repo/ui/components/sonner';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { authClient } from '~/clients/auth-client';
import Spinner from '~/routes/-components/common/spinner';
import NavContainer from '~/routes/-components/layout/nav/nav-container';
import { Navbar } from '~/routes/-components/layout/nav/navbar';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <NavContainer>
        <Spinner />
      </NavContainer>
    );
  }

  return (
    <>
      <Navbar session={session} />
      <Toaster />
      <div className="p-2 md:p-4">
        <Outlet />
      </div>
    </>
  );
}
