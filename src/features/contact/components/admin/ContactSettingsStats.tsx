import type { ReactNode } from "react";
import {
	LuBadgeCheck,
	LuClock,
	LuMapPin,
	LuMessageSquare,
} from "react-icons/lu";
import type { getContactStats } from "../../settingsUtils";
import type { ContactSettings } from "../../settings.types";

type Stats = ReturnType<typeof getContactStats>;

const Card = ({
	label,
	icon,
	tone,
	children,
}: {
	label: string;
	icon: ReactNode;
	tone: string;
	children: ReactNode;
}) => (
	<div className="flex gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
		<span
			className={`grid size-10 shrink-0 place-items-center rounded-lg text-lg ${tone}`}
		>
			{icon}
		</span>
		<div className="min-w-0">
			<p className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
				{label}
			</p>
			{children}
		</div>
	</div>
);

const ContactSettingsStats = ({
	stats,
	saved,
}: {
	stats: Stats;
	saved: ContactSettings;
}) => (
	<section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
		<Card
			label="Status kanal kontak"
			icon={<LuBadgeCheck />}
			tone="bg-amber-100 text-amber-800"
		>
			<p className="font-moda text-xl text-[#021B3E]">
				{stats.activeCount} Saluran Aktif
			</p>
			<p className="truncate text-[11px] text-gray-500">
				{stats.activeLabels || "Belum ada kanal aktif"}
			</p>
		</Card>
		<Card
			label="WhatsApp center"
			icon={<LuMessageSquare />}
			tone="bg-[#EBF1FF] text-[#021B3E]"
		>
			<p className="truncate font-moda text-xl text-[#021B3E]">
				{saved.whatsappEnabled ? saved.whatsapp : "Nonaktif"}
			</p>
			<p className="text-[11px] text-gray-500">Layanan Chat WhatsApp</p>
		</Card>
		<Card
			label="Waktu layanan"
			icon={<LuClock />}
			tone="bg-[#EBF1FF] text-[#021B3E]"
		>
			<p className="font-moda text-xl text-[#021B3E]">
				{stats.mainHours}
			</p>
			<p
				className={`text-[11px] ${stats.openToday ? "text-green-700" : "text-red-700"}`}
			>
				{stats.openToday
					? `Buka Hari Ini (${stats.todayLabel})`
					: "Tutup Hari Ini"}
			</p>
		</Card>
		<Card
			label="Sinkronisasi peta"
			icon={<LuMapPin />}
			tone="bg-[#EBF1FF] text-[#021B3E]"
		>
			<p className="font-moda text-xl text-[#021B3E]">
				{stats.mapStatus}
			</p>
			<p className="truncate text-[11px] text-gray-500">
				{stats.coordsText}
			</p>
		</Card>
	</section>
);

export default ContactSettingsStats;
