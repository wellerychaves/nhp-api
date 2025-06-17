import { eq } from "drizzle-orm";
import { sign } from "hono/jwt";
import { db } from "../../database";
import { usersTable } from "../../database/schemas/users.schema";
import { verifyPassword } from "../../utils/passwordUtils";

const secretPhrase = Bun.env.SECRET_PHRASE;

if (!secretPhrase) {
	throw new Error("SECRET_PHRASE environment variable is not defined.");
}

export const userLoginService = async (email: string, password: string) => {
	const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));

	if (!user) {
		throw new Error("Incorrect E-mail or password");
	}

	const storedUserPassword = user.password;

	const validatePassword = await verifyPassword(password, storedUserPassword);

	if (!validatePassword) {
		throw new Error("Incorrect E-mail or password");
	}

	const payload = {
		exp: Math.floor(Date.now() / 1000) + 60 * 20,
		name: user.userName,
		sub: user.id,
	};

	const token = sign(payload, secretPhrase);

	return token;
};
