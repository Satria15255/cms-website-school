import {
	LuArchive,
	LuArchiveRestore,
	LuCircleCheck,
	LuCircleAlert,
	LuDoorOpen,
	LuPencil,
	LuUsers,
	LuUserPlus,
} from "react-icons/lu";
import { formatRoom, initials } from "../../rombelUtils";
import type { Rombel, TeacherOption } from "../../rombel.types";

interface Props {
	rombel: Rombel;
	teacher?: TeacherOption; // hasil pencocokan wali dengan direktori guru
	onEdit: (r: Rombel) => void;
	onToggleArchive: (r: Rombel) => void;
}

const STRIP: Record<Rombel["tingkat"], string> = {
	VII: "border-t-amber-700",
	VIII: "border-t-[#021B3E]",
	IX: "border-t-stone-800",
};

const RombelCard = ({ rombel: r, teacher, onEdit, onToggleArchive }: Props) => {
	const archived = r.status === "archived";
	const pending = !r.wali;
	const left = r.capacity - r.enrolled;

	const badge = archived
		? { text: "Arsip", cls: "bg-gray-200 text-gray-600" }
		: pending
			? { text: "Butuh Wali", cls: "bg-amber-100 text-amber-800" }
			: { text: "Tayang", cls: "bg-green-100 text-green-700" };

	return (
		<article
			className={`flex flex-col rounded-xl border border-t-4 border-gray-200 bg-white p-4 shadow-sm ${STRIP[r.tingkat]} ${archived ? "opacity-60" : ""}`}
		>
			<div className="flex items-center justify-between gap-2">
				<span className="rounded bg-[#EBF1FF] px-2 py-0.5 text-[10px] font-semibold tracking-wider text-[#021B3E] uppercase">
					Rombel {r.name.replace("Kelas ", "").replace("-", " ")}
				</span>
				<span
					className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${badge.cls}`}
				>
					{badge.text}
				</span>
			</div>
			<h3 className="mt-3 font-moda text-2xl text-[#021B3E]">{r.name}</h3>

			<div className="mt-3 flex flex-col gap-2 rounded-lg bg-gray-50 p-3 text-xs text-gray-600">
				<p className="flex items-center gap-2">
					<LuDoorOpen className="shrink-0" />{" "}
					{r.room ? formatRoom(r.room) : "Ruang belum diatur"}
				</p>
				<p className="flex items-center gap-2">
					<LuUsers className="shrink-0" /> {r.enrolled} / {r.capacity}{" "}
					Siswa ({left <= 0 ? "Penuh" : `Tersedia ${left}`})
				</p>
			</div>

			<div className="mt-4 flex-1">
				{pending ? (
					<>
						<p className="text-[10px] font-semibold tracking-wider text-amber-700 uppercase">
							Penetapan wali tertunda
						</p>
						<div className="mt-2 rounded-lg border border-dashed border-amber-300 bg-amber-50 p-3 text-xs text-amber-900">
							<p className="font-semibold">
								[ Belum Ditetapkan ]
							</p>
							<p className="mt-1 text-amber-800/80">
								Menunggu pembagian beban mengajar semester baru.
							</p>
							<button
								onClick={() => onEdit(r)}
								className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#F4BF46] py-2 font-semibold text-[#021B3E]"
							>
								<LuUserPlus /> Tetapkan Guru Sekarang
							</button>
						</div>
					</>
				) : (
					<>
						<p className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
							Wali kelas ditetapkan
						</p>
						<div className="mt-2 flex items-center gap-3">
							<span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#021B3E] text-xs font-semibold text-white">
								{initials(r.wali)}
							</span>
							<div className="min-w-0">
								<p
									className="truncate text-sm font-medium text-[#021B3E]"
									title={r.wali}
								>
									{r.wali}
								</p>
								<p className="truncate text-xs text-gray-500">
									{teacher
										? teacher.subject
										: "Belum ada di direktori guru"}
								</p>
							</div>
						</div>
					</>
				)}
			</div>

			<div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-xs">
				{pending ? (
					<span className="flex items-center gap-1 text-amber-700">
						<LuCircleAlert /> Menunggu wali
					</span>
				) : teacher ? (
					<span className="flex items-center gap-1 text-green-700">
						<LuCircleCheck /> Terhubung direktori
					</span>
				) : (
					<span className="flex items-center gap-1 text-amber-700">
						<LuCircleAlert /> Belum di direktori
					</span>
				)}
				<div className="flex gap-3 text-base text-[#021B3E]">
					<button
						onClick={() => onEdit(r)}
						aria-label={`Edit ${r.name}`}
					>
						<LuPencil />
					</button>
					<button
						onClick={() => onToggleArchive(r)}
						aria-label={
							archived
								? `Aktifkan ${r.name}`
								: `Arsipkan ${r.name}`
						}
					>
						{archived ? <LuArchiveRestore /> : <LuArchive />}
					</button>
				</div>
			</div>
		</article>
	);
};

export default RombelCard;
