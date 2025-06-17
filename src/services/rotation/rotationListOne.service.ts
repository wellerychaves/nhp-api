export const listOneRotationService = async (rotationId: string) => {
	const res = rotationId;

	if (!res) {
		throw new Error("Data not found.");
	}

	try {
		return JSON.parse(res);
	} catch (_err) {
		throw new Error("Failed to process data.");
	}
};
