import { Hono } from "hono";
import { rotation } from "./rotation.routes";
import { user } from "./user.routes";

export const routes = new Hono();

routes.route("/rotation", rotation);
routes.route("/users", user);

routes.notFound((c) => {
	return c.text("Not Found", 404);
});
