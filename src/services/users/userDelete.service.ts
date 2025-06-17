import { eq } from "drizzle-orm";
import { db } from "../../database";
import { usersTable } from "../../database/schemas/users.schema";

export const deleteUserService = async (id: string) => {
	const user = await db.delete(usersTable).where(eq(usersTable.id, id)).returning();

	if (user.length === 0) {
		throw new Error("User Not found.");
	}

	return user;
};
