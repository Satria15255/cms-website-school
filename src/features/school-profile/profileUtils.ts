import type { ProfileErrors, SchoolProfile } from "./profile.types";

export const MAX_WORDS = 600;

export const countWords = (text: string) =>
	text.trim() ? text.trim().split(/\s+/).length : 0;

export const validateProfile = (p: SchoolProfile): ProfileErrors => {
	const e: ProfileErrors = {};
	if (!/^\d+(\s*\/\s*\d+)?$/.test(p.npsn.trim()))
		e.npsn = "Isi NPSN dengan angka, boleh diikuti / NSS.";
	if (!p.level.trim()) e.level = "Jenjang & status akreditasi wajib diisi.";
	if (
		!/^\d{4}$/.test(p.founded.trim()) ||
		Number(p.founded) < 1900 ||
		Number(p.founded) > new Date().getFullYear()
	)
		e.founded = "Isi tahun 4 digit yang valid.";
	if (!p.curriculum.trim())
		e.curriculum = "Implementasi kurikulum wajib diisi.";
	if (!p.tagline.trim()) e.tagline = "Slogan wajib diisi.";
	else if (p.tagline.length > 120)
		e.tagline = "Slogan maksimal 120 karakter.";
	if (!p.history.trim()) e.history = "Ringkasan sejarah wajib diisi.";
	return e;
};

// Kelengkapan = kolom identitas yang terisi / total kolom identitas
export const getProfileStats = (p: SchoolProfile, nilaiCount: number) => {
	const fields = [
		p.name,
		p.npsn,
		p.level,
		p.founded,
		p.curriculum,
		p.tagline,
		p.history,
	];
	const filled = fields.filter((f) => f.trim()).length;
	return {
		percent: Math.round((filled / fields.length) * 100),
		misiCount: p.misi.length,
		nilaiCount,
	};
};
