import type { Context } from "hono";
import { ZodError } from "zod";
import { deleteUserService } from "../../services/users/userDelete.service";
import { uuidValidation } from "../../utils/validations/uuid.validation";

export const deleteUserController = async (c: Context) => {
	const userId: string = c.req.param("id");
	uuidValidation(userId);

	try {
		await uuidValidation(userId);
		await deleteUserService(userId);

		return c.json({ message: "User Deleted" }, 200);
	} catch (err) {
		if (err instanceof Error) {
			if (err instanceof ZodError) {
				return c.json({ message: err.issues[0].message }, 400);
			}

			if (err.message === "User not found.") {
				return c.json({ message: err.message }, 404);
			}

			return c.json({ message: `An unexpected error occurred: ${err.message}` }, 500);
		}
		return c.json({ message: "An unknown error has occurred." }, 500);
	}
};
