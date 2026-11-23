import { activityLog, dashboardSummary } from "@/mocks/Dashboard";
import { newsService } from "@/features/news/services/news.service";
import { getNewsStats } from "@/features/news/newsStats";
import { formatDate } from "@/utils/formatDate";
import type { DashboardNewsRow, DashboardSummary } from "../types";

// Bagian berita diambil dari sumber yang sama dengan halaman Berita,
// jadi angkanya selalu cocok dengan data mock.
export const dashboardService = {
	async getSummary(): Promise<DashboardSummary> {
		const s = getNewsStats(await newsService.getAdminList());
		return {
			...dashboardSummary,
			news: {
				total: s.total,
				published: s.published,
				draft: s.draft,
				lastPublished: s.latestPublished
					? formatDate(s.latestPublished)
					: "-",
			},
		};
	},
	async getLatestNews(): Promise<DashboardNewsRow[]> {
		const items = await newsService.getAdminList();
		return [...items]
			.sort((a, b) => b.date.localeCompare(a.date))
			.slice(0, 4)
			.map((n) => ({
				id: n.id,
				title: n.title,
				category: n.category,
				date: formatDate(n.date),
				status: n.status,
				author: n.author,
				email: n.email,
				thumbnail: "/news1.jfif",
			}));
	},
	async getActivityLog() {
		return activityLog;
	},
};
