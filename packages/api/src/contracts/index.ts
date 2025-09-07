import { oc } from '@orpc/contract';
import * as z from 'zod';
import { inventoryContract } from './inventory';

export const appContract = oc
  .errors({
    INPUT_VALIDATION_FAILED: {
      status: 422,
      data: z.object({
        formErrors: z.array(z.string()),
        fieldErrors: z.record(z.string(), z.array(z.string()).optional()),
      }),
    },
    MISSING_ITEM: {
      status: 404,
      message: 'The requested item was not found.',
      data: z.object({
        id: z.string(),
      }),
    },
    UNAUTHORIZED: {
      status: 401,
      message: 'Missing user session. Please log in!',
    },
    FORBIDDEN: {
      status: 403,
      message: 'You do not have enough permission to perform this action.',
    },
  })
  .router({
    inventory: inventoryContract,
  });
