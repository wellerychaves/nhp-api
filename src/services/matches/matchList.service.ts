import { db } from "../../database";
import { matchesTable } from "../../database/schemas/matches.schema";

export const listMatchService = async () => {
	const query = await db.select().from(matchesTable);

	const matches = {
		total: query.length,
		matches: query,
	};

	return matches;
};
