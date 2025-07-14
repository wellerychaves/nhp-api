import type { Context } from "hono";
import { z } from "zod";
import { createTeamSchema } from "../../interfaces/team.interface";
import { createTeamService } from "../../services/teams/teamCreate.service";

export const createTeamController = async (c: Context) => {
	try {
		const body = await c.req.json();
		const validatedBody = createTeamSchema.parse(body);

		const team = await createTeamService(validatedBody);

		return c.json(team, 201);
	} catch (err) {
		if (err instanceof Error) {
			if (err instanceof z.ZodError) {
				return c.json({ message: err.issues }, 400);
			}

			if (err.message === "This team is already registered") {
				return c.json({ message: err.message }, 409);
			}

			return c.json({ message: `An unexpected error occurred: ${err.message}` }, 500);
		}

		return c.json({ message: "An unknown error has occurred." }, 500);
	}
};
