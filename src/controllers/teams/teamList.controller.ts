import type { Context } from "hono";
import { listTeamService } from "../../services/teams/teamList.service";

export const listTeamController = async (c: Context) => {
	try {
		const teams = await listTeamService();

		return c.json(teams, 200);
	} catch (err) {
		if (err instanceof Error) {
			return c.json({ message: `An unexpected error occurred: ${err.message}` }, 500);
		}
		return c.json({ message: "An unknown error has occurred." }, 500);
	}
};
