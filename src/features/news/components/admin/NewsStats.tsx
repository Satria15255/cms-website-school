import type { ReactNode } from "react";
import {
	LuCircleCheck,
	LuClock,
	LuLayoutGrid,
	LuNewspaper,
} from "react-icons/lu";
import { formatDate } from "@/utils/formatDate";
import type { getNewsStats } from "../../newsStats";

type Stats = ReturnType<typeof getNewsStats>;

const Card = ({
	label,
	icon,
	value,
	note,
	noteClass = "text-gray-500",
}: {
	label: string;
	icon: ReactNode;
	value: number;
	note: string;
	noteClass?: string;
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
		<p className="mt-3 font-moda text-3xl text-[#021B3E]">
			{value} <span className="text-base text-gray-500">Artikel</span>
		</p>
		<p className={`mt-1 text-xs ${noteClass}`}>{note}</p>
	</div>
);

const NewsStats = ({ stats }: { stats: Stats }) => (
	<section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
		<Card
			label="Total artikel"
			icon={<LuNewspaper />}
			value={stats.total}
			note={
				stats.latestPublished
					? `Terbit terbaru ${formatDate(stats.latestPublished)}`
					: "Belum ada yang terbit"
			}
		/>
		<Card
			label="Terbit (Published)"
			icon={<LuCircleCheck />}
			value={stats.published}
			note="Tayang di portal publik"
			noteClass="text-green-700"
		/>
		<Card
			label="Draf (Draft)"
			icon={<LuClock />}
			value={stats.draft}
			note="Menunggu kelengkapan"
			noteClass="text-amber-700"
		/>

		<div className="rounded-xl bg-[#021B3E] p-5 text-white">
			<div className="flex items-center justify-between">
				<p className="text-[11px] font-semibold tracking-wider text-[#F4BF46] uppercase">
					Distribusi kategori
				</p>
				<LuLayoutGrid className="text-[#F4BF46]" />
			</div>
			<div className="mt-3 grid grid-cols-3 gap-x-2 gap-y-3">
				{Object.entries(stats.categories).map(([name, count]) => (
					<div key={name} className="min-w-0">
						<p className="font-moda text-2xl leading-none">
							{count}
						</p>
						<p
							className="mt-1 truncate text-[10px] text-white/70"
							title={name}
						>
							{name}
						</p>
					</div>
				))}
			</div>
		</div>
	</section>
);

export default NewsStats;
