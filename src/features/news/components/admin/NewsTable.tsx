import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
	LuChevronLeft,
	LuChevronRight,
	LuDownload,
	LuEye,
	LuPencil,
	LuPlus,
	LuSearch,
	LuUpload,
} from "react-icons/lu";
import { createSlug } from "@/utils/createSlug";
import { formatDate } from "@/utils/formatDate";
import { PATHS } from "@/app/router/paths";
import type { AdminNewsItem } from "../../admin.types";

const PAGE_SIZE = 7;

const BADGE: Record<string, string> = {
	"Riset-Inovasi": "bg-blue-100 text-blue-700",
	"Lomba-Prestasi": "bg-amber-100 text-amber-800",
	"Aktivitas-Siswa": "bg-green-100 text-green-700",
	"Akademik-Literasi": "bg-purple-100 text-purple-700",
	"Karakter-Lingkungan": "bg-teal-100 text-teal-700",
	"Agenda-Kegiatan": "bg-slate-100 text-slate-700",
};

const csvCell = (v: string) => `"${v.replace(/"/g, '""')}"`;

const exportCsv = (rows: AdminNewsItem[]) => {
	const head = ["ID", "Judul", "Kategori", "Penulis", "Tanggal", "Status"];
	const body = rows.map((r) =>
		[r.id, r.title, r.category, r.author, r.date, r.status]
			.map(csvCell)
			.join(","),
	);
	const url = URL.createObjectURL(
		new Blob([[head.join(","), ...body].join("\n")], {
			type: "text/csv;charset=utf-8",
		}),
	);
	const a = document.createElement("a");
	a.href = url;
	a.download = "berita-sekolah.csv";
	a.click();
	URL.revokeObjectURL(url);
};

const field =
	"rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-2 focus:outline-[#021B3E]";

const NewsTable = ({
	items,
	onPublish,
}: {
	items: AdminNewsItem[];
	onPublish: (id: string) => void;
}) => {
	const [query, setQuery] = useState("");
	const [category, setCategory] = useState("");
	const [status, setStatus] = useState("");
	const [page, setPage] = useState(1);

	const categories = useMemo(
		() => [...new Set(items.map((i) => i.category))],
		[items],
	);

	const filtered = useMemo(() => {
		const q = query.toLowerCase();
		return items
			.filter(
				(i) =>
					!q ||
					i.title.toLowerCase().includes(q) ||
					i.description.toLowerCase().includes(q) ||
					i.author.toLowerCase().includes(q),
			)
			.filter((i) => !category || i.category === category)
			.filter((i) => !status || i.status === status)
			.sort((a, b) => b.date.localeCompare(a.date));
	}, [items, query, category, status]);

	const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
	const current = Math.min(page, pages);
	const start = (current - 1) * PAGE_SIZE;
	const rows = filtered.slice(start, start + PAGE_SIZE);

	const onFilter =
		<T,>(set: (v: T) => void) =>
		(v: T) => {
			set(v);
			setPage(1);
		};

	return (
		<section className="rounded-xl border border-gray-200 bg-white shadow-sm">
			<div className="flex flex-wrap items-start justify-between gap-3 p-5">
				<div>
					<h2 className="font-moda text-2xl text-[#021B3E]">
						Daftar Artikel & Status Publikasi Terkini
					</h2>
					<p className="text-sm text-gray-500">
						Kelola visibilitas, sunting isi tulisan, atau arsipkan
						warta yang tidak usang.
					</p>
				</div>
				<div className="flex gap-2 text-sm">
					<button
						onClick={() => exportCsv(filtered)}
						className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-gray-700 hover:bg-gray-50"
					>
						<LuDownload /> Ekspor CSV
					</button>
					<Link
						to={`${PATHS.admin.news}/new`}
						className="flex items-center gap-2 rounded-lg bg-[#F4BF46] px-3 py-2 font-semibold text-[#021B3E]"
					>
						<LuPlus /> Tulis Warta Baru
					</Link>
				</div>
			</div>

			<div className="flex flex-wrap gap-3 px-5 pb-4">
				<label className="relative min-w-60 flex-1">
					<LuSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
					<input
						value={query}
						onChange={(e) => onFilter(setQuery)(e.target.value)}
						placeholder="Cari judul artikel, topik riset, atau nama editor..."
						className={`${field} w-full pl-9`}
					/>
				</label>
				<select
					value={category}
					onChange={(e) => onFilter(setCategory)(e.target.value)}
					className={field}
					aria-label="Filter kategori"
				>
					<option value="">Semua Kategori</option>
					{categories.map((c) => (
						<option key={c} value={c}>
							{c}
						</option>
					))}
				</select>
				<select
					value={status}
					onChange={(e) => onFilter(setStatus)(e.target.value)}
					className={field}
					aria-label="Filter status publikasi"
				>
					<option value="">Semua Status Publikasi</option>
					<option value="published">Terbit (Live)</option>
					<option value="draft">Draf (Konsep)</option>
				</select>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full min-w-[860px] text-left text-sm">
					<thead className="bg-[#EBF1FF] text-[11px] tracking-wider text-gray-600 uppercase">
						<tr>
							<th className="px-5 py-3 font-semibold">
								Artikel warta
							</th>
							<th className="px-3 py-3 font-semibold">
								Kategori
							</th>
							<th className="px-3 py-3 font-semibold">
								Penulis / editor
							</th>
							<th className="px-3 py-3 font-semibold">
								Tanggal rilis
							</th>
							<th className="px-3 py-3 font-semibold">Status</th>
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
									Tidak ada artikel yang cocok dengan filter
									ini.
								</td>
							</tr>
						)}
						{rows.map((r) => (
							<tr
								key={r.id}
								className={`border-t border-gray-100 ${r.status === "draft" ? "bg-amber-50/50" : ""}`}
							>
								<td className="px-5 py-4">
									<div className="flex max-w-sm items-center gap-3">
										<img
											src="/news1.jfif"
											alt=""
											className="size-10 shrink-0 rounded object-cover"
										/>
										<div className="min-w-0">
											<p className="truncate font-medium text-[#021B3E]">
												{r.title}
											</p>
											<p className="truncate text-xs text-gray-500">
												{r.description}
											</p>
										</div>
									</div>
								</td>
								<td className="px-3 py-4">
									<span
										className={`rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${BADGE[r.category] ?? "bg-gray-100 text-gray-700"}`}
									>
										{r.category}
									</span>
								</td>
								<td className="px-3 py-4">
									<p className="text-xs font-medium text-[#021B3E]">
										{r.author}
									</p>
									<p className="text-[11px] text-gray-500">
										{r.authorRole}
									</p>
								</td>
								<td className="px-3 py-4 whitespace-nowrap">
									<p className="text-xs font-medium text-[#021B3E]">
										{formatDate(r.date)}
									</p>
									<p className="text-[11px] text-gray-500">
										{r.time}
									</p>
								</td>
								<td className="px-3 py-4">
									<span
										className={`rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${r.status === "published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-800"}`}
									>
										{r.status === "published"
											? "Terbit (Live)"
											: "Draf (Konsep)"}
									</span>
								</td>
								<td className="px-5 py-4">
									<div className="flex justify-end gap-3 text-lg text-[#021B3E]">
										<Link
											to={`${PATHS.admin.news}/${r.id}/edit`}
											aria-label={`Edit ${r.title}`}
										>
											<LuPencil />
										</Link>
										{r.status === "published" ? (
											<Link
												to={`/news/${createSlug(r.title)}`}
												target="_blank"
												aria-label={`Lihat ${r.title} di portal`}
											>
												<LuEye />
											</Link>
										) : (
											<button
												onClick={() => onPublish(r.id)}
												aria-label={`Terbitkan ${r.title}`}
												className="text-green-700"
											>
												<LuUpload />
											</button>
										)}
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-5 py-4 text-xs text-gray-500">
				<span>
					Menampilkan {filtered.length === 0 ? 0 : start + 1} -{" "}
					{start + rows.length} dari {filtered.length} warta
				</span>
				<div className="flex items-center gap-1">
					<button
						disabled={current === 1}
						onClick={() => setPage(current - 1)}
						aria-label="Halaman sebelumnya"
						className="grid size-8 place-items-center rounded disabled:opacity-40"
					>
						<LuChevronLeft />
					</button>
					{Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
						<button
							key={p}
							onClick={() => setPage(p)}
							aria-current={p === current}
							className={`size-8 rounded ${p === current ? "bg-[#021B3E] font-semibold text-white" : "hover:bg-gray-100"}`}
						>
							{p}
						</button>
					))}
					<button
						disabled={current === pages}
						onClick={() => setPage(current + 1)}
						aria-label="Halaman berikutnya"
						className="grid size-8 place-items-center rounded disabled:opacity-40"
					>
						<LuChevronRight />
					</button>
				</div>
			</div>
		</section>
	);
};

export default NewsTable;
