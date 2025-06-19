import { z } from "zod/v4";
import { timestampsZod } from "../database/helpers/timestamps.helpers";

export const matchSchema = z.object({
	id: z.uuidv7(),
	date: z.iso.date(),
	time: z.iso.time(),
	teamAId: z.uuidv7(),
	teamBId: z.uuidv7(),
	...timestampsZod,
});

export const createMatchSchema = matchSchema.pick({
	date: true,
	time: true,
	teamAId: true,
	teamBId: true,
});

export type IMatch = z.infer<typeof matchSchema>;
export type ICreateMatch = z.infer<typeof createMatchSchema>;
