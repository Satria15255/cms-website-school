import type {
	AuditAction,
	AuditEntry,
	AuditFilters,
	AuditModule,
	AuditUser,
	PresetKey,
} from "./audit.types";

export const RETENTION_DAYS = 90;
export const PAGE_SIZE = 7;
const DAY = 86_400_000;

export const MODULE_LABEL: Record<AuditModule, string> = {
	berita: "Berita Sekolah",
	kelas: "Kelas & Rombel",
	profil: "Profil Sekolah",
	struktur: "Struktur Org",
	pendidik: "Tenaga Pendidik",
	kontak: "Pengaturan Kontak",
	auth: "Autentikasi",
};
export const MODULE_SHORT: Record<AuditModule, string> = {
	berita: "Berita",
	kelas: "Kelas",
	profil: "Profil",
	struktur: "Struktur",
	pendidik: "Guru",
	kontak: "Kontak",
	auth: "Login",
};
export const MODULE_TONE: Record<AuditModule, string> = {
	berita: "bg-blue-50 text-blue-700",
	kelas: "bg-green-50 text-green-700",
	profil: "bg-purple-50 text-purple-700",
	struktur: "bg-indigo-50 text-indigo-700",
	pendidik: "bg-rose-50 text-rose-700",
	kontak: "bg-teal-50 text-teal-700",
	auth: "bg-gray-100 text-gray-700",
};
export const ACTION_TONE: Record<AuditAction, string> = {
	PUBLISH: "bg-amber-100 text-amber-800",
	UPDATE: "bg-blue-100 text-blue-700",
	CREATE: "bg-green-100 text-green-700",
	LOGIN: "bg-gray-100 text-gray-600",
	ARCHIVE: "bg-rose-100 text-rose-700",
	DELETE: "bg-red-100 text-red-700",
};
export const ACTIONS: AuditAction[] = [
	"CREATE",
	"UPDATE",
	"PUBLISH",
	"ARCHIVE",
	"DELETE",
	"LOGIN",
];

const PRESETS: Record<PresetKey, (e: AuditEntry) => boolean> = {
	all: () => true,
	rombel: (e) => e.module === "kelas",
	news: (e) => e.module === "berita" && e.action === "PUBLISH",
	profile: (e) => e.module === "profil",
	auth: (e) => e.module === "auth",
};

export const PRESET_LABEL: Record<PresetKey, string> = {
	all: "Semua Peristiwa",
	rombel: "Modifikasi Rombel & Wali Kelas",
	news: "Penerbitan Berita",
	profile: "Perubahan Profil Sekolah",
	auth: "Sesi Otentikasi",
};

export const filterEntries = (
	entries: AuditEntry[],
	f: AuditFilters,
	users: Map<string, AuditUser>,
	now = Date.now(),
) => {
	const q = f.query.trim().toLowerCase();
	return entries.filter((e) => {
		if (!PRESETS[f.preset](e)) return false;
		if (f.module && e.module !== f.module) return false;
		if (f.action && e.action !== f.action) return false;
		if (f.user && e.userId !== f.user) return false;
		if (f.rangeDays > 0 && now - e.timestamp > f.rangeDays * DAY)
			return false;
		if (!q) return true;
		const u = users.get(e.userId);
		return [
			e.id,
			e.summary,
			e.entity,
			e.target,
			MODULE_LABEL[e.module],
			e.userId,
			u?.name ?? "",
		].some((v) => v.toLowerCase().includes(q));
	});
};

export const getPresetCounts = (entries: AuditEntry[]) =>
	(Object.keys(PRESETS) as PresetKey[]).reduce(
		(acc, k) => ({ ...acc, [k]: entries.filter(PRESETS[k]).length }),
		{} as Record<PresetKey, number>,
	);

export const getAuditStats = (entries: AuditEntry[], now = Date.now()) => {
	const mutations = entries.filter((e) => e.action !== "LOGIN");
	const logins = entries.filter((e) => e.action === "LOGIN");
	const suspicious = logins.filter((e) => e.suspicious).length;
	const oldest = entries.reduce((min, e) => Math.min(min, e.timestamp), now);
	const shown = [...new Set(mutations.map((e) => MODULE_SHORT[e.module]))];
	return {
		total: entries.length,
		spanDays: Math.max(1, Math.ceil((now - oldest) / DAY)),
		mutations: mutations.length,
		mutationModules:
			shown.slice(0, 4).join(", ") + (shown.length > 4 ? ", dll" : ""),
		validPercent: logins.length
			? Math.round(((logins.length - suspicious) / logins.length) * 100)
			: 100,
		suspicious,
	};
};

const pad = (n: number) => String(n).padStart(2, "0");
export const formatDateTime = (ts: number) => {
	const d = new Date(ts);
	return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const rtf = new Intl.RelativeTimeFormat("id", { numeric: "auto" });
export const formatRelative = (ts: number, now = Date.now()) => {
	const diff = Math.round((ts - now) / 60000); // menit, negatif = lampau
	if (Math.abs(diff) < 60) return rtf.format(diff, "minute");
	if (Math.abs(diff) < 1440) return rtf.format(Math.round(diff / 60), "hour");
	return rtf.format(Math.round(diff / 1440), "day");
};

// Daftar halaman dengan elipsis: 1 2 3 … 179
export const pageList = (current: number, pages: number): (number | "…")[] => {
	if (pages <= 5) return Array.from({ length: pages }, (_, i) => i + 1);
	const set = new Set(
		[1, 2, pages, current - 1, current, current + 1].filter(
			(p) => p >= 1 && p <= pages,
		),
	);
	const sorted = [...set].sort((a, b) => a - b);
	return sorted.flatMap((p, i) =>
		i > 0 && p - sorted[i - 1] > 1 ? (["…", p] as (number | "…")[]) : [p],
	);
};

export interface DiffLine {
	kind: "same" | "remove" | "add";
	text: string;
}

// Membangun tampilan diff bergaya JSON dari snapshot sebelum/sesudah.
export const buildDiff = (
	before: Record<string, unknown> = {},
	after: Record<string, unknown> = {},
	stamp: string,
): DiffLine[] => {
	const b: Record<string, unknown> = { ...before, author_stamp: stamp };
	const a: Record<string, unknown> = { ...after, author_stamp: stamp };
	const body: DiffLine[] = [];
	const keys = [...new Set([...Object.keys(b), ...Object.keys(a)])]
		.filter((k) => k !== "author_stamp")
		.concat("author_stamp");
	for (const k of keys) {
		const line = (v: unknown) => `  "${k}": ${JSON.stringify(v)}`;
		const inB = k in b;
		const inA = k in a;
		if (inB && inA && JSON.stringify(b[k]) === JSON.stringify(a[k]))
			body.push({ kind: "same", text: line(a[k]) });
		else {
			if (inB) body.push({ kind: "remove", text: line(b[k]) });
			if (inA) body.push({ kind: "add", text: line(a[k]) });
		}
	}
	const kinds = body.map((l) => l.kind);
	const last = Math.max(kinds.lastIndexOf("same"), kinds.lastIndexOf("add"));
	return [
		{ kind: "same", text: "{" },
		...body.map((l, i) => (i === last ? l : { ...l, text: `${l.text},` })),
		{ kind: "same", text: "}" },
	];
};
