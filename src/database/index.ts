import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const databaseURL = Bun.env.DATABASE_URL;

if (!databaseURL) {
	throw new Error("DATABASE_URL environment variable is not defined.");
}

const queryClient = postgres(databaseURL);
export const db = drizzle({ client: queryClient });
