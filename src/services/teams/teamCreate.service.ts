import { db } from "../../database";
import { teamsTable } from "../../database/schemas/teams.schema";
import type { ICreateTeam } from "../../interfaces/team.interface";

export const createTeamService = async (input: ICreateTeam) => {
	const newTeamData = {
		id: Bun.randomUUIDv7(),
		teamName: input.teamName,
		color: input.color,
		imageUrl: input.imageUrl,
		points: input.points,
		wins: input.wins,
		defeats: input.defeats,
	};

	const newTeam = await db.insert(teamsTable).values(newTeamData).returning();

	return newTeam;
};
