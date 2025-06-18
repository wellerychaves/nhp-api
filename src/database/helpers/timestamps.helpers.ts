import { timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";

export const timestampsDrizzle = {
	createdAt: timestamp({ mode: "date" }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: "date" })
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
};

export const timestampsZod = {
	updatedAt: z.date().default(new Date()),
	createdAt: z.date().default(new Date()),
};
