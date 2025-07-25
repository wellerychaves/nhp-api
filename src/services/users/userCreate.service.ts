import { eq } from "drizzle-orm";
import { db } from "../../database";
import { usersTable } from "../../database/schemas/users.schema";
import type { ICreateUser } from "../../interfaces/user.interface";
import { hashPassword } from "../../utils/passwordUtils";

export const createUserService = async (input: ICreateUser) => {
	const emailAlreadyExists = await db
		.select()
		.from(usersTable)
		.where(eq(usersTable.email, input.email));

	if (emailAlreadyExists.length >= 1) {
		throw new Error("This email is already being used");
	}

	const newUserData = {
		id: Bun.randomUUIDv7(),
		userName: input.userName,
		email: input.email,
		password: await hashPassword(input.password),
	};

	const newUser = await db
		.insert(usersTable)
		.values(newUserData)
		.onConflictDoNothing({ target: usersTable.email })
		.returning();

	return newUser;
};
