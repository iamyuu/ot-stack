import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import * as z from 'zod';
import { authClient } from '~/clients/auth-client';
import { useAppForm } from '~/components/common/form';

const FormSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export default function LoginCredentialsForm() {
  const navigate = useNavigate();
  const form = useAppForm({
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
    <Card className="space-y-4">
      <CardHeader className="text-center">
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form.AppForm>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.AppField
              name="email"
              children={(field) => (
                <field.FormItem>
                  <field.FormLabel>Email</field.FormLabel>
                  <field.FormControl>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </field.FormControl>
                  <field.FormMessage />
                </field.FormItem>
              )}
            />

            <form.AppField
              name="email"
              children={(field) => (
                <field.FormItem>
                  <field.FormLabel>Password</field.FormLabel>
                  <field.FormControl>
                    <Input
                      type="password"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </field.FormControl>
                  <field.FormMessage />
                </field.FormItem>
              )}
            />

            <form.Submission className="w-full">Log in</form.Submission>
          </form>
        </form.AppForm>
      </CardContent>
    </Card>
  );
}
