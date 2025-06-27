import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as matchesSchema from "./schemas/matches.schema";
import * as teamsSchema from "./schemas/teams.schema";
import * as usersSchema from "./schemas/users.schema";

const databaseURL = Bun.env.DATABASE_URL;

if (!databaseURL) {
	throw new Error("DATABASE_URL environment variable is not defined.");
}

const queryClient = postgres(databaseURL);
export const db = drizzle(queryClient, {
	schema: {
		...matchesSchema,
		...teamsSchema,
		...usersSchema,
	},
});
