import type { AdminNewsItem } from "./admin.types";

// Semua angka di kartu statistik dihitung dari data, bukan ditulis manual.
export const getNewsStats = (items: AdminNewsItem[]) => {
	const published = items.filter((i) => i.status === "published");
	const categories: Record<string, number> = {};
	for (const i of items)
		categories[i.category] = (categories[i.category] ?? 0) + 1;
	const latestPublished = [...published].sort((a, b) =>
		b.date.localeCompare(a.date),
	)[0]?.date;
	return {
		total: items.length,
		published: published.length,
		draft: items.length - published.length,
		categories,
		latestPublished,
	};
};
