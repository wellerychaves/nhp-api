import { db } from "../../database";
import { teamsTable } from "../../database/schemas/teams.schema";

export const listTeamService = async () => {
	const query = await db.select().from(teamsTable);

	const teams = {
		total: query.length,
		teams: query,
	};

	return teams;
};
