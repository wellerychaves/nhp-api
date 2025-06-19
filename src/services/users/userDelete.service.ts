import { eq } from "drizzle-orm";
import { db } from "../../database";
import { usersTable } from "../../database/schemas/users.schema";

export const deleteUserService = async (userId: string) => {
	const user = await db.delete(usersTable).where(eq(usersTable.id, userId)).returning();

	if (user.length === 0) {
		throw new Error("User not found.");
	}

	return user;
};
