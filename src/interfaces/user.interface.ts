import { z } from "zod";
import { timestampsZod } from "../database/helpers/timestamps.helpers";

export const userSchema = z.object({
	id: z.uuidv7(),
	userName: z.string().min(3, "User name must be at least 3 characters long"),
	email: z.email("Invalid E-mail"),
	password: z.string().min(5, "Password must be at list 5 characters long"),
	isAdmin: z.boolean().default(false),
	...timestampsZod,
});

export const createUserSchema = userSchema.pick({
	userName: true,
	email: true,
	password: true,
});

export const updateUserSchema = createUserSchema
	.partial()
	.refine((data) => Object.keys(data).length > 0, {
		message: "No valid property provided for update.",
	});

export const userLoginSchema = userSchema.pick({
	email: true,
	password: true,
});

export type IUser = z.infer<typeof userSchema>;
export type ICreateUser = z.infer<typeof createUserSchema>;
export type IUserLogin = z.infer<typeof userLoginSchema>;
