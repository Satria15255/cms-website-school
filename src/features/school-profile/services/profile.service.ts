import { schoolProfile } from "@/mocks/SchoolProfile";
import { schoolValue } from "@/mocks/SchoolValue";
import type { SchoolProfile } from "../profile.types";

// Data in-memory selama backend belum ada; ganti isi fungsi dengan Axios nanti.
let db: SchoolProfile = { ...schoolProfile };
const wait = (ms = 250) => new Promise((r) => setTimeout(r, ms));

export const profileService = {
	async get(): Promise<SchoolProfile> {
		await wait();
		return { ...db };
	},
	async save(next: SchoolProfile): Promise<SchoolProfile> {
		await wait();
		db = { ...next, name: db.name }; // nama resmi terkunci
		return { ...db };
	},
	// Jumlah nilai inti diambil dari data yang dipakai halaman publik.
	nilaiCount: () => schoolValue.length,
};
