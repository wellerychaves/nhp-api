import { eq } from "drizzle-orm";
import { db } from "../../database";
import { matchesTable } from "../../database/schemas/matches.schema";

export const listOneMatchService = async (matchId: string) => {
	const match = await db.select().from(matchesTable).where(eq(matchesTable.id, matchId));

	if (match.length === 0) {
		throw new Error("Match not found.");
	}

	return match;
};
