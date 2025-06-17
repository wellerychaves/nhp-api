import { eq } from "drizzle-orm";
import { db } from "../../database";
import { usersTable } from "../../database/schemas/users.schema";
import type { IUser } from "../../interfaces/user.interface";

export const updateUserService = async (userId: string, body: Partial<IUser>) => {
	const updates: Partial<IUser> = {};

	if (body.userName) updates.userName = body.userName;

	if (Object.keys(updates).length === 0) {
		throw new Error("No valid property provided for update.");
	}

	const user = await db
		.update(usersTable)
		.set(updates)
		.where(eq(usersTable.id, userId))
		.returning();

	if (user.length === 0) {
		throw new Error("User Not found.");
	}

	return user;
};
