import { createApi } from '@repo/api/server';
import { createAuth } from '@repo/auth/server';
import { createDb } from '@repo/db/client';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { env } from './env';

// ========================================================================= //

const trustedOrigins = [env.PUBLIC_WEB_URL].map((url) => new URL(url).origin);

const { db, pool } = createDb({ databaseUrl: env.SERVER_POSTGRES_URL });
const auth = createAuth({
  webUrl: env.PUBLIC_WEB_URL,
  serverUrl: env.PUBLIC_SERVER_URL,
  apiPath: env.PUBLIC_SERVER_API_PATH,
  authSecret: env.SERVER_AUTH_SECRET,
  pool,
});
const api = createApi({
  auth,
  db,
  serverUrl: env.PUBLIC_SERVER_URL,
  apiPath: env.PUBLIC_SERVER_API_PATH,
});

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

// ========================================================================= //

app.get('/healthcheck', (c) => {
  return c.text('OK');
});

app.use(logger());

// ========================================================================= //

app.use(
  `${env.PUBLIC_SERVER_API_PATH}/auth/*`,
  cors({
    origin: trustedOrigins,
    credentials: true,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
  }),
);

app.on(['POST', 'GET'], `${env.PUBLIC_SERVER_API_PATH}/auth/*`, (c) =>
  auth.handler(c.req.raw),
);

// ========================================================================= //

app.use(
  `${env.PUBLIC_SERVER_API_PATH}/*`,
  cors({
    origin: trustedOrigins,
    credentials: true,
  }),
  async (c, next) => {
    const { matched, response } = await api.handler(c.req.raw);
    if (matched) {
      return c.newResponse(response.body, response);
    }

    await next();
  },
);

export default app;
