import { boolean, pgTable, varchar } from "drizzle-orm/pg-core";
import { timestampsDrizzle } from "../helpers/timestamps.helpers";

export const usersTable = pgTable("users", {
	id: varchar().primaryKey(),
	userName: varchar().notNull(),
	email: varchar().unique().notNull(),
	password: varchar().notNull(),
	isAdmin: boolean().default(false),
	...timestampsDrizzle,
});
