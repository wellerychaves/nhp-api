import { eq } from "drizzle-orm";
import { db } from "../../database";
import { matchesTable } from "../../database/schemas/matches.schema";

export const deleteMatchService = async (matchId: string) => {
	const match = await db.delete(matchesTable).where(eq(matchesTable.id, matchId)).returning();

	if (match.length === 0) {
		throw new Error("Match not found.");
	}

	return match;
};
