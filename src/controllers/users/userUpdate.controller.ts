import type { Context } from "hono";
import { ZodError } from "zod";
import { updateUserSchema } from "../../interfaces/user.interface";
import { updateUserService } from "../../services/users/userUpdate.service";
import { uuidValidation } from "../../utils/validations/uuid.validation";

export const updateUserController = async (c: Context) => {
	const userId: string = c.req.param("id");
	const body = await c.req.json();

	try {
		await uuidValidation(userId);
		const validatedBody = updateUserSchema.parse(body);

		const updatedUser = await updateUserService(userId, validatedBody);

		return c.json(updatedUser, 200);
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
