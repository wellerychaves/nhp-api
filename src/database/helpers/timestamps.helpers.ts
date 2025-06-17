import { timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";

export const timestampsDrizzle = {
	updatedAt: timestamp().defaultNow().notNull(),
	createdAt: timestamp().defaultNow().notNull(),
};

export const timestampsZod = {
	createdAt: z.date().default(new Date()),
	updatedAt: z.date().default(new Date()),
};
