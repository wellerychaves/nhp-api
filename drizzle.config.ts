import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error("DATABASE_URL não está definida nas variáveis de ambiente.");
}

export default defineConfig({
	out: "./drizzle",
	dialect: "postgresql",
	schema: "./src/database/schemas",
	dbCredentials: {
		url: databaseUrl,
	},
});
