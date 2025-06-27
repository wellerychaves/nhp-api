import { Hono } from "hono";
import { createMatchController } from "../controllers/matches/matchCreate.controller";
import { deleteMatchController } from "../controllers/matches/matchDelete.controller";
import { listMatchController } from "../controllers/matches/matchList.controller";
import { listOneMatchController } from "../controllers/matches/matchListOne.controller";
import { updateMatchController } from "../controllers/matches/matchUpdate.controller";

export const match = new Hono();

match.get("/", (c) => listMatchController(c));
match.get("/:id", (c) => listOneMatchController(c));
match.post("/", (c) => createMatchController(c));
match.patch("/:id", (c) => updateMatchController(c));
match.delete("/:id", (c) => deleteMatchController(c));

match.notFound((c) => {
	return c.text("Not Found", 404);
});
