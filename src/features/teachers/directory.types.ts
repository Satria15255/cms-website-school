export type Category = "pendidik" | "kependidikan";

export interface DirectoryPerson {
	id: string;
	category: Category;
	name: string;
	init: string;
	position: string; // jabatan struktural / peran utama
	duty: string; // mata pelajaran diampu / bidang tugas
	nip: string; // NIP / NIY / nomor registrasi (opsional, kosong bila belum diisi)
	photo?: string;
	order: number; // urutan tampil global, 1 = paling atas
	published: boolean;
	consent: boolean; // persetujuan publikasi (UU PDP)
	homeroom: boolean; // layak ditugaskan sebagai wali kelas
}

export interface DirectoryInput {
	category: Category;
	name: string;
	nip: string;
	position: string;
	duty: string;
	order: number;
	homeroom: boolean;
	consent: boolean;
	photo?: string;
}

export type DirectoryErrors = Partial<Record<keyof DirectoryInput, string>>;
