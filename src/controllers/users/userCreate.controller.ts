import type { Context } from "hono";
import { ZodError } from "zod";
import { createUserSchema } from "../../interfaces/user.interface";
import { createUserService } from "../../services/users/userCreate.service";

export const createUserController = async (c: Context) => {
	try {
		const body = await c.req.json();
		const validatedBody = createUserSchema.parse(body);

		const user = await createUserService(validatedBody);

		return c.json(user, 201);
	} catch (err) {
		if (err instanceof Error) {
			if (err instanceof ZodError) {
				return c.json({ message: err.issues[0].message }, 400);
			}

			return c.json({ message: `An unexpected error occurred: ${err.message}` }, 500);
		}

		return c.json({ message: "An unknown error has occurred." }, 500);
	}
};
