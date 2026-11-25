import {
	LuAtSign,
	LuMail,
	LuMessageCircle,
	LuPhone,
	LuRadioTower,
} from "react-icons/lu";
import SectionCard from "@/components/admin/SectionCard";
import FormField, { inputClass } from "@/components/admin/FormField";
import Toggle from "@/components/ui/Toggle";
import type { SectionProps } from "../../settings.types";

const ChannelsCard = ({ draft, errors, onChange }: SectionProps) => (
	<SectionCard
		title="Saluran Komunikasi Langsung"
		description="Tombol interaktif hanya akan aktif di publik bila data diverifikasi (PRD 3.5)."
		icon={<LuRadioTower />}
		badge={{ text: "Kritis PPDB", tone: "amber" }}
	>
		<div className="flex flex-col gap-4">
			<div className="rounded-lg bg-[#F5F3EE] p-4">
				<FormField
					id="c-wa"
					label="Nomor WhatsApp Resmi (Format Internasional)"
					error={errors.whatsapp}
					aside={
						<span className="flex items-center gap-2 text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
							Aktifkan direct chat{" "}
							<Toggle
								checked={draft.whatsappEnabled}
								onChange={(v) => onChange("whatsappEnabled", v)}
								label="Aktifkan direct chat WhatsApp"
							/>
						</span>
					}
				>
					<div className="relative">
						<LuMessageCircle className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
						<input
							id="c-wa"
							value={draft.whatsapp}
							onChange={(e) =>
								onChange("whatsapp", e.target.value)
							}
							aria-invalid={Boolean(errors.whatsapp)}
							className={`${inputClass} bg-white pl-9`}
						/>
					</div>
				</FormField>
				<div className="mt-3">
					<FormField
						id="c-wa-template"
						label="Template Pesan Pembuka Otomatis (Pre-filled URL Text)"
					>
						<input
							id="c-wa-template"
							maxLength={200}
							value={draft.whatsappTemplate}
							onChange={(e) =>
								onChange("whatsappTemplate", e.target.value)
							}
							className={`${inputClass} bg-white`}
						/>
					</FormField>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<FormField
					id="c-phone"
					label="Telepon Kantor / Saluran Hunting"
					error={errors.phone}
					hint={
						draft.phoneNote ||
						"Saluran kabel resmi Tata Usaha & Fax."
					}
				>
					<div className="relative">
						<LuPhone className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
						<input
							id="c-phone"
							value={draft.phone}
							onChange={(e) => onChange("phone", e.target.value)}
							aria-invalid={Boolean(errors.phone)}
							className={`${inputClass} pl-9`}
						/>
					</div>
				</FormField>
				<FormField
					id="c-email"
					label="Surel Utama / Domain Sekolah"
					error={errors.email}
					hint="Menerima pertanyaan umum dari publik."
				>
					<div className="relative">
						<LuMail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
						<input
							id="c-email"
							type="email"
							value={draft.email}
							onChange={(e) => onChange("email", e.target.value)}
							aria-invalid={Boolean(errors.email)}
							className={`${inputClass} pl-9`}
						/>
					</div>
				</FormField>
			</div>
			<FormField
				id="c-email-alt"
				label="Surel Alternatif (Khusus Humas, Kerjasama & Kedinasan)"
				error={errors.emailAlt}
			>
				<div className="relative">
					<LuAtSign className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
					<input
						id="c-email-alt"
						type="email"
						value={draft.emailAlt}
						onChange={(e) => onChange("emailAlt", e.target.value)}
						aria-invalid={Boolean(errors.emailAlt)}
						className={`${inputClass} pl-9`}
					/>
				</div>
			</FormField>
		</div>
	</SectionCard>
);

export default ChannelsCard;
