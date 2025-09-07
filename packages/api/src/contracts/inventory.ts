import { oc } from '@orpc/contract';
import { InventorySchema } from '@repo/db/schema';
import * as z from 'zod';

const InventoryIDSchema = InventorySchema.pick({ id: true });

export const inventoryContract = oc.tag('post').router({
  all: oc
    .route({
      method: 'GET',
      path: '/inventory',
      summary: 'List all inventory',
      description: 'Retrieve all inventory items',
    })
    .output(z.array(InventorySchema)),

  one: oc
    .route({
      method: 'GET',
      path: '/inventory/{id}',
      summary: 'Retrieve an inventory item',
      description:
        'Retrieve the full details of an inventory item based on unique identifier',
    })
    .input(InventoryIDSchema)
    .output(InventorySchema),

  create: oc
    .route({
      method: 'POST',
      path: '/inventory',
      summary: 'Create a new inventory item',
      description: 'Create a new inventory item.',
    })
    .input(InventorySchema.omit({ id: true, createdAt: true }))
    .output(z.object({})),

  update: oc
    .route({
      method: 'PUT',
      path: '/inventory/{id}',
      summary: 'Update an inventory item',
      description: 'Update an inventory item based on unique identifier.',
    })
    .input(InventorySchema)
    .output(z.object({})),

  delete: oc
    .route({
      method: 'DELETE',
      path: '/inventory/{id}',
      summary: 'Delete an inventory item',
      description:
        'Permanently remove an inventory item based on unique identifier',
    })
    .input(InventoryIDSchema)
    .output(z.object({})),
});
