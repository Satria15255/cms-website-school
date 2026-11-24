import { useMemo, useState } from "react";
import { LuChevronDown, LuChevronUp, LuPencil, LuSearch } from "react-icons/lu";
import { LEVELS, resolveHolder } from "../orgUtils";
import type { Level, Person, Position } from "../org.types";

const PAGE_SIZE = 8;
const field =
	"rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-2 focus:outline-[#021B3E]";

interface Props {
	positions: Position[]; // sudah terurut (level, order)
	people: Map<string, Person>;
	onEdit: (p: Position) => void;
	onMove: (id: string, dir: -1 | 1) => void;
	onToggleWeb: (id: string) => void;
}

const OrgTable = ({
	positions,
	people,
	onEdit,
	onMove,
	onToggleWeb,
}: Props) => {
	const [query, setQuery] = useState("");
	const [level, setLevel] = useState("");
	const [page, setPage] = useState(1);
	const filtering = query.trim() !== "" || level !== "";

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		return positions
			.filter((p) => !level || p.level === Number(level))
			.filter(
				(p) =>
					!q ||
					p.title.toLowerCase().includes(q) ||
					(resolveHolder(p, people)?.name ?? "")
						.toLowerCase()
						.includes(q),
			);
	}, [positions, people, query, level]);

	const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
	const current = Math.min(page, pages);
	const start = (current - 1) * PAGE_SIZE;
	const rows = filtered.slice(start, start + PAGE_SIZE);

	const canMove = (p: Position, dir: -1 | 1) => {
		if (filtering) return false; // urutan hanya bisa diubah saat tidak ada filter
		const i = positions.findIndex((x) => x.id === p.id);
		return positions[i + dir]?.level === p.level;
	};

	return (
		<section className="rounded-xl border border-gray-200 bg-white shadow-sm">
			<div className="flex flex-wrap items-start justify-between gap-3 p-5">
				<div>
					<h2 className="font-moda text-2xl text-[#021B3E]">
						Daftar Lengkap Posisi Struktural ({positions.length}{" "}
						Posisi)
					</h2>
					<p className="text-sm text-gray-500">
						Kelola tampilan publik, tautan profil pejabat, dan
						status hak akses sistem.
					</p>
				</div>
				<div className="flex flex-wrap gap-2">
					<label className="relative">
						<LuSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
						<input
							value={query}
							onChange={(e) => {
								setQuery(e.target.value);
								setPage(1);
							}}
							placeholder="Filter nama atau jabatan..."
							className={`${field} w-56 pl-9`}
						/>
					</label>
					<select
						value={level}
						onChange={(e) => {
							setLevel(e.target.value);
							setPage(1);
						}}
						className={field}
						aria-label="Filter tingkat"
					>
						<option value="">
							Semua Tingkat (
							{new Set(positions.map((p) => p.level)).size} Level)
						</option>
						{([1, 2, 3, 4] as Level[]).map((l) => (
							<option key={l} value={l}>
								Level {l} — {LEVELS[l].short}
							</option>
						))}
					</select>
				</div>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full min-w-[900px] text-left text-sm">
					<thead className="bg-[#EBF1FF] text-[11px] tracking-wider text-gray-600 uppercase">
						<tr>
							<th className="px-5 py-3 font-semibold">No</th>
							<th className="px-3 py-3 font-semibold">
								Hierarki level
							</th>
							<th className="px-3 py-3 font-semibold">
								Nama jabatan resmi
							</th>
							<th className="px-3 py-3 font-semibold">
								Pejabat terpilih (SDM terhubung)
							</th>
							<th className="px-3 py-3 font-semibold">
								Unit / bidang kerja
							</th>
							<th className="px-3 py-3 font-semibold">
								Status web
							</th>
							<th className="px-3 py-3 font-semibold">
								Akses CMS
							</th>
							<th className="px-5 py-3 text-right font-semibold">
								Aksi kelola
							</th>
						</tr>
					</thead>
					<tbody>
						{rows.length === 0 && (
							<tr>
								<td
									colSpan={8}
									className="px-5 py-10 text-center text-gray-500"
								>
									Tidak ada posisi yang cocok dengan filter
									ini.
								</td>
							</tr>
						)}
						{rows.map((p, i) => {
							const h = resolveHolder(p, people);
							return (
								<tr
									key={p.id}
									className="border-t border-gray-100"
								>
									<td className="px-5 py-4 text-gray-500">
										{start + i + 1}
									</td>
									<td className="px-3 py-4">
										<span className="rounded bg-[#021B3E] px-2 py-1 text-[10px] font-semibold whitespace-nowrap text-white">
											Level {p.level}
										</span>
									</td>
									<td className="max-w-[220px] px-3 py-4 font-medium text-[#021B3E]">
										{p.title}
									</td>
									<td className="px-3 py-4">
										{h ? (
											<div className="flex items-center gap-2">
												<span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#021B3E] text-[10px] font-semibold text-white">
													{h.init}
												</span>
												<div className="min-w-0">
													<p className="text-xs font-medium text-[#021B3E]">
														{h.name}
													</p>
													<p
														className={`text-[11px] ${h.linked ? "text-gray-500" : "text-amber-700"}`}
													>
														{h.role}
													</p>
												</div>
											</div>
										) : (
											<span className="text-xs text-amber-700">
												Belum ditetapkan
											</span>
										)}
									</td>
									<td className="max-w-[200px] px-3 py-4 text-xs text-gray-600">
										{p.unit}
									</td>
									<td className="px-3 py-4">
										<button
											onClick={() => onToggleWeb(p.id)}
											aria-pressed={p.showOnWeb}
											title="Klik untuk mengubah status tayang"
											className={`rounded-full px-2.5 py-1 text-xs font-medium ${p.showOnWeb ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}
										>
											{p.showOnWeb ? "Tayang" : "Draft"}
										</button>
									</td>
									<td className="px-3 py-4 text-xs">
										{p.cmsAccess ? (
											<span className="rounded bg-amber-100 px-2 py-1 font-medium whitespace-nowrap text-amber-800">
												{p.cmsAccess}
											</span>
										) : (
											<span className="text-gray-400">
												Tidak Ada
											</span>
										)}
									</td>
									<td className="px-5 py-4">
										<div className="flex justify-end gap-2 text-lg text-[#021B3E]">
											<button
												onClick={() => onEdit(p)}
												aria-label={`Edit ${p.title}`}
											>
												<LuPencil />
											</button>
											<button
												disabled={!canMove(p, -1)}
												onClick={() => onMove(p.id, -1)}
												aria-label={`Naikkan ${p.title}`}
												className="disabled:opacity-30"
											>
												<LuChevronUp />
											</button>
											<button
												disabled={!canMove(p, 1)}
												onClick={() => onMove(p.id, 1)}
												aria-label={`Turunkan ${p.title}`}
												className="disabled:opacity-30"
											>
												<LuChevronDown />
											</button>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			<div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-5 py-4 text-xs text-gray-500">
				<span>
					Menampilkan {rows.length} dari {filtered.length} posisi
					struktural terdaftar
				</span>
				<div className="flex items-center gap-2">
					<button
						disabled={current === 1}
						onClick={() => setPage(current - 1)}
						className="rounded px-3 py-1.5 disabled:opacity-40"
					>
						Sebelumnya
					</button>
					<span className="rounded bg-[#021B3E] px-3 py-1.5 font-semibold text-white">
						Halaman {current}
					</span>
					<button
						disabled={current === pages}
						onClick={() => setPage(current + 1)}
						className="rounded px-3 py-1.5 disabled:opacity-40"
					>
						Berikutnya
					</button>
				</div>
			</div>
		</section>
	);
};

export default OrgTable;
