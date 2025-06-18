import { eq } from "drizzle-orm";
import { db } from "../../database";
import { teamsTable } from "../../database/schemas/teams.schema";
import type { ITeam } from "../../interfaces/team.interface";

export const updatedTeamService = async (teamId: string, body: Partial<ITeam>) => {
	const team = await db.update(teamsTable).set(body).where(eq(teamsTable.id, teamId)).returning();

	if (team.length === 0) {
		throw new Error("Team not found.");
	}

	return team;
};
