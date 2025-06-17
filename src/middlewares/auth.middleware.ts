import { Hono } from "hono";
import type { JwtVariables } from "hono/jwt";
import { jwt } from "hono/jwt";

const secretPhrase = Bun.env.SECRET_PHRASE;

if (!secretPhrase) {
	throw new Error("SECRET_PHRASE environment variable is not defined.");
}

// Specify the variable types to infer the `c.get('jwtPayload')`:
type Variables = JwtVariables;

const app = new Hono<{ Variables: Variables }>();
app.use(
	"/auth/*",
	jwt({
		secret: secretPhrase,
	}),
);

app.get("/auth/page", (c) => {
	return c.text("You are authorized");
});
