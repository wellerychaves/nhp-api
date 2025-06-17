import type { Context } from "hono";
import { listOneUserService } from "../../services/users/userListOne.service";

export const listOneUserController = async (c: Context) => {
	const userId: string = c.req.param("id");

	try {
		const user = await listOneUserService(userId);

		return c.json(user, 200);
	} catch (err) {
		if (err instanceof Error) {
			if (err.message === "User not found.") {
				return c.json({ message: err.message }, 404);
			}

			return c.json({ message: `An unexpected error occurred: ${err.message}` }, 500);
		}
		return c.json({ message: "An unknown error has occurred." }, 500);
	}
};
