import type { Context } from "hono";
import { z } from "zod";
import { listOneMatchService } from "../../services/matches/matchListOne.service";
import { uuidValidation } from "../../utils/validations/uuid.validation";

export const listOneMatchController = async (c: Context) => {
	const matchId: string = c.req.param("id");

	try {
		await uuidValidation(matchId);
		const match = await listOneMatchService(matchId);

		return c.json(match, 200);
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
