import { z } from "zod/v4";
import { timestampsZod } from "../database/helpers/timestamps.helpers";

export const teamSchema = z.object({
	id: z.uuidv7(),
	teamName: z.string().min(3, "Team name must be at least 3 characters long"),
	color: z
		.string()
		.regex(/^#?([0-9a-fA-F]{3}){1,2}$/, "The color has to be in a valid hexadecimal format"),
	imageUrl: z.url(),
	points: z.number().min(0),
	wins: z.number().min(0),
	defeats: z.number().min(0),
	...timestampsZod,
});

export const createTeamSchema = teamSchema.pick({
	teamName: true,
	color: true,
	imageUrl: true,
	points: true,
	wins: true,
	defeats: true,
});

export const updateTeamSchema = createTeamSchema
	.partial()
	.refine((data) => Object.keys(data).length > 0, {
		message: "No valid property provided for update.",
	});

export type ITeam = z.infer<typeof teamSchema>;
export type ICreateTeam = z.infer<typeof createTeamSchema>;
