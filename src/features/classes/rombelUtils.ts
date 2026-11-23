import type { Rombel, Tingkat } from "./rombel.types";

export const MAX_CAPACITY = 32;
export const LEVEL_WORDS: Record<Tingkat, string> = {
	VII: "Tujuh",
	VIII: "Delapan",
	IX: "Sembilan",
};

export const clean = (s: string) => s.replace(/\s+/g, " ").trim();

// "Drs.  Bambang Sudiro, M.Si" -> "bambang sudiro" (untuk mencocokkan wali kelas dengan direktori guru)
export const nameKey = (s: string) =>
	clean(s)
		.split(",")[0]
		.replace(/^drs?\.\s*/i, "")
		.toLowerCase();

export const initials = (name: string) =>
	nameKey(name)
		.split(" ")
		.slice(0, 2)
		.map((w) => w[0]?.toUpperCase() ?? "")
		.join("");

// "A - Lt.2 (R.201)" -> "Gedung A • Lantai 2 (Ruang 201)"
export const formatRoom = (raw: string) => {
	const m = clean(raw).match(
		/^(\w+)\s*-\s*Lt\.?\s*(\d+)\s*\(R\.?\s*(\d+)\)$/i,
	);
	return m ? `Gedung ${m[1]} • Lantai ${m[2]} (Ruang ${m[3]})` : clean(raw);
};

export const getRombelStats = (rombels: Rombel[]) => {
	const active = rombels.filter((r) => r.status === "active");
	const level = (t: Tingkat) => active.filter((r) => r.tingkat === t).length;
	const students = active.reduce((sum, r) => sum + r.enrolled, 0);
	const assigned = active.filter((r) => r.wali).length;
	const withRoom = active.filter((r) => r.room).length;
	return {
		active: active.length,
		byLevel: { VII: level("VII"), VIII: level("VIII"), IX: level("IX") },
		assigned,
		pending: active.length - assigned,
		students,
		average: active.length ? Math.round(students / active.length) : 0,
		roomPercent: active.length
			? Math.round((withRoom / active.length) * 100)
			: 0,
	};
};
