import { oc } from '@orpc/contract';
import { CreatePostSchema } from '@repo/db/schema';
import * as z from 'zod';

const postWithIdErrors = {
  MISSING_POST: {
    status: 404,
    data: z.object({
      postId: z.string(),
    }),
  },
} as const;

const postContract = oc
  .prefix('/posts')
  .tag('post')
  .router({
    all: oc
      .route({
        method: 'GET',
        path: '/',
        summary: 'List all posts',
        description: 'Retrieve all posts from all users',
      })
      .output(
        z.array(
          z.object({
            id: z.string(),
            title: z.string(),
            createdAt: z.string(),
          }),
        ),
      ),

    one: oc
      .route({
        method: 'GET',
        path: '/{id}',
        summary: 'Retrieve a post',
        description:
          'Retrieve the full details of a post using its unique identifier',
      })
      .errors(postWithIdErrors)
      .input(z.object({ id: z.url() }))
      .output(
        z.object({
          id: z.string(),
          title: z.string(),
          content: z.string(),
          createdAt: z.string(),
          author: z.object({
            id: z.string(),
            name: z.string(),
          }),
        }),
      ),

    create: oc
      .route({
        method: 'POST',
        path: '/',
        summary: 'Create a new post',
        description: 'Create a new post with title and content.',
      })
      .input(CreatePostSchema)
      .output(z.object({})),

    delete: oc
      .route({
        method: 'DELETE',
        path: '/{id}',
        summary: 'Delete a post',
        description: 'Permanently remove a post using its unique identifier',
      })
      .errors(postWithIdErrors)
      .input(z.object({ id: z.url() }))
      .output(z.object({})),
  });

export default postContract;
