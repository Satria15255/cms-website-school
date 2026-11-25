import { dashboardSummary } from "@/mocks/Dashboard";
import { auditService } from "@/features/audit/services/audit.service";
import { newsService } from "@/features/news/services/news.service";
import { getNewsStats } from "@/features/news/newsStats";
import { classService } from "@/features/classes/services/class.service";
import { getRombelStats } from "@/features/classes/rombelUtils";
import { formatDate } from "@/utils/formatDate";
import type {
	ActivityLogItem,
	DashboardNewsRow,
	DashboardSummary,
} from "../types";

const LOG_COLOR = {
	PUBLISH: "green",
	UPDATE: "blue",
	CREATE: "purple",
	ARCHIVE: "amber",
	DELETE: "amber",
} as const;
const pad = (n: number) => String(n).padStart(2, "0");
const logTime = (ts: number) => {
	const d = new Date(ts);
	const days = Math.floor((Date.now() - ts) / 86_400_000);
	const hm = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
	return days < 1
		? hm
		: days < 2
			? `Kemarin, ${hm}`
			: formatDate(d.toISOString().slice(0, 10));
};

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
	async getActivityLog(): Promise<ActivityLogItem[]> {
		// 4 mutasi terbaru dari Log Aktivitas (tanpa login)
		const entries = await auditService.getAll();
		return entries
			.filter((e) => e.action !== "LOGIN")
			.slice(0, 4)
			.map((e) => ({
				id: e.id,
				user: e.userId,
				time: logTime(e.timestamp),
				message: e.summary,
				color: LOG_COLOR[e.action as keyof typeof LOG_COLOR],
			}));
	},
};
