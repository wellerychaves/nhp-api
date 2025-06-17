import type { Context } from "hono";
import { updateUserService } from "../../services/users/userUpdate.service";

export const updateUserController = async (c: Context) => {
	const userId: string = c.req.param("id");
	const body = await c.req.json();

	try {
		const updatedUser = await updateUserService(userId, body);

		return c.json(updatedUser, 200);
	} catch (err) {
		if (err instanceof Error) {
			if (err.message === "No valid property provided for update.") {
				return c.json({ message: err.message }, 400);
			}

			if (err.message === "User not found.") {
				return c.json({ message: err.message }, 404);
			}

			return c.json({ message: `An unexpected error occurred: ${err.message}` }, 500);
		}
		return c.json({ message: "An unknown error has occurred." }, 500);
	}
};
