import type { Context } from "hono";
import { z } from "zod/v4";
import { deleteMatchService } from "../../services/matches/matchDelete.service";
import { uuidValidation } from "../../utils/validations/uuid.validation";

export const deleteMatchController = async (c: Context) => {
	const matchId: string = c.req.param("id");

	try {
		await uuidValidation(matchId);
		await deleteMatchService(matchId);

		return c.json({ message: "Match deleted" }, 200);
	} catch (err) {
		if (err instanceof Error) {
			if (err instanceof z.ZodError) {
				return c.json({ message: err.issues }, 400);
			}

			if (err.message === "Match not found.") {
				return c.json({ message: err.message }, 404);
			}

			return c.json({ message: `An unexpected error occurred: ${err.message}` }, 500);
		}

		return c.json({ message: "An unknown error has occurred." }, 500);
	}
};
