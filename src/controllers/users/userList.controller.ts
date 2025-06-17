import type { Context } from "hono";
import { listUserService } from "../../services/users/userList.service";

export const listUserController = async (c: Context) => {
	try {
		const users = await listUserService();

		return c.json(users, 200);
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
