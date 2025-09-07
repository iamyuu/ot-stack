import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(admin)/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
  );
}
