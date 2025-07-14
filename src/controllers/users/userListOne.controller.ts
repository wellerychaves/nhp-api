import type { Context } from "hono";
import { z } from "zod";
import { listOneUserService } from "../../services/users/userListOne.service";
import { uuidValidation } from "../../utils/validations/uuid.validation";

export const listOneUserController = async (c: Context) => {
	const userId: string = c.req.param("id");

	try {
		await uuidValidation(userId);
		const user = await listOneUserService(userId);

		return c.json(user, 200);
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
