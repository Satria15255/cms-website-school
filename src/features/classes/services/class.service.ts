import { ClassDetails } from "@/mocks/ClassList";
import { Teacher } from "@/mocks/TenagaPendidik";
import { MAX_CAPACITY, clean } from "../rombelUtils";
import type {
	LevelMeta,
	Rombel,
	RombelInput,
	Tingkat,
	TeacherOption,
} from "../rombel.types";

// Rombel diturunkan dari ClassDetails (data yang sama dengan halaman publik).
// Data in-memory selama backend belum ada; ganti isi fungsi dengan Axios nanti.
let db: Rombel[] = ClassDetails.flatMap((c) =>
	c.subClass.map((s, i) => ({
		id: `${c.symbol}-${i + 1}`,
		tingkat: c.symbol as Tingkat,
		name: `Kelas ${c.symbol}-${clean(s.kelas).split(" ").pop()}`,
		room: clean(s.classRoom),
		enrolled: Number(s.member) || 0,
		capacity: MAX_CAPACITY,
		wali: clean(s.walikel),
		status:
			s.classStatus === "Active"
				? ("active" as const)
				: ("archived" as const),
		type: s.classType,
	})),
);
let seq = 0;
const wait = (ms = 250) => new Promise((r) => setTimeout(r, ms));

export const classService = {
	async getAll(): Promise<Rombel[]> {
		await wait();
		return [...db];
	},
	async getLevels(): Promise<LevelMeta[]> {
		return ClassDetails.map((c) => ({
			symbol: c.symbol as Tingkat,
			tingkat: c.tingkat,
			phase: c.phase,
			description: c.description,
		}));
	},
	async getTeachers(): Promise<TeacherOption[]> {
		return Teacher.map((t) => ({ name: clean(t.name), subject: t.mapel }));
	},
	async save(input: RombelInput, id?: string): Promise<Rombel> {
		await wait();
		const name = clean(input.name);
		const tingkat = input.tingkat as Tingkat;
		if (
			db.some(
				(r) =>
					r.id !== id &&
					r.tingkat === tingkat &&
					r.name.toLowerCase() === name.toLowerCase(),
			)
		) {
			throw new Error(
				`Rombel "${name}" sudah ada di jenjang ${tingkat}.`,
			);
		}
		const base = {
			tingkat,
			name,
			room: clean(input.room),
			wali: input.wali,
			capacity: input.capacity,
			status: input.status,
		};
		if (id) {
			const current = db.find((r) => r.id === id);
			if (!current) throw new Error("Rombel tidak ditemukan.");
			const updated = { ...current, ...base };
			db = db.map((r) => (r.id === id ? updated : r));
			return updated;
		}
		const created: Rombel = {
			...base,
			id: `NEW-${++seq}`,
			enrolled: 0,
			type: "Reguler",
		};
		db = [...db, created];
		return created;
	},
	async toggleArchive(id: string): Promise<void> {
		await wait();
		db = db.map((r) =>
			r.id === id
				? {
						...r,
						status: r.status === "active" ? "archived" : "active",
					}
				: r,
		);
	},
};
