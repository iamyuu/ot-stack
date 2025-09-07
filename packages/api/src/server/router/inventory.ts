import { protectedProcedure } from '../orpc';

export const inventoryRouter = {
  all: protectedProcedure.inventory.all.handler(({ context }) =>
    context.db
      .selectFrom('inventory')
      .select(['id', 'name', 'createdAt'])
      .orderBy('createdAt', 'desc')
      .execute(),
  ),

  one: protectedProcedure.inventory.one.handler(
    async ({ context, input, errors }) => {
      const [dbPost] = await context.db
        .selectFrom('inventory')
        .select(['id', 'name', 'createdAt'])
        .where('id', '=', input.id)
        .execute();

      if (!dbPost) {
        throw errors.MISSING_ITEM({
          data: { id: input.id },
        });
      }

      return dbPost;
    },
  ),

  create: protectedProcedure.inventory.create.handler(
    async ({ context, input }) => {
      await context.db.insertInto('inventory').values(input).execute();
      return {};
    },
  ),

  delete: protectedProcedure.inventory.delete.handler(
    async ({ context, input, errors }) => {
      const res = await context.db
        .deleteFrom('inventory')
        .where('id', '=', input.id)
        .execute();
      if (res.length === 0) {
        throw errors.MISSING_ITEM({
          data: { id: input.id },
        });
      }
      return {};
    },
  ),
};
