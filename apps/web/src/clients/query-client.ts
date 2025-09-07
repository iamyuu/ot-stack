import { isAPIError, type APIError } from '@repo/api/client';
import {
  MutationCache,
  QueryClient,
  type QueryKey,
} from '@tanstack/react-query';
import { toast } from 'sonner';

const MAX_RETRY = 3;

type ToastMessage<TParam> = string | null | ((param: TParam) => string | null);

declare module '@tanstack/react-query' {
  interface Register {
    // Set the default error type to APIError
    defaultError: APIError;

    // Define custom mutation metadata
    mutationMeta: Partial<{
      // Used to automatically invalidate queries after mutation success
      invalidateQuery: QueryKey;

      // Used to show toast notifications after mutation success or error
      toast: Partial<{
        error: ToastMessage<APIError>;
        success: ToastMessage<unknown>;
      }>;
    }>;
  }
}

function getToastMessage<TParam>(
  param: TParam,
  message?: ToastMessage<TParam>,
) {
  return typeof message === 'function' ? message(param) : message;
}

function isUnauthorized(error: unknown) {
  return isAPIError(error)
    ? error.status === 401 || error.status === 403
    : false;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Throw error if query fails, so we can catch it with ErrorBoundary
      throwOnError: true,

      // Control refetching behavior
      refetchOnMount: true,
      refetchInterval: false,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,

      retry: (failureCount, error) => {
        // Skip retry if the error is unauthorized
        if (isUnauthorized(error)) {
          return false;
        }

        // Retries when the failure count is less than the maximum retry count
        return failureCount <= MAX_RETRY;
      },
      // Retry every 2, 4, 8, 16, 30 seconds
      retryDelay: (retryCount) => Math.min(1_000 * 2 ** retryCount, 30_000),
    },

    mutations: {
      onError: (_error, _variables, recover) => {
        // Recover from error, if possible
        if (typeof recover === 'function') {
          return recover();
        }

        return null;
      },
    },
  },

  mutationCache: new MutationCache({
    onSuccess: (data, _variables, _context, mutation) => {
      // Automatically invalidate the query cache based on the mutation key
      const invalidateQuery = mutation.options.meta?.invalidateQuery;
      if (invalidateQuery) {
        queryClient?.invalidateQueries({ queryKey: invalidateQuery });
      }

      // Show success toast if provided
      const message = getToastMessage(data, mutation.meta?.toast?.success);
      if (message) {
        toast.success(message);
      }
    },

    onError(error, _variables, _context, mutation) {
      // If provided and not null show error toast, otherwise use default error message
      const reason = getToastMessage(error, mutation.meta?.toast?.error);
      if (reason !== null) {
        toast.error(reason ?? error.message);
      }
    },
  }),
});
