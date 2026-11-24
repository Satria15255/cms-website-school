import { useState } from "react";
import { LuListTree, LuTable2 } from "react-icons/lu";
import OrgNodeCard from "./OrgNodeCard";
import { LEVELS, resolveHolder } from "../orgUtils";
import type { Level, Person, Position } from "../org.types";

interface Props {
	positions: Position[]; // sudah terurut (level, order)
	people: Map<string, Person>;
	onEdit: (p: Position) => void;
}

const GRID = "grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4";
const Line = () => <div className="mx-auto h-8 w-px bg-gray-400" aria-hidden />;

const OrgChart = ({ positions, people, onEdit }: Props) => {
	const [view, setView] = useState<"tree" | "list">("tree");
	const at = (l: Level) => positions.filter((p) => p.level === l);
	const card = (p: Position) => (
		<OrgNodeCard
			key={p.id}
			position={p}
			holder={resolveHolder(p, people)}
			onEdit={onEdit}
		/>
	);
	const rows = ([3, 4] as Level[])
		.map((l) => ({ level: l, items: at(l) }))
		.filter((r) => r.items.length > 0);

	return (
		<section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
			<div className="mb-5 flex flex-wrap items-start justify-between gap-3">
				<div>
					<h2 className="font-moda text-2xl text-[#021B3E]">
						Bagan Hierarki Interaktif & Pengaturan Posisi
					</h2>
					<p className="text-sm text-gray-500">
						Representasi visual relasi kepemimpinan SMP Nusantara
						sesuai bagan resmi Kementerian Pendidikan.
					</p>
				</div>
				<div
					className="flex rounded-lg bg-[#EBF1FF] p-1 text-xs"
					role="tablist"
				>
					<button
						role="tab"
						aria-selected={view === "tree"}
						onClick={() => setView("tree")}
						className={`flex items-center gap-2 rounded-md px-3 py-2 ${view === "tree" ? "bg-white font-semibold text-[#021B3E] shadow-sm" : "text-gray-600"}`}
					>
						<LuListTree /> Tampilan Pohon (Tree View)
					</button>
					<button
						role="tab"
						aria-selected={view === "list"}
						onClick={() => setView("list")}
						className={`flex items-center gap-2 rounded-md px-3 py-2 ${view === "list" ? "bg-white font-semibold text-[#021B3E] shadow-sm" : "text-gray-600"}`}
					>
						<LuTable2 /> Daftar Tabel ({positions.length})
					</button>
				</div>
			</div>

			{view === "tree" ? (
				<div className="overflow-x-auto rounded-xl bg-[#F6F8FD] p-5">
					<div className="mx-auto min-w-[640px]">
						<div className="flex flex-wrap items-stretch justify-center gap-4">
							{at(2).map((p) => (
								<div key={p.id} className="w-64">
									{card(p)}
								</div>
							))}
							{at(2).length > 0 && at(1).length > 0 && (
								<span className="self-center rounded-full bg-white px-3 py-1 text-[10px] font-semibold tracking-wider text-gray-500 uppercase shadow-sm">
									Koordinasi & Konsultasi
								</span>
							)}
							{at(1).map((p) => (
								<div key={p.id} className="w-72">
									{card(p)}
								</div>
							))}
						</div>
						{rows.map((r) => (
							<div key={r.level}>
								<Line />
								<div className={GRID}>{r.items.map(card)}</div>
							</div>
						))}
					</div>
				</div>
			) : (
				<div className="flex flex-col gap-4">
					{([1, 2, 3, 4] as Level[]).map(
						(l) =>
							at(l).length > 0 && (
								<div key={l}>
									<p className="mb-1 text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
										{LEVELS[l].full}
									</p>
									<ul className="divide-y divide-gray-100 rounded-lg border border-gray-200 text-sm">
										{at(l).map((p) => (
											<li
												key={p.id}
												className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5"
											>
												<span className="text-[#021B3E]">
													{p.title}
												</span>
												<span className="text-gray-500">
													{resolveHolder(p, people)
														?.name ??
														"Belum ditetapkan"}
												</span>
											</li>
										))}
									</ul>
								</div>
							),
					)}
				</div>
			)}
		</section>
	);
};

export default OrgChart;
