import { db } from "../../database/index";
import { usersTable } from "../../database/schemas/users.schema";

export const listUserService = async () => {
	const query = await db.select().from(usersTable);

	const users = {
		total: query.length,
		users: query,
	};

	return users;
};
