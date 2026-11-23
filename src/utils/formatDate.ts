// "2026-10-20" -> "20 Okt 2026"
export const formatDate = (iso: string): string =>
	new Date(`${iso}T00:00:00`).toLocaleDateString("id-ID", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	});
