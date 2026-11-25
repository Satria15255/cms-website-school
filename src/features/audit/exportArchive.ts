import { MODULE_LABEL, formatDateTime } from "./auditUtils";
import type { AuditEntry, AuditUser } from "./audit.types";

const cell = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;

export const toCsv = (entries: AuditEntry[], users: Map<string, AuditUser>) => {
	const head = [
		"ID Log",
		"Waktu",
		"Pengguna",
		"Peran",
		"Modul",
		"Aksi",
		"Rincian",
		"Entitas",
		"Hash SHA-256",
	];
	const rows = entries.map((e) => {
		const u = users.get(e.userId);
		return [
			e.id,
			formatDateTime(e.timestamp),
			u?.name ?? e.userId,
			u?.role ?? "",
			MODULE_LABEL[e.module],
			e.action,
			e.summary,
			e.entity,
			e.hash,
		]
			.map(cell)
			.join(",");
	});
	return [head.map(cell).join(","), ...rows].join("\n");
};

const download = (blob: Blob, name: string) => {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = name;
	a.click();
	URL.revokeObjectURL(url);
};

export const downloadCsv = (
	entries: AuditEntry[],
	users: Map<string, AuditUser>,
) =>
	download(
		new Blob(["\ufeff" + toCsv(entries, users)], {
			type: "text/csv;charset=utf-8",
		}),
		"audit-log.csv",
	);

// --- ZIP minimal (tanpa kompresi / metode "store"), cukup untuk arsip teks tanpa library tambahan ---
const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
	let c = n;
	for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
	return c >>> 0;
});
const crc32 = (data: Uint8Array) => {
	let c = 0xffffffff;
	for (const b of data) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
	return (c ^ 0xffffffff) >>> 0;
};

export const buildZip = (
	files: { name: string; content: string }[],
	date = new Date(),
): Uint8Array => {
	const enc = new TextEncoder();
	const dosTime =
		(date.getHours() << 11) |
		(date.getMinutes() << 5) |
		(date.getSeconds() >> 1);
	const dosDate =
		((date.getFullYear() - 1980) << 9) |
		((date.getMonth() + 1) << 5) |
		date.getDate();
	const chunks: Uint8Array[] = [];
	const central: Uint8Array[] = [];
	let offset = 0;

	for (const f of files) {
		const name = enc.encode(f.name);
		const data = enc.encode(f.content);
		const crc = crc32(data);

		const local = new DataView(new ArrayBuffer(30));
		local.setUint32(0, 0x04034b50, true);
		local.setUint16(4, 20, true);
		local.setUint16(6, 0x0800, true); // nama file UTF-8
		local.setUint16(10, dosTime, true);
		local.setUint16(12, dosDate, true);
		local.setUint32(14, crc, true);
		local.setUint32(18, data.length, true);
		local.setUint32(22, data.length, true);
		local.setUint16(26, name.length, true);
		chunks.push(new Uint8Array(local.buffer), name, data);

		const cd = new DataView(new ArrayBuffer(46));
		cd.setUint32(0, 0x02014b50, true);
		cd.setUint16(4, 20, true);
		cd.setUint16(6, 20, true);
		cd.setUint16(8, 0x0800, true);
		cd.setUint16(12, dosTime, true);
		cd.setUint16(14, dosDate, true);
		cd.setUint32(16, crc, true);
		cd.setUint32(20, data.length, true);
		cd.setUint32(24, data.length, true);
		cd.setUint16(28, name.length, true);
		cd.setUint32(42, offset, true);
		central.push(new Uint8Array(cd.buffer), name);

		offset += 30 + name.length + data.length;
	}

	const cdSize = central.reduce((s, c) => s + c.length, 0);
	const end = new DataView(new ArrayBuffer(22));
	end.setUint32(0, 0x06054b50, true);
	end.setUint16(8, files.length, true);
	end.setUint16(10, files.length, true);
	end.setUint32(12, cdSize, true);
	end.setUint32(16, offset, true);

	const all = [...chunks, ...central, new Uint8Array(end.buffer)];
	const out = new Uint8Array(all.reduce((s, c) => s + c.length, 0));
	let pos = 0;
	for (const c of all) {
		out.set(c, pos);
		pos += c.length;
	}
	return out;
};

export const downloadArchive = (
	entries: AuditEntry[],
	users: Map<string, AuditUser>,
) => {
	const ascending = [...entries].reverse();
	const manifest = [
		"ARSIP AUDIT LOG SMP NUSANTARA",
		`Dibuat: ${formatDateTime(Date.now())}`,
		`Jumlah entri: ${entries.length}`,
		`Hash entri terakhir (SHA-256): ${ascending[ascending.length - 1]?.hash ?? "-"}`,
		"Setiap entri memuat hash entri sebelumnya (prevHash), sehingga rantai dapat diverifikasi ulang.",
	].join("\n");
	const zip = buildZip([
		{ name: "audit-log.csv", content: "\ufeff" + toCsv(entries, users) },
		{ name: "audit-log.json", content: JSON.stringify(ascending, null, 2) },
		{ name: "MANIFEST.txt", content: manifest },
	]);
	download(
		new Blob([zip as BlobPart], { type: "application/zip" }),
		"arsip-audit-log.zip",
	);
};
