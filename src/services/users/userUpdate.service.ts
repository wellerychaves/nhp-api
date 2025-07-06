import { eq } from "drizzle-orm";
import { db } from "../../database";
import { usersTable } from "../../database/schemas/users.schema";
import type { IUser } from "../../interfaces/user.interface";

export const updateUserService = async (userId: string, body: Partial<IUser>) => {
	const user = await db.update(usersTable).set(body).where(eq(usersTable.id, userId)).returning();

	if (user.length === 0) {
		throw new Error("User not found.");
	}

	return user;
};
