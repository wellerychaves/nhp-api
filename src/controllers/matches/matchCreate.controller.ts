import type { Context } from "hono";
import { z } from "zod";
import { createMatchSchema } from "../../interfaces/match.interface";
import { createMatchService } from "../../services/matches/matchCreate.service";

export const createMatchController = async (c: Context) => {
	const body = await c.req.json();
	try {
		const validatedBody = createMatchSchema.parse(body);

		const match = await createMatchService(validatedBody);

		return c.json(match, 201);
	} catch (err) {
		if (err instanceof Error) {
			if (err instanceof z.ZodError) {
				return c.json({ message: err.issues }, 400);
			}

			return c.json({ message: `An unexpected error occurred: ${err.message}` }, 500);
		}

		return c.json({ message: "An unknown error has occurred." }, 500);
	}
};
