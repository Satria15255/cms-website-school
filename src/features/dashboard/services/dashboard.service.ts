import { activityLog, dashboardSummary } from "@/mocks/Dashboard";
import { newsService } from "@/features/news/services/news.service";
import { getNewsStats } from "@/features/news/newsStats";
import { classService } from "@/features/classes/services/class.service";
import { getRombelStats } from "@/features/classes/rombelUtils";
import { formatDate } from "@/utils/formatDate";
import type { DashboardNewsRow, DashboardSummary } from "../types";

// Berita dan rombel diambil dari sumber yang sama dengan halaman masing-masing,
// jadi angkanya selalu cocok dengan data mock.
export const dashboardService = {
	async getSummary(): Promise<DashboardSummary> {
		const [news, rombels] = await Promise.all([
			newsService.getAdminList(),
			classService.getAll(),
		]);
		const n = getNewsStats(news);
		const c = getRombelStats(rombels);
		return {
			...dashboardSummary,
			news: {
				total: n.total,
				published: n.published,
				draft: n.draft,
				lastPublished: n.latestPublished
					? formatDate(n.latestPublished)
					: "-",
			},
			classes: {
				total: c.active,
				vii: c.byLevel.VII,
				viii: c.byLevel.VIII,
				ix: c.byLevel.IX,
				needsHomeroom: c.pending,
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
