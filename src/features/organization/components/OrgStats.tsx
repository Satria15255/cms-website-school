import type { ReactNode } from "react";
import {
	LuBriefcase,
	LuCircleAlert,
	LuCircleCheck,
	LuGlobe,
	LuLayers,
	LuLink,
} from "react-icons/lu";
import type { getOrgStats } from "../orgUtils";

type Stats = ReturnType<typeof getOrgStats>;

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

const OrgStats = ({ stats }: { stats: Stats }) => (
	<section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
		<Card label="Total posisi struktural" icon={<LuBriefcase />}>
			<p className="font-moda text-3xl text-[#021B3E]">
				{stats.total} Jabatan
			</p>
			{stats.filled === stats.total ? (
				<p className="mt-1 flex items-center gap-1 text-xs text-green-700">
					<LuCircleCheck /> Semua terisi pejabat aktif
				</p>
			) : (
				<p className="mt-1 flex items-center gap-1 text-xs text-amber-700">
					<LuCircleAlert /> {stats.total - stats.filled} jabatan belum
					terisi pejabat
				</p>
			)}
		</Card>

		<Card label="Tingkat hierarki" icon={<LuLayers />}>
			<p className="font-moda text-3xl text-[#021B3E]">
				{stats.levelCount} Level
			</p>
			<p className="mt-1 text-xs text-gray-500">{stats.levelNames}</p>
		</Card>

		<Card label="Sumber SDM terhubung" icon={<LuLink />}>
			<p className="font-moda text-3xl text-[#021B3E]">
				{stats.linkedPercent}% Terintegrasi
			</p>
			<p className="mt-1 text-xs text-gray-500">
				{stats.linked} dari {stats.total} jabatan terhubung ke direktori
				Tenaga Pendidik & Kependidikan
			</p>
		</Card>

		<Card label="Status sinkronisasi" icon={<LuGlobe />}>
			<p
				className={`font-moda text-3xl ${stats.shown > 0 ? "text-green-700" : "text-gray-500"}`}
			>
				{stats.shown > 0 ? "Live di Web Publik" : "Tidak Tayang"}
			</p>
			<p className="mt-1 text-xs text-gray-500">
				{stats.shown} jabatan tayang, otomatis terbarui tanpa deploy
				kode
			</p>
		</Card>
	</section>
);

export default OrgStats;
