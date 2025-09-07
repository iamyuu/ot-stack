import { cn } from '@repo/ui/utils';

function Spinner({ className }: Readonly<{ className?: string }>) {
  return (
    <div className={cn('inline-block animate-spin duration-500', className)}>
      <span className="i-ph-spinner-gap" />
    </div>
  );
}

export default Spinner;
