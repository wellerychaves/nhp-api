import { db } from "../../database";

export const listMatchService = async () => {
	const query = await db.query.matchesTable.findMany({
		with: {
			teamA: true,
			teamB: true,
		},
	});

	const matches = query.map(({ teamAId, teamBId, ...rest }) => {
		const dateParts = rest.date ? rest.date.split("-") : ["", "", ""];
		const [year, month, day] = dateParts;

		const formattedDate = `${day}/${month}/${year}`;

		const formattedTime = rest.time ? rest.time.substring(0, 5) : "";

		return {
			...rest,
			date: formattedDate,
			time: formattedTime,
		};
	});
	return {
		total: matches.length,
		matches,
	};
};
