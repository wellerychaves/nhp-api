import { eq } from "drizzle-orm";
import { db } from "../../database";
import { teamsTable } from "../../database/schemas/teams.schema";
import type { ICreateTeam } from "../../interfaces/team.interface";

export const createTeamService = async (input: ICreateTeam) => {
	const teamAlreadyExsists = await db
		.select()
		.from(teamsTable)
		.where(eq(teamsTable.teamName, input.teamName));

	if (teamAlreadyExsists.length >= 1) {
		throw new Error("This team is already registered");
	}

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
