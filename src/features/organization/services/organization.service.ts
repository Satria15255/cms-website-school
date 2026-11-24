import { OrgPositions } from "@/mocks/Organization";
import { Teacher } from "@/mocks/TenagaPendidik";
import { TenagaKependidikan } from "@/mocks/TenagaKependidikan";
import { cleanName, sortPositions } from "../orgUtils";
import type { Level, Person, Position, PositionInput } from "../org.types";

// Data in-memory selama backend belum ada; ganti isi fungsi dengan Axios nanti.
let db: Position[] = [...OrgPositions];
let seq = 0;
const wait = (ms = 250) => new Promise((r) => setTimeout(r, ms));

const toHolder = (v: string) =>
	v.startsWith("ext:")
		? { holderId: undefined, holderName: v.slice(4) }
		: { holderId: v || undefined, holderName: undefined };

export const organizationService = {
	async getPositions(): Promise<Position[]> {
		await wait();
		return sortPositions(db);
	},
	// Direktori Tenaga Pendidik + Tenaga Kependidikan (sumber pilihan pejabat)
	async getDirectory(): Promise<Person[]> {
		return [
			...Teacher.map((t) => ({
				id: t.id,
				name: cleanName(t.name),
				init: t.init,
				role: t.mapel,
			})),
			...TenagaKependidikan.map((t) => ({
				id: t.id,
				name: cleanName(t.name),
				init: t.init,
				role: t.jobdesk,
			})),
		];
	},
	async save(input: PositionInput, id?: string): Promise<Position> {
		await wait();
		const title = input.title.replace(/\s+/g, " ").trim();
		if (
			db.some(
				(p) =>
					p.id !== id &&
					p.title.toLowerCase() === title.toLowerCase(),
			)
		) {
			throw new Error(`Jabatan "${title}" sudah terdaftar.`);
		}
		if (id && input.parentId === id)
			throw new Error("Jabatan tidak bisa melapor ke dirinya sendiri.");
		const current = db.find((p) => p.id === id);
		const next: Position = {
			id: current?.id ?? `POS-N${++seq}`,
			photo: current?.photo,
			level: input.level as Level,
			order: input.order,
			title,
			...toHolder(input.holder),
			unit: input.unit.trim(),
			parentId: input.parentId || null,
			showOnWeb: input.showOnWeb,
			cmsAccess: input.cmsAccess
				? (current?.cmsAccess ?? "Akses Modul")
				: null,
		};
		db = current ? db.map((p) => (p.id === id ? next : p)) : [...db, next];
		return next;
	},
	// Tukar urutan dengan jabatan di sebelahnya, hanya di dalam level yang sama.
	async move(id: string, dir: -1 | 1): Promise<void> {
		await wait(150);
		const sorted = sortPositions(db);
		const i = sorted.findIndex((p) => p.id === id);
		const a = sorted[i];
		const b = sorted[i + dir];
		if (!a || !b || a.level !== b.level) return;
		db = db.map((p) =>
			p.id === a.id
				? { ...p, order: b.order }
				: p.id === b.id
					? { ...p, order: a.order }
					: p,
		);
	},
	async toggleWeb(id: string): Promise<void> {
		await wait(150);
		db = db.map((p) =>
			p.id === id ? { ...p, showOnWeb: !p.showOnWeb } : p,
		);
	},
};
