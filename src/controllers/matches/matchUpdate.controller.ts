import type { Context } from "hono";
import { z } from "zod";
import { updateMatchSchema } from "../../interfaces/match.interface";
import { updateMatchService } from "../../services/matches/matchUpdate.service";
import { uuidValidation } from "../../utils/validations/uuid.validation";

export const updateMatchController = async (c: Context) => {
	const matchId: string = c.req.param("id");
	const body = await c.req.json();

	try {
		await uuidValidation(matchId);
		const validatedBody = updateMatchSchema.parse(body);

		const updatedMatch = await updateMatchService(matchId, validatedBody);

		return c.json(updatedMatch, 200);
	} catch (err) {
		if (err instanceof Error) {
			if (err instanceof z.ZodError) {
				return c.json({ message: err.issues }, 400);
			}

			if (err.message === "User not found.") {
				return c.json({ message: err.message }, 404);
			}

			return c.json({ message: `An unexpected error occurred: ${err.message}` }, 500);
		}
		return c.json({ message: "An unknown error has occurred." }, 500);
	}
};
