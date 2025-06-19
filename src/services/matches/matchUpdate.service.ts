import { eq } from "drizzle-orm";
import { db } from "../../database";
import { matchesTable } from "../../database/schemas/matches.schema";
import type { IMatch } from "../../interfaces/match.interface";

export const updateMatchService = async (matchId: string, body: Partial<IMatch>) => {
	const match = await db
		.update(matchesTable)
		.set(body)
		.where(eq(matchesTable.id, matchId))
		.returning();

	if (match.length === 0) {
		throw new Error("Match not found.");
	}

	return match;
};
