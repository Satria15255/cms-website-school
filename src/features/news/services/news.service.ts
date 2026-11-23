import { NewsList } from "@/mocks/NewsList";
import { newsAdminFallback, newsAdminMeta } from "@/mocks/NewsAdminMeta";
import type { NewsItem } from "../types";
import type { AdminNewsItem, NewsStatus } from "../admin.types";

// Data in-memory selama backend belum ada. Bentuk fungsinya sengaja async
// supaya nanti cukup ganti isinya dengan api.get/post/put/delete (Axios).
let db: NewsItem[] = [...NewsList];
const statuses: Record<string, NewsStatus> = {};
const wait = (ms = 250) => new Promise((r) => setTimeout(r, ms));

const toAdmin = (n: NewsItem): AdminNewsItem => {
	const m = newsAdminMeta[n.id] ?? newsAdminFallback;
	return {
		...n,
		status: statuses[n.id] ?? m.status,
		author: m.author,
		authorRole: m.role,
		email: m.email,
		time: m.time,
	};
};

export const newsService = {
	async getAll(): Promise<NewsItem[]> {
		await wait();
		return [...db];
	},
	async getAdminList(): Promise<AdminNewsItem[]> {
		await wait();
		return db.map(toAdmin);
	},
	async publish(id: string): Promise<void> {
		await wait();
		statuses[id] = "published";
	},
	async remove(id: string): Promise<void> {
		await wait();
		db = db.filter((n) => n.id !== id);
	},
};
