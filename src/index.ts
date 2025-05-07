import { Hono } from "hono";

type Bindings = {
	NHPDATA: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.get("/track1", async (c) => {
	const res = await c.env.NHPDATA.list();

	if (res) {
		return c.json(res);
	}
});

export default app;
