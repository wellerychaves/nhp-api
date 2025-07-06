import type { Context } from "hono";
import { z } from "zod/v4";
import { updateTeamSchema } from "../../interfaces/team.interface";
import { updatedTeamService } from "../../services/teams/teamUpdate.service";
import { uuidValidation } from "../../utils/validations/uuid.validation";

export const updateTeamController = async (c: Context) => {
	const teamId: string = c.req.param("id");
	const body = await c.req.json();

	try {
		await uuidValidation(teamId);
		const validatedBody = updateTeamSchema.parse(body);

		const updatedTeam = await updatedTeamService(teamId, validatedBody);

		return c.json(updatedTeam, 200);
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
