import type { Context } from "hono";
import { listMatchService } from "../../services/matches/matchList.service";

export const listMatchController = async (c: Context) => {
	try {
		const matches = await listMatchService();

		return c.json(matches, 200);
	} catch (err) {
		if (err instanceof Error) {
			return c.json({ message: `An unexpected error occurred: ${err.message}` }, 500);
		}
		return c.json({ message: "An unknown error has occurred." }, 500);
	}
};
