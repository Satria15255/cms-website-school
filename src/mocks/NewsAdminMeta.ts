import type { NewsStatus } from "@/features/news/admin.types";

interface Meta {
	status: NewsStatus;
	author: string;
	role: string;
	email: string;
	time: string;
}

// Metadata admin (status, penulis, jam) untuk tiap berita di NewsList, dikunci per id.
const humas: Pick<Meta, "author" | "role" | "email"> = {
	author: "Humas SMP Nusantara",
	role: "Admin Pengelola",
	email: "admin.humas@smpnusantara.sch.id",
};
const kurikulum = {
	author: "Tim Kurikulum",
	role: "Staf Akademik",
	email: "kurikulum@smpnusantara.sch.id",
};
const kesiswaan = {
	author: "Kesiswaan",
	role: "Pembina Ekskul",
	email: "kesiswaan@smpnusantara.sch.id",
};
const pustaka = {
	author: "Perpustakaan",
	role: "Pustakawan",
	email: "perpustakaan@smpnusantara.sch.id",
};
const tu = {
	author: "Tata Usaha",
	role: "Administrasi",
	email: "tatausaha@smpnusantara.sch.id",
};

export const newsAdminFallback: Meta = {
	status: "draft",
	...humas,
	time: "08:00 WIB",
};

export const newsAdminMeta: Record<string, Meta> = {
	"news-001": { status: "draft", ...kurikulum, time: "16:45 WIB" },
	"news-002": { status: "draft", ...kurikulum, time: "13:10 WIB" },
	"news-003": { status: "published", ...kesiswaan, time: "08:30 WIB" },
	"news-004": { status: "published", ...kesiswaan, time: "09:15 WIB" },
	"news-005": { status: "published", ...humas, time: "11:00 WIB" },
	"news-006": { status: "published", ...kurikulum, time: "14:20 WIB" },
	"news-007": { status: "published", ...pustaka, time: "10:00 WIB" },
	"news-008": { status: "published", ...pustaka, time: "15:30 WIB" },
	"news-009": { status: "published", ...humas, time: "07:45 WIB" },
	"news-010": { status: "published", ...kesiswaan, time: "12:05 WIB" },
	"news-011": { status: "published", ...tu, time: "09:40 WIB" },
	"news-012": { status: "published", ...tu, time: "13:55 WIB" },
};
