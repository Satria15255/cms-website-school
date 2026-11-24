import { ClassDetails } from "@/mocks/ClassList";
import { Teacher } from "@/mocks/TenagaPendidik";
import { TenagaKependidikan } from "@/mocks/TenagaKependidikan";
import { cleanName, initialsOf } from "@/features/organization/orgUtils";
import { nameKey } from "@/features/classes/rombelUtils";
import type { DirectoryInput, DirectoryPerson } from "../directory.types";

// Data in-memory dari mock Tenaga Pendidik + Tenaga Kependidikan.
// Ganti isi fungsi dengan Axios saat backend siap.
const title = (s: string) =>
	s.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());
const waliKeys = new Set(
	ClassDetails.flatMap((c) => c.subClass.map((s) => nameKey(s.walikel))),
);

let db: DirectoryPerson[] = [
	...Teacher.map((t, i) => ({
		id: t.id,
		category: "pendidik" as const,
		name: cleanName(t.name),
		init: t.init,
		position: t.jabatan,
		duty: t.mapel,
		nip: "",
		order: i + 1,
		published: true,
		consent: true,
		homeroom: waliKeys.has(nameKey(t.name)),
	})),
	...TenagaKependidikan.map((t, i) => ({
		id: t.id,
		category: "kependidikan" as const,
		name: cleanName(t.name),
		init: t.init,
		position: t.jobdesk.trim(),
		duty: title(t.jabatan.trim()),
		nip: "",
		order: Teacher.length + i + 1,
		published: true,
		consent: true,
		homeroom: false,
	})),
];
let seq = 0;
const wait = (ms = 250) => new Promise((r) => setTimeout(r, ms));
const sorted = (list: DirectoryPerson[]) =>
	[...list].sort((a, b) => a.order - b.order);
const renumber = (list: DirectoryPerson[]) =>
	list.map((p, i) => ({ ...p, order: i + 1 }));

export const directoryService = {
	async getAll(): Promise<DirectoryPerson[]> {
		await wait();
		return sorted(db);
	},
	async save(
		input: DirectoryInput,
		publish: boolean,
		id?: string,
	): Promise<DirectoryPerson> {
		await wait();
		const name = input.name.replace(/\s+/g, " ").trim();
		if (
			db.some(
				(p) =>
					p.id !== id && p.name.toLowerCase() === name.toLowerCase(),
			)
		)
			throw new Error(`"${name}" sudah ada di direktori.`);
		if (publish && !input.consent)
			throw new Error(
				"Centang persetujuan publikasi (UU PDP) sebelum menayangkan ke direktori publik.",
			);
		const current = db.find((p) => p.id === id);
		const person: DirectoryPerson = {
			id:
				current?.id ??
				`${input.category === "pendidik" ? "TP" : "TK"}-N${++seq}`,
			category: input.category,
			name,
			init: initialsOf(name),
			position: input.position.trim(),
			duty: input.duty.trim(),
			nip: input.nip.trim(),
			photo: input.photo,
			order: input.order,
			published: publish,
			consent: input.consent,
			homeroom: input.category === "pendidik" && input.homeroom,
		};
		// sisipkan di posisi `order`, lalu nomori ulang agar urutan selalu unik
		const rest = sorted(db.filter((p) => p.id !== id));
		rest.splice(
			Math.min(Math.max(input.order - 1, 0), rest.length),
			0,
			person,
		);
		db = renumber(rest);
		return db.find((p) => p.id === person.id)!;
	},
	async move(id: string, dir: -1 | 1): Promise<void> {
		await wait(150);
		const list = sorted(db);
		const i = list.findIndex((p) => p.id === id);
		const j = i + dir;
		if (i < 0 || j < 0 || j >= list.length) return;
		[list[i], list[j]] = [list[j], list[i]];
		db = renumber(list);
	},
	async setPublished(id: string, published: boolean): Promise<void> {
		await wait(150);
		const p = db.find((x) => x.id === id);
		if (published && p && !p.consent)
			throw new Error(
				`${p.name} belum menyetujui publikasi (UU PDP). Edit data dan centang persetujuan dulu.`,
			);
		db = db.map((x) => (x.id === id ? { ...x, published } : x));
	},
	async remove(id: string): Promise<void> {
		await wait();
		db = renumber(sorted(db.filter((p) => p.id !== id)));
	},
};
