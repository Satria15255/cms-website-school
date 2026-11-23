export interface DashboardSummary {
	news: {
		total: number;
		published: number;
		draft: number;
		lastPublished: string;
	};
	staff: {
		total: number;
		teachers: number;
		tu: number;
		allVerified: boolean;
	};
	classes: {
		total: number;
		vii: number;
		viii: number;
		ix: number;
		needsHomeroom: number;
	};
	site: { online: boolean; version: string; ssl: string };
}

export interface DashboardNewsRow {
	id: string;
	title: string;
	category: string;
	date: string;
	status: "published" | "draft";
	author: string;
	email: string;
	thumbnail?: string;
}

export interface ActivityLogItem {
	id: string;
	user: string;
	time: string;
	message: string;
	color: "green" | "blue" | "purple" | "amber";
}
