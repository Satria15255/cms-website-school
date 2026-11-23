import { LuLayoutGrid, LuList, LuSearch } from "react-icons/lu";
import type { Tingkat } from "../../rombel.types";

export type LevelTab = "all" | Tingkat;
export type ViewMode = "grid" | "list";

interface Props {
	tab: LevelTab;
	counts: Record<LevelTab, number>;
	query: string;
	view: ViewMode;
	onTab: (t: LevelTab) => void;
	onQuery: (q: string) => void;
	onView: (v: ViewMode) => void;
}

const TABS: { key: LevelTab; label: string }[] = [
	{ key: "all", label: "Semua Tingkat" },
	{ key: "VII", label: "Tingkat VII" },
	{ key: "VIII", label: "Tingkat VIII" },
	{ key: "IX", label: "Tingkat IX" },
];

const RombelFilter = ({
	tab,
	counts,
	query,
	view,
	onTab,
	onQuery,
	onView,
}: Props) => (
	<div className="flex flex-wrap items-center justify-between gap-3">
		<div className="flex flex-wrap gap-2" role="tablist">
			{TABS.map((t) => (
				<button
					key={t.key}
					role="tab"
					aria-selected={tab === t.key}
					onClick={() => onTab(t.key)}
					className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs ${tab === t.key ? "bg-[#021B3E] font-semibold text-white" : "text-gray-600 hover:bg-white"}`}
				>
					{t.label}
					<span
						className={`rounded-full px-1.5 py-0.5 text-[10px] ${tab === t.key ? "bg-white/20" : "bg-[#EBF1FF]"}`}
					>
						{counts[t.key]}
					</span>
				</button>
			))}
		</div>
		<div className="flex items-center gap-2">
			<label className="relative">
				<LuSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
				<input
					value={query}
					onChange={(e) => onQuery(e.target.value)}
					placeholder="Cari rombel atau nama wali"
					className="w-64 rounded-lg border border-gray-300 bg-white py-2 pr-3 pl-9 text-xs focus:outline-2 focus:outline-[#021B3E]"
				/>
			</label>
			<div className="flex rounded-lg border border-gray-300 bg-white p-0.5 text-base">
				<button
					aria-label="Tampilan grid"
					aria-pressed={view === "grid"}
					onClick={() => onView("grid")}
					className={`rounded p-1.5 ${view === "grid" ? "bg-[#EBF1FF]" : ""}`}
				>
					<LuLayoutGrid />
				</button>
				<button
					aria-label="Tampilan daftar"
					aria-pressed={view === "list"}
					onClick={() => onView("list")}
					className={`rounded p-1.5 ${view === "list" ? "bg-[#EBF1FF]" : ""}`}
				>
					<LuList />
				</button>
			</div>
		</div>
	</div>
);

export default RombelFilter;
