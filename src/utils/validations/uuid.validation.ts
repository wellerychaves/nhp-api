import { z } from "zod";

const uuidSchema = z.string().uuid({
	message: "This ID isn't in a valid format",
});

export const uuidValidation = async (id: string) => {
	return uuidSchema.parse(id);
};
