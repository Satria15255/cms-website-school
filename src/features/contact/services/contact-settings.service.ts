import { contactSettings } from "@/mocks/ContactSettings";
import type { ContactSettings } from "../settings.types";

// Data in-memory selama backend belum ada; ganti isi fungsi dengan Axios nanti.
let db: ContactSettings = structuredClone(contactSettings);
const wait = (ms = 250) => new Promise((r) => setTimeout(r, ms));

export const contactSettingsService = {
	async get(): Promise<ContactSettings> {
		await wait();
		return structuredClone(db);
	},
	async save(next: ContactSettings): Promise<ContactSettings> {
		await wait();
		db = structuredClone(next);
		return structuredClone(db);
	},
};
