import { CATEGORY_LABEL } from "./directoryUtils";
import type { DirectoryPerson } from "./directory.types";

const cell = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;

export const exportDirectoryCsv = (
	people: DirectoryPerson[],
	waliMap: Map<string, string[]>,
) => {
	const head = [
		"Urutan",
		"Nama",
		"NIP/NIY",
		"Kategori",
		"Jabatan",
		"Bidang Tugas",
		"Wali Kelas",
		"Status",
	];
	const rows = people.map((p) =>
		[
			p.order,
			p.name,
			p.nip,
			CATEGORY_LABEL[p.category],
			p.position,
			p.duty,
			(waliMap.get(p.id) ?? []).join("; "),
			p.published ? "Aktif Tayang" : "Draf",
		]
			.map(cell)
			.join(","),
	);
	const url = URL.createObjectURL(
		new Blob([[head.map(cell).join(","), ...rows].join("\n")], {
			type: "text/csv;charset=utf-8",
		}),
	);
	const a = document.createElement("a");
	a.href = url;
	a.download = "direktori-pendidik-staf.csv";
	a.click();
	URL.revokeObjectURL(url);
};
