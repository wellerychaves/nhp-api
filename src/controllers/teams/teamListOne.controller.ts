import type { Context } from "hono";
import { z } from "zod/v4";
import { listOneTeamService } from "../../services/teams/teamListOne.service";
import { uuidValidation } from "../../utils/validations/uuid.validation";

export const listOneTeamController = async (c: Context) => {
	const teamId: string = c.req.param("id");

	try {
		await uuidValidation(teamId);
		const team = await listOneTeamService(teamId);

		return c.json(team, 200);
	} catch (err) {
		if (err instanceof Error) {
			if (err instanceof z.ZodError) {
				return c.json({ message: err.issues }, 400);
			}

			if (err.message === "Team not found.") {
				return c.json({ message: err.message }, 404);
			}

			return c.json({ message: `An unexpected error occurred: ${err.message}` }, 500);
		}

		return c.json({ message: "An unknown error has occurred." }, 500);
	}
};
