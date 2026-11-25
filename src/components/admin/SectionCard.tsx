import type { ReactNode } from "react";

interface Props {
	title: string;
	description?: string;
	icon: ReactNode;
	badge?: { text: string; tone: "navy" | "amber" };
	children: ReactNode;
}

const SectionCard = ({ title, description, icon, badge, children }: Props) => (
	<section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
		<div className="mb-5 flex items-start justify-between gap-3">
			<div className="flex items-start gap-3">
				<span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#021B3E] text-lg text-white">
					{icon}
				</span>
				<div>
					<h2 className="font-moda text-xl text-[#021B3E]">
						{title}
					</h2>
					{description && (
						<p className="text-xs text-gray-500">{description}</p>
					)}
				</div>
			</div>
			{badge && (
				<span
					className={`shrink-0 rounded px-2 py-1 text-[10px] font-semibold tracking-wider uppercase ${badge.tone === "amber" ? "bg-amber-200 text-amber-900" : "bg-[#EBF1FF] text-[#021B3E]"}`}
				>
					{badge.text}
				</span>
			)}
		</div>
		{children}
	</section>
);

export default SectionCard;
