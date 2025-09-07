import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import * as z from 'zod';
import { authClient } from '~/clients/auth-client';
import FormFieldInfo from '~/components/common/form-field-info';

const FormSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export default function LoginCredentialsForm() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: FormSchema,
    },
    onSubmit: async ({ value }) => {
      await toast.promise(
        authClient.signIn.email(value, {
          throw: true,
          onSuccess: () => {
            navigate({ to: '/' });
          },
        }),
        {
          error: (error) => error.message,
        },
      );
    },
  });

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="grid gap-6">
            <form.Field
              name="email"
              children={(field) => {
                return (
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                    <FormFieldInfo field={field} />
                  </div>
                );
              }}
            />
          </div>

          <div className="grid gap-3">
            <form.Field
              name="password"
              children={(field) => (
                <>
                  <Label htmlFor={field.name}>Password</Label>
                  <div className="flex justify-end items-center relative w-full">
                    <Input
                      id={field.name}
                      type="password"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                  <FormFieldInfo field={field} />
                </>
              )}
            />
          </div>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="w-full"
              >
                Log in
              </Button>
            )}
          />
        </form>
      </CardContent>
    </Card>
  );

  // return (
  //   <form
  //     className="flex flex-col gap-6"

  //   >
  //     <div className="flex flex-col gap-6">
  //       <div className="flex flex-col items-center gap-2">
  //         <a
  //           href="#"
  //           className="flex flex-col items-center gap-2 font-medium"
  //         >
  //           {/* <div className="flex size-8 items-center justify-center rounded-md">
  //               <GalleryVerticalEnd className="size-6" />
  //             </div> */}
  //           <span className="sr-only">Acme Inc.</span>
  //         </a>
  //         <h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
  //       </div>
  //       <div className="flex flex-col gap-4">
  //         <div className="grid gap-3">

  //         </div>

  //         <div className="grid gap-3">

  //         </div>

  //       </div>
  //     </div>
  //   </form>
  // );
}
