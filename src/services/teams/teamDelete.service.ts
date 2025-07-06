import { eq } from "drizzle-orm";
import { db } from "../../database";
import { teamsTable } from "../../database/schemas/teams.schema";

export const deleteTeamService = async (teamId: string) => {
	const team = await db.delete(teamsTable).where(eq(teamsTable.id, teamId)).returning();

	if (team.length === 0) {
		throw new Error("Team not found.");
	}

	return team;
};
