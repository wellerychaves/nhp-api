import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as matchesSchema from "./schemas/matches.schema";
import * as teamsSchema from "./schemas/teams.schema";
import * as usersSchema from "./schemas/users.schema";

const databaseURL = Bun.env.DATABASE_URL;

if (!databaseURL) {
	throw new Error("DATABASE_URL environment variable is not defined.");
}

const pool = new Pool({
	connectionString: databaseURL,
});

export const db = drizzle(pool, {
	schema: {
		...matchesSchema,
		...teamsSchema,
		...usersSchema,
	},
});
