import { type BetterAuthOptions, betterAuth } from 'better-auth';

import { openAPI } from 'better-auth/plugins';
import urlJoin from 'url-join';
import type { DatabaseConnection } from '@repo/db/client';

export interface AuthOptions {
  webUrl: string;
  serverUrl: string;
  apiPath: `/${string}`;
  authSecret: string;
  pool: DatabaseConnection;
}

export type AuthInstance = ReturnType<typeof createAuth>;

/**
 * This function is abstracted for schema generations in cli-config.ts
 */
export const getBaseOptions = (pool: DatabaseConnection) =>
  ({
    database: pool,

    /**
     * Only uncomment the line below if you are using plugins, so that
     * your types can be correctly inferred:
     */
    plugins: [openAPI()],
  }) satisfies BetterAuthOptions;

export const createAuth = ({
  webUrl,
  serverUrl,
  apiPath,
  pool,
  authSecret,
}: AuthOptions) => {
  return betterAuth({
    ...getBaseOptions(pool),
    baseURL: urlJoin(serverUrl, apiPath, 'auth'),
    secret: authSecret,
    trustedOrigins: [webUrl].map((url) => new URL(url).origin),
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60,
      },
    },
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
      requireEmailVerification: false,
    },
  });
};
