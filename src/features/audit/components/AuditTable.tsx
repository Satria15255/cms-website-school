import {
	LuChevronLeft,
	LuChevronRight,
	LuHistory,
	LuRefreshCw,
} from "react-icons/lu";
import {
	ACTION_TONE,
	MODULE_LABEL,
	MODULE_TONE,
	PAGE_SIZE,
	formatDateTime,
	formatRelative,
	pageList,
} from "../auditUtils";
import type { AuditEntry, AuditUser } from "../audit.types";

interface Props {
	rows: AuditEntry[]; // sudah dipotong per halaman
	totalFiltered: number;
	page: number;
	pages: number;
	selectedId: string | null;
	users: Map<string, AuditUser>;
	refreshing: boolean;
	onPage: (p: number) => void;
	onSelect: (id: string) => void;
	onRefresh: () => void;
}

const AuditTable = ({
	rows,
	totalFiltered,
	page,
	pages,
	selectedId,
	users,
	refreshing,
	onPage,
	onSelect,
	onRefresh,
}: Props) => {
	const start = (page - 1) * PAGE_SIZE;
	return (
		<section className="rounded-xl border border-gray-200 bg-white shadow-sm">
			<div className="flex items-center justify-between gap-3 p-5">
				<h2 className="flex flex-wrap items-center gap-2 font-moda text-xl text-[#021B3E]">
					<LuHistory /> Daftar Kronologis Aktivitas Sistem
					<span className="rounded bg-[#EBF1FF] px-2 py-0.5 font-sans text-[10px] font-semibold">
						Menampilkan {PAGE_SIZE} mutasi terbaru
					</span>
				</h2>
				<button
					onClick={onRefresh}
					aria-label="Muat ulang log"
					className="text-lg text-[#021B3E]"
				>
					<LuRefreshCw className={refreshing ? "animate-spin" : ""} />
				</button>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full min-w-[960px] text-left text-sm">
					<thead className="bg-[#EBF1FF] text-[11px] tracking-wider text-gray-600 uppercase">
						<tr>
							<th className="px-5 py-3 font-semibold">
								Waktu & timestamp
							</th>
							<th className="px-3 py-3 font-semibold">
								Pengguna / admin
							</th>
							<th className="px-3 py-3 font-semibold">
								Modul sistem
							</th>
							<th className="px-3 py-3 font-semibold">
								Tipe aksi
							</th>
							<th className="px-5 py-3 font-semibold">
								Rincian perubahan & entitas
							</th>
						</tr>
					</thead>
					<tbody>
						{rows.length === 0 && (
							<tr>
								<td
									colSpan={5}
									className="px-5 py-10 text-center text-gray-500"
								>
									Tidak ada log yang cocok dengan filter ini.
								</td>
							</tr>
						)}
						{rows.map((e) => {
							const u = users.get(e.userId);
							const selected = e.id === selectedId;
							return (
								<tr
									key={e.id}
									onClick={() => onSelect(e.id)}
									className={`cursor-pointer border-t border-gray-100 align-top ${selected ? "bg-[#EBF1FF]/60" : "hover:bg-gray-50"}`}
								>
									<td className="px-5 py-4 whitespace-nowrap">
										<button
											onClick={() => onSelect(e.id)}
											aria-pressed={selected}
											aria-label={`Inspeksi ${e.id}`}
											className="text-left"
										>
											<span className="block font-mono text-xs font-semibold text-[#021B3E]">
												{formatDateTime(e.timestamp)}
											</span>
											<span className="text-[11px] text-gray-500">
												{formatRelative(e.timestamp)}
											</span>
										</button>
									</td>
									<td className="px-3 py-4">
										<div className="flex items-center gap-2">
											<span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#021B3E] text-[10px] font-semibold text-white">
												{u?.init ?? "?"}
											</span>
											<div>
												<p className="text-xs font-semibold text-[#021B3E]">
													{u?.name ?? e.userId}
												</p>
												<p className="text-[11px] text-gray-500">
													{u?.role ?? "-"}
												</p>
											</div>
										</div>
									</td>
									<td className="px-3 py-4">
										<span
											className={`rounded-full px-2.5 py-1 text-[11px] font-medium whitespace-nowrap ${MODULE_TONE[e.module]}`}
										>
											{MODULE_LABEL[e.module]}
										</span>
									</td>
									<td className="px-3 py-4">
										<span
											className={`rounded px-2 py-1 text-[10px] font-bold tracking-wider ${ACTION_TONE[e.action]}`}
										>
											{e.action}
										</span>
									</td>
									<td className="max-w-md px-5 py-4">
										<p className="text-xs font-medium text-[#021B3E]">
											{e.summary}
										</p>
										<p className="mt-1 text-[11px] text-gray-500">
											{e.entity}
										</p>
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
						{totalFiltered === 0 ? 0 : start + 1} -{" "}
						{start + rows.length}
					</strong>{" "}
					dari{" "}
					<strong>{totalFiltered.toLocaleString("id-ID")}</strong> log
					peristiwa tercatat
				</span>
				<div className="flex items-center gap-1">
					<button
						disabled={page === 1}
						onClick={() => onPage(page - 1)}
						aria-label="Halaman sebelumnya"
						className="grid size-8 place-items-center rounded disabled:opacity-40"
					>
						<LuChevronLeft />
					</button>
					{pageList(page, pages).map((p, i) =>
						p === "…" ? (
							<span key={`gap-${i}`} className="px-1">
								…
							</span>
						) : (
							<button
								key={p}
								onClick={() => onPage(p)}
								aria-current={p === page}
								className={`size-8 rounded ${p === page ? "bg-[#021B3E] font-semibold text-white" : "hover:bg-gray-100"}`}
							>
								{p}
							</button>
						),
					)}
					<button
						disabled={page === pages}
						onClick={() => onPage(page + 1)}
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

export default AuditTable;
