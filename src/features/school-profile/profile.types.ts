export interface SchoolProfile {
	name: string; // terkunci (akreditasi)
	npsn: string; // "NPSN / NSS"
	level: string; // jenjang & status akreditasi
	founded: string;
	curriculum: string;
	tagline: string;
	history: string;
	visi: string;
	misi: string[];
	welcome: { name: string; title: string; published: boolean };
}

export type ProfileErrors = Partial<Record<keyof SchoolProfile, string>>;
export type ProfileTab = "identity" | "visi" | "welcome" | "media";
