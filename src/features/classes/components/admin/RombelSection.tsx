import RombelCard from "./RombelCard";
import { LEVEL_WORDS, nameKey } from "../../rombelUtils";
import type { LevelMeta, Rombel, TeacherOption } from "../../rombel.types";
import type { ViewMode } from "./RombelFilter";

interface Props {
	level: LevelMeta;
	rombels: Rombel[];
	teachers: Map<string, TeacherOption>;
	view: ViewMode;
	onEdit: (r: Rombel) => void;
	onToggleArchive: (r: Rombel) => void;
}

const BAR: Record<string, string> = {
	VII: "bg-amber-500",
	VIII: "bg-[#021B3E]",
	IX: "bg-stone-800",
};
const cap = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();

const RombelSection = ({
	level,
	rombels,
	teachers,
	view,
	onEdit,
	onToggleArchive,
}: Props) => {
	const pending = rombels.filter(
		(r) => r.status === "active" && !r.wali,
	).length;
	const unlisted = rombels.filter(
		(r) => r.wali && !teachers.has(nameKey(r.wali)),
	).length;

	return (
		<section>
			<div className="mb-4 flex flex-wrap items-end justify-between gap-2">
				<div className="flex items-stretch gap-3">
					<span className={`w-1.5 rounded ${BAR[level.symbol]}`} />
					<div>
						<h2 className="flex flex-wrap items-center gap-3 font-moda text-2xl text-[#021B3E]">
							Jenjang Kelas {level.symbol} (
							{LEVEL_WORDS[level.symbol]})
							<span className="rounded bg-[#EBF1FF] px-2 py-0.5 font-sans text-[10px] font-semibold text-[#021B3E]">
								Fase {cap(level.tingkat)} • {rombels.length}{" "}
								Rombel
							</span>
						</h2>
						<p className="text-xs text-gray-500">
							{level.phase} — {level.description}
						</p>
					</div>
				</div>
				{pending > 0 ? (
					<span className="text-xs font-semibold text-red-700">
						{pending} Rombel Butuh Penetapan
					</span>
				) : unlisted > 0 ? (
					<span className="text-xs font-semibold text-amber-700">
						{unlisted} wali belum ada di direktori guru
					</span>
				) : (
					<span className="text-xs text-gray-500">
						Semua Wali Kelas Terverifikasi
					</span>
				)}
			</div>
			<div
				className={
					view === "grid"
						? "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
						: "grid grid-cols-1 gap-4"
				}
			>
				{rombels.map((r) => (
					<RombelCard
						key={r.id}
						rombel={r}
						teacher={teachers.get(nameKey(r.wali))}
						onEdit={onEdit}
						onToggleArchive={onToggleArchive}
					/>
				))}
			</div>
		</section>
	);
};

export default RombelSection;
