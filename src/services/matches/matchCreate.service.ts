import { db } from "../../database";
import { matchesTable } from "../../database/schemas/matches.schema";
import type { ICreateMatch } from "../../interfaces/match.interface";

export const createMatchService = async (input: ICreateMatch) => {
	const newMatchData = {
		id: Bun.randomUUIDv7(),
		date: input.date,
		time: input.time,
		teamAId: input.teamAId,
		teamBId: input.teamBId,
	};

	const [insertedMatch] = await db
		.insert(matchesTable)
		.values(newMatchData)
		.returning({ id: matchesTable.id });

	if (!insertedMatch || !insertedMatch.id) {
		throw new Error("Failed to create match: no ID returned after insertion.");
	}

	const matchWithTeams = await db.query.matchesTable.findFirst({
		where: (match, { eq }) => eq(match.id, insertedMatch.id),
		with: {
			teamA: true,
			teamB: true,
		},
	});

	return matchWithTeams;
};
