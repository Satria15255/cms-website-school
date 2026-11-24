import type { ReactNode } from "react";
import {
	LuBriefcase,
	LuCircleAlert,
	LuCircleCheck,
	LuGraduationCap,
	LuUserCheck,
	LuUsers,
} from "react-icons/lu";
import type { getDirectoryStats } from "../directoryUtils";

type Stats = ReturnType<typeof getDirectoryStats>;

const Card = ({
	label,
	icon,
	children,
	dark,
}: {
	label: string;
	icon: ReactNode;
	children: ReactNode;
	dark?: boolean;
}) => (
	<div
		className={`rounded-xl p-5 shadow-sm ${dark ? "bg-[#021B3E] text-white" : "border border-gray-200 bg-white"}`}
	>
		<div className="flex items-start justify-between gap-2">
			<p
				className={`text-[11px] font-semibold tracking-wider uppercase ${dark ? "text-[#F4BF46]" : "text-gray-500"}`}
			>
				{label}
			</p>
			<span
				className={`grid size-9 shrink-0 place-items-center rounded-lg text-lg ${dark ? "bg-white/10 text-[#F4BF46]" : "bg-[#EBF1FF] text-[#021B3E]"}`}
			>
				{icon}
			</span>
		</div>
		<div className="mt-3">{children}</div>
	</div>
);

const DirectoryStats = ({ stats }: { stats: Stats }) => (
	<section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
		<Card label="Total pendidik & staf" icon={<LuUsers />}>
			<p className="font-moda text-3xl text-[#021B3E]">
				{stats.total}{" "}
				<span className="font-sans text-sm text-gray-500">Orang</span>
			</p>
			{stats.allConsented ? (
				<p className="mt-2 flex items-center gap-1.5 text-xs text-green-700">
					<LuCircleCheck /> Semua terverifikasi sistem
				</p>
			) : (
				<p className="mt-2 flex items-center gap-1.5 text-xs text-amber-700">
					<LuCircleAlert /> {stats.withoutConsent} belum menyetujui
					publikasi
				</p>
			)}
		</Card>

		<Card label="Guru pengampu" icon={<LuGraduationCap />}>
			<p className="font-moda text-3xl text-[#021B3E]">
				{stats.pendidik}{" "}
				<span className="font-sans text-sm text-gray-500">
					Guru Mata Pelajaran
				</span>
			</p>
			<p className="mt-2 text-xs text-gray-500">
				{stats.subjects} bidang studi berbeda
			</p>
		</Card>

		<Card label="Tenaga kependidikan" icon={<LuBriefcase />}>
			<p className="font-moda text-3xl text-[#021B3E]">
				{stats.staff}{" "}
				<span className="font-sans text-sm text-gray-500">Staf</span>
			</p>
			<p className="mt-2 text-xs text-gray-500">
				{stats.staffUnits || "-"}
			</p>
		</Card>

		<Card label="Penetapan wali kelas" icon={<LuUserCheck />} dark>
			<p className="font-moda text-3xl">
				{stats.rombelWithWali}{" "}
				<span className="font-sans text-sm text-white/70">
					dari {stats.activeRombel} Rombel
				</span>
			</p>
			<p className="mt-2 text-xs text-white/70">
				{stats.waliTeachers} guru di direktori menjabat wali kelas
			</p>
		</Card>
	</section>
);

export default DirectoryStats;
