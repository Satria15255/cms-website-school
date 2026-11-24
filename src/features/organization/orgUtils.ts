import type { Level, Person, Position, ResolvedHolder } from "./org.types";

export const LEVELS: Record<Level, { short: string; full: string }> = {
	1: {
		short: "Pimpinan",
		full: "Level 1: Pimpinan Tertinggi (Kepala Sekolah)",
	},
	2: { short: "Komite", full: "Level 2: Komite & Pengawas Sekolah" },
	3: {
		short: "Wakasek",
		full: "Level 3: Wakil Kepala Sekolah / Kepala Bidang",
	},
	4: { short: "Unit Kerja", full: "Level 4: Koordinator & Unit Kerja" },
};

// "TRI WAHYUNI, A.Md" -> "Tri Wahyuni, A.Md"; "Maya Indah , S. Sos" -> "Maya Indah, S. Sos"
export const cleanName = (raw: string) => {
	const [first, ...rest] = raw
		.replace(/\s+/g, " ")
		.trim()
		.split(/\s*,\s*/);
	const name =
		first === first.toUpperCase()
			? first.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase())
			: first;
	return [name, ...rest].join(", ");
};

export const initialsOf = (name: string) =>
	name
		.replace(/^(dr|drs|dra)\.?\s*/i, "")
		.split(/[\s,]+/)
		.slice(0, 2)
		.map((w) => w[0]?.toUpperCase() ?? "")
		.join("");

export const sortPositions = (list: Position[]) =>
	[...list].sort((a, b) => a.level - b.level || a.order - b.order);

export const resolveHolder = (
	p: Position,
	people: Map<string, Person>,
): ResolvedHolder | null => {
	const person = p.holderId ? people.get(p.holderId) : undefined;
	if (person)
		return {
			name: person.name,
			init: person.init,
			role: person.role,
			linked: true,
		};
	if (p.holderName)
		return {
			name: p.holderName,
			init: initialsOf(p.holderName),
			role: "Di luar direktori guru & staf",
			linked: false,
		};
	return null;
};

export const levelTag = (p: Position) =>
	p.level === 1
		? "Level 1 • Pimpinan Tertinggi"
		: p.level === 2
			? "Level 2 • Mitra & Pengawas"
			: p.level === 3
				? `Level 3 • Bidang ${p.order}`
				: "Level 4 • Unit Kerja";

export const getOrgStats = (
	positions: Position[],
	people: Map<string, Person>,
) => {
	const levels = [...new Set(positions.map((p) => p.level))].sort();
	const holders = positions.map((p) => resolveHolder(p, people));
	const linked = holders.filter((h) => h?.linked).length;
	return {
		total: positions.length,
		levelCount: levels.length,
		levelNames: levels.map((l) => LEVELS[l].short).join(", "),
		filled: holders.filter(Boolean).length,
		linked,
		linkedPercent: positions.length
			? Math.round((linked / positions.length) * 100)
			: 0,
		shown: positions.filter((p) => p.showOnWeb).length,
	};
};
