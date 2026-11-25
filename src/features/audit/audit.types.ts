export type AuditModule =
	| "berita"
	| "kelas"
	| "profil"
	| "struktur"
	| "pendidik"
	| "kontak"
	| "auth";
export type AuditAction =
	| "CREATE"
	| "UPDATE"
	| "PUBLISH"
	| "ARCHIVE"
	| "DELETE"
	| "LOGIN";

export interface AuditUser {
	id: string;
	name: string;
	role: string;
	init: string;
}

export interface AuditAttachment {
	name: string;
	src: string;
}

export interface AuditEntry {
	id: string; // "LOG-2026-0041"
	timestamp: number; // epoch ms
	userId: string;
	module: AuditModule;
	action: AuditAction;
	summary: string;
	entity: string; // "ID Entitas: ... • Status: ..."
	target: string; // label ringkas target mutasi
	before?: Record<string, unknown>;
	after?: Record<string, unknown>;
	attachment?: AuditAttachment;
	session?: string;
	suspicious?: boolean;
	prevHash: string;
	hash: string; // SHA-256 berantai (append-only)
}

// Data awal: waktu dinyatakan "menit yang lalu" agar log selalu terlihat segar.
export type AuditSeed = Omit<
	AuditEntry,
	"id" | "timestamp" | "prevHash" | "hash"
> & { minutesAgo: number };

export interface AuditFilters {
	query: string;
	module: "" | AuditModule;
	action: "" | AuditAction;
	user: string;
	rangeDays: number; // 0 = semua waktu
	preset: PresetKey;
}

export type PresetKey = "all" | "rombel" | "news" | "profile" | "auth";
