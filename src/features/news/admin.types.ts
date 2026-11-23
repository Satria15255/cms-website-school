import type { NewsItem } from "./types";

export type NewsStatus = "published" | "draft";

export interface AdminNewsItem extends NewsItem {
	status: NewsStatus;
	author: string;
	authorRole: string;
	email: string;
	time: string; // "08:30 WIB"
}
