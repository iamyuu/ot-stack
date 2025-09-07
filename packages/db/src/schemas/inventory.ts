import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import * as z from 'zod';

export const inventory = pgTable('inventory', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  name: t.varchar({ length: 256 }).notNull(),
  createdAt: t
    .timestamp({ mode: 'string', withTimezone: true })
    .notNull()
    .defaultNow(),
}));

export const InventorySchema = createInsertSchema(inventory, {
  id: z.uuid(),
  name: z.string().max(256),
});

export type Inventory = z.infer<typeof InventorySchema>;
