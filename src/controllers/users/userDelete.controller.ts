import type { Context } from "hono";
import { deleteUserService } from "../../services/users/userDelete.service";

export const deleteUserController = async (c: Context) => {
	const userId: string = c.req.param("id");

	try {
		await deleteUserService(userId);

		return c.json({ message: "User Deleted" }, 200);
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
