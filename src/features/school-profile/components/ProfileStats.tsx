import type { ReactNode } from "react";
import {
	LuCircleCheck,
	LuCloudUpload,
	LuFlag,
	LuMessageSquareQuote,
	LuShieldCheck,
} from "react-icons/lu";
import { getProfileStats } from "../profileUtils";
import type { SchoolProfile } from "../profile.types";

type Stats = ReturnType<typeof getProfileStats>;

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
			<span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#EBF1FF] text-lg text-[#021B3E]">
				{icon}
			</span>
		</div>
		<div className="mt-3">{children}</div>
	</div>
);

interface Props {
	profile: SchoolProfile; // versi tersimpan
	stats: Stats;
	lastSaved: string | null;
}

const ProfileStats = ({ profile, stats, lastSaved }: Props) => (
	<section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
		<Card label="Status profil" icon={<LuShieldCheck />}>
			<p className="font-moda text-2xl text-[#021B3E]">
				{stats.percent === 100 ? "Lengkap & Terbit" : "Belum Lengkap"}
			</p>
			<p
				className={`mt-1 flex items-center gap-1.5 text-xs ${stats.percent === 100 ? "text-green-700" : "text-amber-700"}`}
			>
				<LuCircleCheck /> {stats.percent}% kolom identitas terisi
			</p>
		</Card>

		<Card label="Sambutan pimpinan" icon={<LuMessageSquareQuote />}>
			<p className="font-moda text-2xl text-[#021B3E]">
				{profile.welcome.published ? "Aktif Tayang" : "Draft"}
			</p>
			<p
				className="mt-1 truncate text-xs text-gray-500"
				title={profile.welcome.name}
			>
				{profile.welcome.name}
			</p>
		</Card>

		<Card label="Visi & nilai inti" icon={<LuFlag />}>
			<p className="font-moda text-2xl text-[#021B3E]">
				{stats.misiCount} Misi • {stats.nilaiCount} Nilai
			</p>
			<p
				className="mt-1 truncate text-xs text-gray-500"
				title={profile.curriculum}
			>
				{profile.curriculum}
			</p>
		</Card>

		<Card label="Terakhir disinkron" icon={<LuCloudUpload />}>
			<p className="font-moda text-2xl text-[#021B3E]">
				{lastSaved ? `Hari ini, ${lastSaved}` : "Belum diubah"}
			</p>
			<p className="mt-1 truncate text-xs text-gray-500">
				{lastSaved
					? "Oleh admin.humas (sesi ini)"
					: "Belum ada perubahan di sesi ini"}
			</p>
		</Card>
	</section>
);

export default ProfileStats;
