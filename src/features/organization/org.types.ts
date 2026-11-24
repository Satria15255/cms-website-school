export type Level = 1 | 2 | 3 | 4;

export interface Position {
	id: string;
	level: Level;
	order: number; // urutan tampil di dalam levelnya
	title: string;
	holderId?: string; // id di direktori (TP-xx / TK-xx)
	holderName?: string; // pejabat di luar direktori guru & staf
	photo?: string;
	unit: string;
	parentId: string | null;
	showOnWeb: boolean;
	cmsAccess: string | null; // label hak akses CMS, null = tidak ada
}

export interface Person {
	id: string;
	name: string;
	init: string;
	role: string;
}

export interface ResolvedHolder {
	name: string;
	init: string;
	role: string;
	linked: boolean; // true bila pejabat berasal dari direktori guru & staf
}

export interface PositionInput {
	level: Level | "";
	title: string;
	order: number;
	holder: string; // "" | id direktori | "ext:Nama"
	unit: string;
	parentId: string;
	showOnWeb: boolean;
	cmsAccess: boolean;
}
