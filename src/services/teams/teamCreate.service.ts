import { db } from "../../database";
import { teamsTable } from "../../database/schemas/teams.schema";
import type { ICreateTeam } from "../../interfaces/team.interface";

export const createTeamService = async (input: ICreateTeam) => {
	const newTeamData = {
		id: Bun.randomUUIDv7(),
		teamName: input.teamName,
		color: input.color,
	};

	const newTeam = await db.insert(teamsTable).values(newTeamData).returning();

	return newTeam;
};
