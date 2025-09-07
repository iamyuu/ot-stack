import { createFileRoute } from '@tanstack/react-router';
import LoginCredentialsForm from '~/routes/(auth)/-components/login-form';

export const Route = createFileRoute('/(auth)/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <img src="/favicon.svg" alt="brand logo" className="size-4" />
          acme
        </div>
        <LoginCredentialsForm />
      </div>
    </div>
  );
}
