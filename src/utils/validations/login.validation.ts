import type { Context } from "hono";
import { userLoginSchema } from "../../interfaces/user.interface";

export const loginValidation = async (c: Context) => {
	const credentials = await c.req.json();

	const parsed = userLoginSchema.safeParse(credentials);

	if (!parsed.success) {
		return c.text("invalid", 400);
	}
	return parsed.data;
};
