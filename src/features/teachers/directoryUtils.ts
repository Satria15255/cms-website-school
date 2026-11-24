import type {
	Category,
	DirectoryErrors,
	DirectoryInput,
	DirectoryPerson,
} from "./directory.types";

export const CATEGORY_LABEL: Record<Category, string> = {
	pendidik: "Tenaga Pendidik",
	kependidikan: "Tenaga Kependidikan",
};

export const validateInput = (i: DirectoryInput): DirectoryErrors => {
	const e: DirectoryErrors = {};
	if (!i.name.trim()) e.name = "Nama lengkap & gelar wajib diisi.";
	if (!/^[\d\s./-]*$/.test(i.nip))
		e.nip = "NIP/NIY hanya boleh berisi angka dan tanda baca . / -";
	if (!i.position.trim()) e.position = "Jabatan / peran utama wajib diisi.";
	if (!i.duty.trim()) e.duty = "Mata pelajaran / bidang tugas wajib diisi.";
	if (!Number.isInteger(i.order) || i.order < 1 || i.order > 99)
		e.order = "Urutan tampil 1 sampai 99.";
	return e;
};

// waliMap: id orang -> daftar nama rombel yang diwalikan (dari data Kelas & Rombel)
export const getDirectoryStats = (
	people: DirectoryPerson[],
	waliMap: Map<string, string[]>,
	activeRombel: number,
	rombelWithTeacherWali: number,
) => {
	const pendidik = people.filter((p) => p.category === "pendidik");
	const staff = people.filter((p) => p.category === "kependidikan");
	return {
		total: people.length,
		allConsented: people.every((p) => p.consent),
		withoutConsent: people.filter((p) => !p.consent).length,
		pendidik: pendidik.length,
		subjects: new Set(pendidik.map((p) => p.duty)).size,
		staff: staff.length,
		staffUnits: [...new Set(staff.map((p) => p.duty))].join(", "),
		rombelWithWali: rombelWithTeacherWali,
		activeRombel,
		waliTeachers: pendidik.filter(
			(p) => (waliMap.get(p.id)?.length ?? 0) > 0,
		).length,
	};
};
