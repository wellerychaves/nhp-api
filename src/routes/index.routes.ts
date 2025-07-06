import { Hono } from "hono";
import { match } from "./match.routes";
import { rotation } from "./rotation.routes";
import { team } from "./team.routes";
import { user } from "./user.routes";

export const routes = new Hono();

routes.route("/rotation", rotation);
routes.route("/users", user);
routes.route("/teams", team);
routes.route("/matches", match);

routes.notFound((c) => {
	return c.text("Not Found", 404);
});
