import { integer, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { timestampsDrizzle } from "../helpers/timestamps.helpers";

export const teamsTable = pgTable("teams", {
	id: uuid().primaryKey(),
	teamName: varchar().notNull(),
	color: varchar().notNull(),
	imageUrl: text(),
	points: integer().default(0),
	wins: integer().default(0),
	defeats: integer().default(0),
	...timestampsDrizzle,
});
