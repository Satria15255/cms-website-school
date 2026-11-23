import { Link } from "react-router-dom";
import { LuHistory } from "react-icons/lu";
import { PATHS } from "@/app/router/paths";
import type { ActivityLogItem } from "../types";

const DOT: Record<ActivityLogItem["color"], string> = {
	green: "bg-green-500",
	blue: "bg-blue-500",
	purple: "bg-purple-500",
	amber: "bg-amber-500",
};

const Log = ({ items }: { items: ActivityLogItem[] }) => (
	<section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
		<div className="mb-4 flex items-center justify-between gap-2">
			<h2 className="flex items-center gap-2 font-moda text-xl text-[#021B3E]">
				<LuHistory /> Log Aktivitas Pengelola
			</h2>
			<Link
				to={PATHS.admin.logs}
				className="text-xs font-semibold text-amber-800 hover:underline"
			>
				Semua Log
			</Link>
		</div>
		<ul className="flex flex-col gap-4">
			{items.map((l) => (
				<li key={l.id} className="flex gap-3">
					<span
						className={`mt-1.5 size-2.5 shrink-0 rounded-full ${DOT[l.color]}`}
					/>
					<div className="min-w-0 flex-1">
						<div className="flex justify-between gap-2 text-xs">
							<span className="font-semibold text-[#021B3E]">
								{l.user}
							</span>
							<span className="text-gray-400">{l.time}</span>
						</div>
						<p className="mt-0.5 text-xs leading-relaxed text-gray-600">
							{l.message}
						</p>
					</div>
				</li>
			))}
		</ul>
	</section>
);

export default Log;
