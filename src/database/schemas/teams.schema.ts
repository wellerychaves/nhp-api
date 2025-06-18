import { pgTable, varchar } from "drizzle-orm/pg-core";
import { timestampsDrizzle } from "../helpers/timestamps.helpers";

export const teamsTable = pgTable("teams", {
	id: varchar().primaryKey(),
	teamName: varchar().notNull(),
	color: varchar().notNull(),
	...timestampsDrizzle,
});
