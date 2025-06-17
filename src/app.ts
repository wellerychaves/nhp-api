import { Hono } from "hono";
//import { cors } from "hono/cors";

import { routes } from "./routes/index.routes";

const app = new Hono();
app.use(
	"/",
	/* cors({
		origin: "https://nhp.wellery.site/",
	}), */
);

app.route("/", routes);

app.get("/", (c) => {
	return c.text("Hello Mizera!");
});

export default app;
