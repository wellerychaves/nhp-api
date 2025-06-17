import type { Context } from "hono";
import { listOneRotationService } from "../../services/rotation/rotationListOne.service";

export const listOneRotationController = async (c: Context) => {
	const rotationId: string = c.req.param("id");

	try {
		const rotation = await listOneRotationService(rotationId);

		return c.json(rotation, 200);
	} catch (err: any) {
		return c.json({ message: err.message }, 404);
	}
};
