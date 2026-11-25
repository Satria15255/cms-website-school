import { useState } from "react";
import { LuFileDiff, LuImage } from "react-icons/lu";
import { FaFileSignature } from "react-icons/fa";
import JsonDiffView from "./JsonDiffView";
import { formatDateTime } from "../auditUtils";
import type { AuditEntry, AuditUser } from "../audit.types";

const ACTION_NOUN: Record<AuditEntry["action"], string> = {
	PUBLISH: "publikasi",
	UPDATE: "pembaruan",
	CREATE: "penambahan",
	ARCHIVE: "pengarsipan",
	DELETE: "penghapusan",
	LOGIN: "login",
};

// Dipasang dengan `key` = id entri, sehingga rasio gambar dihitung ulang tiap entri berganti.
const Attachment = ({ entry }: { entry: AuditEntry }) => {
	const [ratio, setRatio] = useState<string | null>(null);
	const file = entry.attachment;
	return (
		<div>
			<div className="mb-2 flex items-center justify-between gap-2 text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
				<span>Berkas terlampir baru</span>
				{ratio && (
					<span className="rounded bg-green-100 px-2 py-0.5 text-green-700 normal-case">
						Valid Media {ratio} Ratio
					</span>
				)}
			</div>
			{file ? (
				<div className="relative overflow-hidden rounded-lg">
					<img
						src={file.src}
						alt=""
						onLoad={(e) =>
							setRatio(
								(
									e.currentTarget.naturalWidth /
									e.currentTarget.naturalHeight
								).toFixed(2),
							)
						}
						className="h-36 w-full object-cover"
					/>
					<p className="absolute inset-x-0 bottom-0 bg-black/60 px-3 py-1.5 font-mono text-[10px] break-all text-white">
						{file.name}
					</p>
				</div>
			) : (
				<div className="grid h-36 place-items-center rounded-lg border border-dashed border-gray-300 text-xs text-gray-400">
					<LuImage className="text-2xl" /> Tidak ada berkas terlampir
				</div>
			)}
		</div>
	);
};

interface Props {
	entry: AuditEntry | null;
	user?: AuditUser;
}

const DiffInspector = ({ entry, user }: Props) => (
	<section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
		<div className="mb-4 flex flex-wrap items-start justify-between gap-3">
			<div className="flex items-start gap-3">
				<span className="grid size-9 shrink-0 place-items-center rounded-lg bg-amber-100 text-lg text-amber-800">
					<LuFileDiff />
				</span>
				<div>
					<h2 className="flex flex-wrap items-center gap-2 font-moda text-xl text-[#021B3E]">
						Inspeksi Diff Mutasi Terpilih
						<span className="rounded bg-[#EBF1FF] px-1.5 py-0.5 font-sans text-[9px] font-semibold tracking-wider uppercase">
							Live review
						</span>
					</h2>
					<p className="text-xs text-gray-500">
						{entry
							? `Snapshot perbandingan payload data sebelum vs sesudah aksi ${ACTION_NOUN[entry.action]} (#${entry.id}).`
							: "Pilih salah satu baris log untuk melihat perbandingan datanya."}
					</p>
				</div>
			</div>
			{entry && (
				<span className="rounded bg-[#EBF1FF] px-3 py-1.5 font-mono text-[11px] text-[#021B3E]">
					Target: {entry.target}
				</span>
			)}
		</div>

		{entry ? (
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-[300px_1fr]">
				<div className="flex flex-col gap-3">
					<Attachment key={entry.id} entry={entry} />
					<dl className="flex flex-col gap-1.5 text-xs">
						<div className="flex justify-between gap-2">
							<dt className="text-gray-500">Diperbarui Oleh:</dt>
							<dd className="font-semibold text-[#021B3E]">
								{user?.name ?? entry.userId}
							</dd>
						</div>
						<div className="flex justify-between gap-2">
							<dt className="text-gray-500">Waktu Mutasi:</dt>
							<dd className="font-semibold text-[#021B3E]">
								{formatDateTime(entry.timestamp)}
							</dd>
						</div>
						<div className="flex justify-between gap-2">
							<dt className="text-gray-500">Integritas Blok:</dt>
							<dd className="font-mono text-[11px] text-green-700">
								SHA-256 {entry.hash.slice(0, 4)}…
								{entry.hash.slice(-4)} (Signed)
							</dd>
						</div>
					</dl>
					<p className="flex items-start gap-2 rounded-lg bg-gray-50 p-3 text-[11px] text-gray-500">
						<FaFileSignature className="mt-0.5 shrink-0" />{" "}
						Ditandatangani secara digital oleh sertifikat kunci sesi
						TLS pengelola.
					</p>
				</div>
				<JsonDiffView entry={entry} />
			</div>
		) : (
			<p className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
				Belum ada log yang dipilih.
			</p>
		)}
	</section>
);

export default DiffInspector;
