import * as z from 'zod';

const DEFAULT_SERVER_PORT = 3035;
const DEFAULT_SERVER_HOST = 'localhost';

export const envSchema = z.object({
  SERVER_PORT: z.coerce
    .number()
    .min(0)
    .max(65535)
    .optional()
    .default(DEFAULT_SERVER_PORT),
  SERVER_HOST: z.string().min(1).default(DEFAULT_SERVER_HOST),
  SERVER_AUTH_SECRET: z.string().min(1),
  SERVER_POSTGRES_URL: z.string(),

  // Backend URL, used to configure OpenAPI (Scalar)
  PUBLIC_SERVER_URL: z.url(),
  PUBLIC_SERVER_API_PATH: z
    .optional(
      z.custom<`/${string}`>(
        (input) => typeof input === 'string' && input.startsWith('/'),
        'API Path must start with "/" if provided.',
      ),
    )
    .default('/api'),

  // Frontend URL, used to configure trusted origin (CORS)
  PUBLIC_WEB_URL: z.url(),
});

export const env = envSchema.parse(process.env);
