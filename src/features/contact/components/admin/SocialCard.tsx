import type { ReactNode } from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { LuGlobe, LuShieldCheck } from "react-icons/lu";
import SectionCard from "@/components/admin/SectionCard";
import Toggle from "@/components/ui/Toggle";
import type { SectionProps, SocialId } from "../../settings.types";

const ICONS: Record<SocialId, ReactNode> = {
	instagram: <FaInstagram />,
	youtube: <FaYoutube />,
	facebook: <FaFacebook />,
};

const SocialCard = ({ draft, errors, onChange }: SectionProps) => {
	const update = (id: SocialId, patch: { url?: string; enabled?: boolean }) =>
		onChange(
			"social",
			draft.social.map((l) => (l.id === id ? { ...l, ...patch } : l)),
		);

	return (
		<SectionCard
			title="Media Sosial Resmi Sekolah"
			description="Hanya akun terverifikasi yang akan otomatis tampil pada footer publik."
			icon={<LuGlobe />}
			badge={{ text: "Terverifikasi", tone: "navy" }}
		>
			<div className="flex flex-col gap-3">
				{draft.social.map((l) => (
					<div key={l.id}>
						<div className="flex items-center gap-3 rounded-lg bg-[#F5F3EE] p-3">
							<span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#EBF1FF] text-lg text-[#021B3E]">
								{ICONS[l.id]}
							</span>
							<div className="min-w-0 flex-1">
								<label
									htmlFor={`c-social-${l.id}`}
									className="block text-[10px] font-semibold tracking-wider text-gray-500 uppercase"
								>
									{l.label}
								</label>
								<input
									id={`c-social-${l.id}`}
									value={l.url}
									onChange={(e) =>
										update(l.id, { url: e.target.value })
									}
									aria-invalid={Boolean(
										errors[`social:${l.id}`],
									)}
									className="w-full bg-transparent text-sm text-[#021B3E] outline-none"
								/>
							</div>
							<Toggle
								checked={l.enabled}
								onChange={(v) => update(l.id, { enabled: v })}
								label={`Tampilkan ${l.label} di footer`}
							/>
						</div>
						{errors[`social:${l.id}`] && (
							<p
								role="alert"
								className="mt-1 text-xs text-red-600"
							>
								{errors[`social:${l.id}`]}
							</p>
						)}
					</div>
				))}
			</div>
			<p className="mt-3 flex items-center gap-1.5 text-[11px] text-gray-400">
				<LuShieldCheck /> Akun yang dimatikan tidak muncul di footer
				publik.
			</p>
		</SectionCard>
	);
};

export default SocialCard;
