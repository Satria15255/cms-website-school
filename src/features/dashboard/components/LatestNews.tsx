import { useState } from "react";
import { Link } from "react-router-dom";
import { LuFileText, LuArrowRight } from "react-icons/lu";
import type { DashboardNewsRow } from "../types";

type Tab = "all" | "published" | "draft";

const BADGE: Record<string, string> = {
	Prestasi: "bg-blue-100 text-blue-700",
	Kegiatan: "bg-slate-100 text-slate-700",
	Pengumuman: "bg-amber-100 text-amber-800",
};

const LatestNews = ({
	rows,
	total,
	published,
	draft,
}: {
	rows: DashboardNewsRow[];
	total: number;
	published: number;
	draft: number;
}) => {
	const [tab, setTab] = useState<Tab>("all");
	const visible = tab === "all" ? rows : rows.filter((r) => r.status === tab);

	const tabs: { key: Tab; label: string }[] = [
		{ key: "all", label: "Semua" },
		{ key: "published", label: `Terbit (${published})` },
		{ key: "draft", label: `Draft (${draft})` },
	];

	return (
		<section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
			<div className="mb-4 flex flex-wrap items-start justify-between gap-3">
				<div>
					<h2 className="font-moda text-2xl text-[#021B3E]">
						Aktivitas Konten Berita Terkini
					</h2>
					<p className="text-sm text-gray-500">
						Daftar publikasi warta yang terhubung ke portal publik
					</p>
				</div>
				<div
					className="flex rounded-lg bg-[#EBF1FF] p-1"
					role="tablist"
				>
					{tabs.map((t) => (
						<button
							key={t.key}
							role="tab"
							aria-selected={tab === t.key}
							onClick={() => setTab(t.key)}
							className={`rounded-md px-3 py-1.5 text-xs ${tab === t.key ? "bg-white font-semibold text-[#021B3E] shadow-sm" : "text-gray-600"}`}
						>
							{t.label}
						</button>
					))}
				</div>
			</div>

			<div className="flex justify-between rounded-lg bg-[#EBF1FF] px-4 py-3 text-[11px] font-semibold tracking-wider text-gray-600 uppercase">
				<span>Judul & kategori</span>
				<span className="hidden sm:block sm:w-44">
					Penulis / editor
				</span>
			</div>

			<ul>
				{visible.length === 0 && (
					<li className="py-8 text-center text-sm text-gray-500">
						Belum ada berita di tab ini.
					</li>
				)}
				{visible.map((r) => (
					<li
						key={r.id}
						className="flex items-center justify-between gap-4 border-b border-gray-100 py-4 last:border-0"
					>
						<div className="flex min-w-0 items-center gap-3">
							{r.thumbnail ? (
								<img
									src={r.thumbnail}
									alt=""
									className="size-10 shrink-0 rounded object-cover"
								/>
							) : (
								<span className="grid size-10 shrink-0 place-items-center rounded bg-[#EBF1FF] text-[#021B3E]">
									<LuFileText />
								</span>
							)}
							<div className="min-w-0">
								<span
									className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${BADGE[r.category] ?? "bg-gray-100 text-gray-700"}`}
								>
									{r.category}
								</span>
								<p className="truncate text-sm font-medium text-[#021B3E]">
									{r.title}
								</p>
								<p className="text-[11px] text-gray-500">
									{r.status === "draft"
										? `Dibuat ${r.date}`
										: r.date}
								</p>
							</div>
						</div>
						<div className="hidden w-44 shrink-0 sm:block">
							<p className="text-xs font-medium text-[#021B3E]">
								{r.author}
							</p>
							<p className="truncate text-[11px] text-gray-500">
								{r.email}
							</p>
						</div>
					</li>
				))}
			</ul>

			<div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs">
				<span className="text-gray-500">
					Menampilkan {visible.length} dari {total} artikel warta
				</span>
				<Link
					to="/admin/news"
					className="flex items-center gap-1 font-semibold text-amber-800 hover:underline"
				>
					Kelola Semua Berita di Menu Berita <LuArrowRight />
				</Link>
			</div>
		</section>
	);
};

export default LatestNews;
