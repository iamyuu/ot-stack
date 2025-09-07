import { Button } from '@repo/ui/components/button';
import { Label } from '@repo/ui/components/label';
import { Slot } from '@repo/ui/components/slot';
import { cn } from '@repo/ui/utils';
import {
  createFormHook,
  createFormHookContexts,
  useStore,
} from '@tanstack/react-form';
import * as React from 'react';

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormItem,
  },
  formComponents: {
    Submission: FormSubmission,
  },
});

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn('grid gap-2', className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

function useField() {
  const { id } = React.useContext(FormItemContext);
  const { name, store, ...fieldContext } = useFieldContext();

  const errors = useStore(store, (state) => state.meta.errors);
  if (!fieldContext) {
    throw new Error('useField should be used within <FormItem>');
  }

  return {
    id,
    name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    errors,
    ...fieldContext,
  };
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  const { formItemId, errors } = useField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!errors.length}
      className={cn('data-[error=true]:text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { errors, formItemId, formDescriptionId, formMessageId } = useField();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !errors.length
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!errors.length}
      {...props}
    />
  );
}

function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
  const { formDescriptionId } = useField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
  const { errors, formMessageId } = useField();
  const body = errors.length
    ? String(errors[0]?.message ?? errors[0] ?? '')
    : props.children;
  if (!body) return null;

  return (
    <em
      data-slot="form-message"
      id={formMessageId}
      className={cn('text-destructive text-sm', className)}
      {...props}
    >
      {body}
    </em>
  );
}

function FormSubmission(props: React.ComponentProps<typeof Button>) {
  const { state } = useFormContext();

  return (
    <Button
      {...props}
      type="submit"
      disabled={props.disabled || !state.canSubmit || state.isSubmitting}
    />
  );
}

export { useAppForm, useFormContext, useField, withForm };
