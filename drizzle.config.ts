import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./drizzle",
	dialect: "postgresql",
	schema: "./src/database/schemas",
	dbCredentials: {
		url: process.env.DATABASE_URL,
	},
});
