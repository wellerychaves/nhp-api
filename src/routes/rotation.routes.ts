import { Hono } from "hono";
import { listOneRotationController } from "../controllers/rotation/rotationListOne.controller";

export const rotation = new Hono();

rotation.get("/:id", (c) => listOneRotationController(c));
