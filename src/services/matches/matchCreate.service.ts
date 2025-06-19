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

	const newMatch = await db.insert(matchesTable).values(newMatchData).returning();

	return newMatch;
};
