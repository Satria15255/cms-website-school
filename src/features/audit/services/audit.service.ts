import { AuditSeeds, AuditUsers } from "@/mocks/AuditLog";
import { GENESIS, entryHash, verifyChain } from "../hash";
import type { AuditEntry, AuditUser } from "../audit.types";

// Log bersifat append-only: entri hanya ditambah, tidak diubah atau dihapus.
// Ganti isi fungsi dengan Axios saat backend siap.
const build = async (): Promise<AuditEntry[]> => {
	const now = Date.now();
	const ascending = [...AuditSeeds].sort(
		(a, b) => b.minutesAgo - a.minutesAgo,
	);
	const chain: AuditEntry[] = [];
	let prev = GENESIS;
	for (const [i, s] of ascending.entries()) {
		const { minutesAgo, ...rest } = s;
		const base = {
			...rest,
			id: `LOG-${new Date(now).getFullYear()}-${String(i + 1).padStart(4, "0")}`,
			timestamp: now - minutesAgo * 60000,
			prevHash: prev,
		};
		const hash = await entryHash(base);
		chain.push({ ...base, hash });
		prev = hash;
	}
	return chain;
};

let store: Promise<AuditEntry[]> | null = null;
const entries = () => (store ??= build());
const wait = (ms = 250) => new Promise((r) => setTimeout(r, ms));

export const auditService = {
	async getAll(): Promise<AuditEntry[]> {
		await wait();
		return [...(await entries())].reverse(); // terbaru di atas
	},
	getUsers: (): AuditUser[] => AuditUsers,
	// Menambah entri baru ke ujung rantai (untuk dipakai modul lain saat backend/logging terhubung).
	async record(
		input: Omit<AuditEntry, "id" | "timestamp" | "prevHash" | "hash">,
	): Promise<AuditEntry> {
		const list = await entries();
		const last = list[list.length - 1];
		const base = {
			...input,
			id: `LOG-${new Date().getFullYear()}-${String(list.length + 1).padStart(4, "0")}`,
			timestamp: Date.now(),
			prevHash: last?.hash ?? GENESIS,
		};
		const entry = { ...base, hash: await entryHash(base) };
		list.push(entry);
		return entry;
	},
	async verify() {
		await wait(400);
		return verifyChain(await entries());
	},
};
