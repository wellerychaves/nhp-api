import { db } from "../../database/index";
import { usersTable } from "../../database/schemas/users.schema";

export const listUserService = async () => {
	const users = await db.select().from(usersTable);

	if (users.length === 0) {
		throw new Error("User not found.");
	}

	return users;
};
