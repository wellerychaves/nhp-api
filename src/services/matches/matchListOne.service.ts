import { db } from "../../database";

export const listOneMatchService = async (matchId: string) => {
	const match = await db.query.matchesTable.findFirst({
		where: (match, { eq }) => eq(match.id, matchId),
		with: {
			teamA: true,
			teamB: true,
		},
	});

	if (!match) {
		throw new Error("Match not found.");
	}

	const { teamAId, teamBId, ...rest } = match;

	return rest;
};
