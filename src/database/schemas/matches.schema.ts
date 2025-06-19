import { relations } from "drizzle-orm";
import { date, pgTable, time, uuid } from "drizzle-orm/pg-core";
import { teamsTable } from "./teams.schema";

export const matchesTable = pgTable("matches", {
	id: uuid().primaryKey(),
	date: date(),
	time: time(),
	teamAId: uuid(),
	teamBId: uuid(),
});

export const matchesRelations = relations(matchesTable, ({ one }) => ({
	teamA: one(teamsTable, {
		fields: [matchesTable.teamAId],
		references: [teamsTable.id],
	}),
	teamB: one(teamsTable, {
		fields: [matchesTable.teamBId],
		references: [teamsTable.id],
	}),
}));
