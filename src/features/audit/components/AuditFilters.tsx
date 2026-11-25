import { LuCalendar, LuFilter, LuUser } from "react-icons/lu";
import { ACTIONS, MODULE_LABEL, PRESET_LABEL } from "../auditUtils";
import type {
	AuditFilters as Filters,
	AuditModule,
	AuditUser,
	PresetKey,
} from "../audit.types";

const select =
	"rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs focus:outline-2 focus:outline-[#021B3E]";
const RANGES = [
	{ v: 7, l: "7 Hari Terakhir" },
	{ v: 30, l: "30 Hari Terakhir" },
	{ v: 90, l: "90 Hari Terakhir" },
	{ v: 0, l: "Semua Waktu" },
];

interface Props {
	filters: Filters;
	users: AuditUser[];
	counts: Record<PresetKey, number>;
	onChange: (patch: Partial<Filters>) => void;
}

const AuditFilters = ({ filters, users, counts, onChange }: Props) => (
	<section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
		<div className="flex flex-wrap gap-3">
			<label className="relative min-w-60 flex-1">
				<LuFilter className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
				<input
					value={filters.query}
					onChange={(e) => onChange({ query: e.target.value })}
					placeholder="Cari admin, modul, ID berkas, rincian"
					className={`${select} w-full pl-9`}
				/>
			</label>
			<select
				value={filters.module}
				onChange={(e) =>
					onChange({ module: e.target.value as "" | AuditModule })
				}
				className={select}
				aria-label="Filter modul"
			>
				<option value="">Semua Modul</option>
				{(Object.keys(MODULE_LABEL) as AuditModule[]).map((m) => (
					<option key={m} value={m}>
						{MODULE_LABEL[m]}
					</option>
				))}
			</select>
			<select
				value={filters.action}
				onChange={(e) =>
					onChange({ action: e.target.value as Filters["action"] })
				}
				className={select}
				aria-label="Filter tipe aksi"
			>
				<option value="">Semua Tipe Aksi</option>
				{ACTIONS.map((a) => (
					<option key={a} value={a}>
						{a}
					</option>
				))}
			</select>
			<label className="relative">
				<LuCalendar className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
				<select
					value={filters.rangeDays}
					onChange={(e) =>
						onChange({ rangeDays: Number(e.target.value) })
					}
					className={`${select} pl-9`}
					aria-label="Rentang waktu"
				>
					{RANGES.map((r) => (
						<option key={r.v} value={r.v}>
							{r.l}
						</option>
					))}
				</select>
			</label>
			<label className="relative">
				<LuUser className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
				<select
					value={filters.user}
					onChange={(e) => onChange({ user: e.target.value })}
					className={`${select} pl-9`}
					aria-label="Filter akun admin"
				>
					<option value="">Semua Akun Admin</option>
					{users.map((u) => (
						<option key={u.id} value={u.id}>
							{u.name}
						</option>
					))}
				</select>
			</label>
		</div>

		<div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
			<span className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
				Filter populer:
			</span>
			{(Object.keys(PRESET_LABEL) as PresetKey[]).map((k) => (
				<button
					key={k}
					aria-pressed={filters.preset === k}
					onClick={() => onChange({ preset: k })}
					className={`rounded-full px-3 py-1.5 ${filters.preset === k ? "bg-[#021B3E] font-semibold text-white" : "bg-[#EBF1FF] text-[#021B3E] hover:bg-[#dbe5ff]"}`}
				>
					{PRESET_LABEL[k]}
					{k !== "all" && ` (${counts[k]})`}
				</button>
			))}
		</div>
	</section>
);

export default AuditFilters;
