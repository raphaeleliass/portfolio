export function DateFormatter(date: string) {
	const formattedDate = new Date(date).toLocaleString("pt-br", {
		month: "short",
		year: "numeric",
	});

	return formattedDate;
}
