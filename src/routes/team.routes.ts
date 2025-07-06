import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createTeamController } from "../controllers/teams/teamCreate.controller";
import { deleteTeamController } from "../controllers/teams/teamDelete.controller";
import { listTeamController } from "../controllers/teams/teamList.controller";
import { listOneTeamController } from "../controllers/teams/teamListOne.controller";
import { updateTeamController } from "../controllers/teams/teamUpdate.controller";
import { createTeamSchema } from "../interfaces/team.interface";

export const team = new Hono();

team.get("/", (c) => listTeamController(c));
team.get("/:id", (c) => listOneTeamController(c));
team.post("/", zValidator("json", createTeamSchema), (c) => createTeamController(c));
team.patch("/:id", (c) => updateTeamController(c));
team.delete("/:id", (c) => deleteTeamController(c));

team.notFound((c) => {
	return c.text("Not Found", 404);
});
