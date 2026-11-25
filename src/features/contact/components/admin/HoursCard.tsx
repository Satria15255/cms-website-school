import { LuClock3 } from "react-icons/lu";
import SectionCard from "@/components/admin/SectionCard";
import FormField, { inputClass } from "@/components/admin/FormField";
import type { HoursRow, SectionProps } from "../../settings.types";

const HoursCard = ({ draft, errors, onChange }: SectionProps) => {
	const update = (id: string, patch: Partial<HoursRow>) =>
		onChange(
			"hours",
			draft.hours.map((r) => (r.id === id ? { ...r, ...patch } : r)),
		);

	return (
		<SectionCard
			title="Jam Layanan & Operasional Tata Usaha"
			description="Jadwal resmi resepsionis dan loket pelayanan wali murid."
			icon={<LuClock3 />}
		>
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
				{draft.hours.map((r) => (
					<div
						key={r.id}
						className="flex flex-col gap-2 rounded-lg bg-[#F5F3EE] p-3"
					>
						<div className="flex items-center justify-between gap-2">
							<p className="text-sm font-medium text-[#021B3E]">
								{r.label}
							</p>
							<label className="flex items-center gap-1.5 text-[11px] text-gray-500">
								<input
									type="checkbox"
									checked={r.open}
									onChange={(e) =>
										update(r.id, { open: e.target.checked })
									}
								/>{" "}
								Buka
							</label>
						</div>
						{r.note && (
							<p className="text-[11px] text-gray-500">
								{r.note}
							</p>
						)}
						<input
							aria-label={`Jam layanan ${r.label}`}
							value={r.hours}
							onChange={(e) =>
								update(r.id, { hours: e.target.value })
							}
							aria-invalid={Boolean(errors[`hours:${r.id}`])}
							className={`${inputClass} bg-white`}
						/>
						{errors[`hours:${r.id}`] && (
							<p role="alert" className="text-xs text-red-600">
								{errors[`hours:${r.id}`]}
							</p>
						)}
					</div>
				))}
			</div>
			<div className="mt-4">
				<FormField
					id="c-hours-note"
					label="Catatan Khusus Pelayanan (Akan Tampil di Bawah Jam Buka)"
				>
					<input
						id="c-hours-note"
						value={draft.hoursNote}
						onChange={(e) => onChange("hoursNote", e.target.value)}
						className={inputClass}
					/>
				</FormField>
			</div>
		</SectionCard>
	);
};

export default HoursCard;
