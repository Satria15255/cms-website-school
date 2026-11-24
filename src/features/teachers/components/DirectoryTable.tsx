import { useMemo, useState } from "react";
import {
	LuChevronDown,
	LuChevronUp,
	LuPencil,
	LuSearch,
	LuTrash2,
} from "react-icons/lu";
import { CATEGORY_LABEL } from "../directoryUtils";
import type { Category, DirectoryPerson } from "../directory.types";

const PAGE_SIZE = 7;
const field =
	"rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-2 focus:outline-[#021B3E]";

type Sort = "order" | "name" | "status";

interface Props {
	people: DirectoryPerson[]; // terurut berdasarkan order
	waliMap: Map<string, string[]>;
	onEdit: (p: DirectoryPerson) => void;
	onDelete: (p: DirectoryPerson) => void;
	onMove: (id: string, dir: -1 | 1) => void;
	onTogglePublish: (p: DirectoryPerson) => void;
}

const DirectoryTable = ({
	people,
	waliMap,
	onEdit,
	onDelete,
	onMove,
	onTogglePublish,
}: Props) => {
	const [query, setQuery] = useState("");
	const [category, setCategory] = useState<"" | Category>("");
	const [assign, setAssign] = useState<"" | "wali" | "non">("");
	const [sort, setSort] = useState<Sort>("order");
	const [page, setPage] = useState(1);
	const reorderable =
		sort === "order" && !query.trim() && !category && !assign;

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		const list = people
			.filter(
				(p) =>
					!q ||
					p.name.toLowerCase().includes(q) ||
					p.duty.toLowerCase().includes(q) ||
					p.position.toLowerCase().includes(q) ||
					p.nip.includes(q),
			)
			.filter((p) => !category || p.category === category)
			.filter(
				(p) =>
					!assign ||
					(waliMap.get(p.id)?.length ?? 0) > 0 ===
						(assign === "wali"),
			);
		if (sort === "name")
			return [...list].sort((a, b) => a.name.localeCompare(b.name, "id"));
		if (sort === "status")
			return [...list].sort(
				(a, b) =>
					Number(b.published) - Number(a.published) ||
					a.order - b.order,
			);
		return list;
	}, [people, waliMap, query, category, assign, sort]);

	const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
	const current = Math.min(page, pages);
	const start = (current - 1) * PAGE_SIZE;
	const rows = filtered.slice(start, start + PAGE_SIZE);
	const count = (c: Category) =>
		people.filter((p) => p.category === c).length;
	const reset =
		<T,>(set: (v: T) => void) =>
		(v: T) => {
			set(v);
			setPage(1);
		};

	const assignment = (p: DirectoryPerson) => {
		const rombels = waliMap.get(p.id) ?? [];
		if (rombels.length > 0)
			return rombels.map((r) => (
				<span
					key={r}
					className="mr-1 inline-block rounded bg-amber-100 px-2 py-0.5 text-[11px] font-medium whitespace-nowrap text-amber-800"
				>
					{r}
				</span>
			));
		if (p.category === "kependidikan")
			return (
				<span className="text-xs text-gray-400">- (Staf Non-Guru)</span>
			);
		return (
			<span
				className={`text-xs ${p.homeroom ? "text-amber-700" : "text-gray-400"}`}
			>
				{p.homeroom ? "Belum ada rombel" : "-"}
			</span>
		);
	};

	return (
		<section className="rounded-xl border border-gray-200 bg-white shadow-sm">
			<div className="flex flex-wrap gap-3 p-5">
				<label className="relative min-w-48 flex-1">
					<LuSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
					<input
						value={query}
						onChange={(e) => reset(setQuery)(e.target.value)}
						placeholder="Cari nama, NIP, atau mapel..."
						className={`${field} w-full pl-9`}
					/>
				</label>
				<select
					value={category}
					onChange={(e) =>
						reset(setCategory)(e.target.value as "" | Category)
					}
					className={field}
					aria-label="Filter kategori"
				>
					<option value="">Semua Kategori ({people.length})</option>
					<option value="pendidik">
						Tenaga Pendidik ({count("pendidik")})
					</option>
					<option value="kependidikan">
						Tenaga Kependidikan ({count("kependidikan")})
					</option>
				</select>
				<select
					value={assign}
					onChange={(e) =>
						reset(setAssign)(e.target.value as "" | "wali" | "non")
					}
					className={field}
					aria-label="Filter penugasan"
				>
					<option value="">Semua Penugasan</option>
					<option value="wali">Wali Kelas</option>
					<option value="non">Bukan Wali Kelas</option>
				</select>
				<select
					value={sort}
					onChange={(e) => reset(setSort)(e.target.value as Sort)}
					className={field}
					aria-label="Urutkan"
				>
					<option value="order">
						Berdasarkan Urutan Tampil (1-99)
					</option>
					<option value="name">Berdasarkan Nama (A-Z)</option>
					<option value="status">Berdasarkan Status Tayang</option>
				</select>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full min-w-[900px] text-left text-sm">
					<thead className="bg-[#EBF1FF] text-[11px] tracking-wider text-gray-600 uppercase">
						<tr>
							<th className="px-5 py-3 font-semibold">Urutan</th>
							<th className="px-3 py-3 font-semibold">
								Profil guru / staf
							</th>
							<th className="px-3 py-3 font-semibold">
								Kategori lembaga
							</th>
							<th className="px-3 py-3 font-semibold">
								Penugasan wali kelas
							</th>
							<th className="px-3 py-3 font-semibold">
								Status tayang
							</th>
							<th className="px-5 py-3 text-right font-semibold">
								Aksi
							</th>
						</tr>
					</thead>
					<tbody>
						{rows.length === 0 && (
							<tr>
								<td
									colSpan={6}
									className="px-5 py-10 text-center text-gray-500"
								>
									Tidak ada data yang cocok dengan filter ini.
								</td>
							</tr>
						)}
						{rows.map((p) => {
							const idx = people.findIndex((x) => x.id === p.id);
							return (
								<tr
									key={p.id}
									className="border-t border-gray-100"
								>
									<td className="px-5 py-4">
										<span
											className={`grid size-7 place-items-center rounded-full text-xs font-semibold ${p.order === 1 ? "bg-[#F4BF46] text-[#021B3E]" : "bg-[#EBF1FF] text-[#021B3E]"}`}
										>
											{p.order}
										</span>
									</td>
									<td className="px-3 py-4">
										<div className="flex max-w-sm items-center gap-3">
											{p.photo ? (
												<img
													src={p.photo}
													alt=""
													className="size-11 shrink-0 rounded-full object-cover"
												/>
											) : (
												<span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#021B3E] text-xs font-semibold text-white">
													{p.init}
												</span>
											)}
											<div className="min-w-0">
												<p className="font-medium text-[#021B3E]">
													{p.name}
												</p>
												<p className="text-xs text-gray-500">
													{p.duty} • {p.position}
												</p>
												<p className="text-[11px] text-gray-400">
													{p.nip
														? `NIP/NIY: ${p.nip}`
														: "NIP/NIY belum diisi"}
												</p>
											</div>
										</div>
									</td>
									<td className="px-3 py-4">
										<span className="rounded-full bg-[#EBF1FF] px-3 py-1.5 text-xs font-medium whitespace-nowrap text-[#021B3E]">
											{CATEGORY_LABEL[p.category]}
										</span>
									</td>
									<td className="px-3 py-4">
										{assignment(p)}
									</td>
									<td className="px-3 py-4">
										<button
											onClick={() => onTogglePublish(p)}
											aria-pressed={p.published}
											title="Klik untuk mengubah status tayang"
											className={`rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${p.published ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}
										>
											{p.published
												? "Aktif Tayang"
												: "Draf"}
										</button>
									</td>
									<td className="px-5 py-4">
										<div className="flex justify-end gap-2 text-lg">
											<button
												disabled={
													!reorderable || idx === 0
												}
												onClick={() => onMove(p.id, -1)}
												aria-label={`Naikkan ${p.name}`}
												className="text-[#021B3E] disabled:opacity-30"
											>
												<LuChevronUp />
											</button>
											<button
												disabled={
													!reorderable ||
													idx === people.length - 1
												}
												onClick={() => onMove(p.id, 1)}
												aria-label={`Turunkan ${p.name}`}
												className="text-[#021B3E] disabled:opacity-30"
											>
												<LuChevronDown />
											</button>
											<button
												onClick={() => onEdit(p)}
												aria-label={`Edit ${p.name}`}
												className="text-[#021B3E]"
											>
												<LuPencil />
											</button>
											<button
												onClick={() => onDelete(p)}
												aria-label={`Hapus ${p.name}`}
												className="text-red-600"
											>
												<LuTrash2 />
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
					Menampilkan{" "}
					<strong>
						{filtered.length === 0 ? 0 : start + 1}-
						{start + rows.length}
					</strong>{" "}
					dari total <strong>{filtered.length} orang</strong> tenaga
					pendidik & kependidikan
				</span>
				<div className="flex items-center gap-1">
					<button
						disabled={current === 1}
						onClick={() => setPage(current - 1)}
						className="rounded px-3 py-1.5 disabled:opacity-40"
					>
						Sebelumnya
					</button>
					{Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
						<button
							key={n}
							onClick={() => setPage(n)}
							aria-current={n === current}
							className={`size-8 rounded ${n === current ? "bg-[#021B3E] font-semibold text-white" : "hover:bg-gray-100"}`}
						>
							{n}
						</button>
					))}
					<button
						disabled={current === pages}
						onClick={() => setPage(current + 1)}
						className="rounded px-3 py-1.5 disabled:opacity-40"
					>
						Selanjutnya
					</button>
				</div>
			</div>
		</section>
	);
};

export default DirectoryTable;
