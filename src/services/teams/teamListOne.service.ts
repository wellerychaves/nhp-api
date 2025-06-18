import { eq } from "drizzle-orm";
import { db } from "../../database";
import { teamsTable } from "../../database/schemas/teams.schema";

export const listOneTeamService = async (teamID: string) => {
	const team = await db.select().from(teamsTable).where(eq(teamsTable.id, teamID));

	if (team.length === 0) {
		throw new Error("Team not found.");
	}

	return team;
};
