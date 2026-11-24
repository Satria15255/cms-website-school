import { LuGlobe, LuPencil, LuShieldCheck } from "react-icons/lu";
import { levelTag } from "../orgUtils";
import type { Position, ResolvedHolder } from "../org.types";

interface Props {
	position: Position;
	holder: ResolvedHolder | null;
	onEdit: (p: Position) => void;
}

const OrgNodeCard = ({ position: p, holder, onEdit }: Props) => {
	const top = p.level === 1;
	return (
		<article
			className={`flex flex-col rounded-xl border bg-white p-4 shadow-sm ${top ? "border-[#F4BF46] ring-1 ring-[#F4BF46]" : "border-gray-200"}`}
		>
			<div className="flex items-center justify-between gap-2">
				<span
					className={`rounded px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${top ? "bg-[#F4BF46] text-[#021B3E]" : "bg-[#EBF1FF] text-[#021B3E]"}`}
				>
					{levelTag(p)}
				</span>
				<button
					onClick={() => onEdit(p)}
					aria-label={`Edit ${p.title}`}
					className="text-[#021B3E]"
				>
					<LuPencil />
				</button>
			</div>

			<div className="mt-3 flex items-center gap-3">
				{holder ? (
					p.photo ? (
						<img
							src={p.photo}
							alt=""
							className="size-12 shrink-0 rounded-full object-cover"
						/>
					) : (
						<span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#021B3E] text-sm font-semibold text-white">
							{holder.init}
						</span>
					)
				) : (
					<span className="grid size-12 shrink-0 place-items-center rounded-full border border-dashed border-amber-400 text-xs text-amber-700">
						?
					</span>
				)}
				<div className="min-w-0">
					<p className="text-sm font-semibold text-[#021B3E]">
						{holder ? holder.name : "Belum ditetapkan"}
					</p>
					<p className="text-xs text-gray-500">{p.title}</p>
				</div>
			</div>

			<p className="mt-3 flex-1 text-[11px] text-gray-500">{p.unit}</p>

			<div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2 text-[11px]">
				<span
					className={`flex items-center gap-1 ${p.showOnWeb ? "text-green-700" : "text-gray-400"}`}
				>
					<LuGlobe /> {p.showOnWeb ? "Tayang di Web Utama" : "Draft"}
				</span>
				{p.cmsAccess && (
					<span className="flex items-center gap-1 text-[#021B3E]">
						<LuShieldCheck /> {p.cmsAccess}
					</span>
				)}
			</div>
		</article>
	);
};

export default OrgNodeCard;
