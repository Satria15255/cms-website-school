export type Tingkat = "VII" | "VIII" | "IX";
export type RombelStatus = "active" | "archived";

export interface Rombel {
	id: string;
	tingkat: Tingkat;
	name: string; // "Kelas VII-A"
	room: string; // "A - Lt.2 (R.201)"
	enrolled: number;
	capacity: number;
	wali: string;
	status: RombelStatus;
	type: string;
}

export interface RombelInput {
	tingkat: Tingkat | "";
	name: string;
	room: string;
	wali: string;
	capacity: number;
	status: RombelStatus;
}

export interface TeacherOption {
	name: string;
	subject: string;
}

export interface LevelMeta {
	symbol: Tingkat;
	tingkat: string; // PERTAMA | MENENGAH | AKHIR
	phase: string;
	description: string;
}
