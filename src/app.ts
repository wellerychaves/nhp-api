import { serve } from "bun";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { routes } from "./routes/index.routes";

const port = process.env.PORT || 3000;

const app = new Hono();
app.use(
	"*",
	cors({
		origin: ["https://nhp.wellery.site/", "http://nhp.wellery.site/"],
	}),
);

app.route("/", routes);

app.get("/", (c) => {
	return c.text("Hello Mizera!");
});

serve({
	fetch: app.fetch,
	port: port,
});

console.log(`app running on port: ${port}`);
