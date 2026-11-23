import type { ReactNode } from "react";
import {
	LuBuilding2,
	LuCircleAlert,
	LuCircleCheck,
	LuRefreshCw,
	LuUserCheck,
	LuUsers,
} from "react-icons/lu";
import { PATHS } from "@/app/router/paths";
import { MAX_CAPACITY, type getRombelStats } from "../../rombelUtils";

type Stats = ReturnType<typeof getRombelStats>;

const Card = ({
	label,
	icon,
	children,
}: {
	label: string;
	icon: ReactNode;
	children: ReactNode;
}) => (
	<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
		<div className="flex items-start justify-between gap-2">
			<p className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
				{label}
			</p>
			<span className="grid size-9 place-items-center rounded-lg bg-[#EBF1FF] text-lg text-[#021B3E]">
				{icon}
			</span>
		</div>
		<div className="mt-4">{children}</div>
	</div>
);

const RombelStats = ({ stats }: { stats: Stats }) => (
	<section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
		<Card label="Total rombel aktif" icon={<LuBuilding2 />}>
			<p className="font-moda text-3xl text-[#021B3E]">
				{stats.active} Kelas
			</p>
			<p className="mt-1 text-xs text-gray-500">
				{stats.byLevel.VII} VII • {stats.byLevel.VIII} VIII •{" "}
				{stats.byLevel.IX} IX ({stats.roomPercent}% Ruang Terisi)
			</p>
		</Card>

		<Card label="Penetapan wali kelas" icon={<LuUserCheck />}>
			<p className="font-moda text-3xl text-[#021B3E]">
				{stats.assigned} / {stats.active} Terisi
			</p>
			{stats.pending > 0 ? (
				<p className="mt-1 flex items-center gap-1 text-xs text-red-700">
					<LuCircleAlert /> {stats.pending} Rombel Belum Ditetapkan
				</p>
			) : (
				<p className="mt-1 flex items-center gap-1 text-xs text-green-700">
					<LuCircleCheck /> Semua rombel sudah punya wali
				</p>
			)}
		</Card>

		<Card label="Kapasitas belajar" icon={<LuUsers />}>
			<p className="font-moda text-3xl text-[#021B3E]">
				{stats.students} Siswa
			</p>
			<p className="mt-1 text-xs text-gray-500">
				Rata-rata {stats.average} siswa per rombel (maks {MAX_CAPACITY})
			</p>
		</Card>

		<Card label="Status sinkronisasi" icon={<LuRefreshCw />}>
			<p className="font-moda text-3xl text-green-700">Aktif & Terbuka</p>
			<p className="mt-1 text-xs text-gray-500">
				Sinkron instan ke {PATHS.classList}
			</p>
		</Card>
	</section>
);

export default RombelStats;
