import {
	LuGraduationCap,
	LuImages,
	LuSparkles,
	LuTarget,
} from "react-icons/lu";
import type { ProfileTab } from "../profile.types";

const TABS: { key: ProfileTab; label: string; icon: typeof LuTarget }[] = [
	{ key: "identity", label: "1. Identitas & Sejarah", icon: LuGraduationCap },
	{ key: "visi", label: "2. Visi, Misi & Nilai", icon: LuTarget },
	{ key: "welcome", label: "3. Sambutan Kepala Sekolah", icon: LuSparkles },
	{ key: "media", label: "4. Media & Foto Sekolah", icon: LuImages },
];

const ProfileTabs = ({
	tab,
	onTab,
}: {
	tab: ProfileTab;
	onTab: (t: ProfileTab) => void;
}) => (
	<div
		className="flex flex-wrap gap-1 rounded-xl border border-gray-200 bg-white p-2 shadow-sm"
		role="tablist"
	>
		{TABS.map(({ key, label, icon: Icon }) => (
			<button
				key={key}
				role="tab"
				aria-selected={tab === key}
				onClick={() => onTab(key)}
				className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm ${tab === key ? "bg-[#021B3E] font-semibold text-white" : "text-gray-600 hover:bg-[#EBF1FF]"}`}
			>
				<Icon /> {label}
			</button>
		))}
	</div>
);

export default ProfileTabs;
