import { createFileRoute } from '@tanstack/react-router';
import LoginCredentialsForm from '~/routes/_public/-components/login-form';

export const Route = createFileRoute('/_public/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginCredentialsForm />
      </div>
    </div>
  );
}
