import { LuMap, LuMapPin } from "react-icons/lu";
import SectionCard from "@/components/admin/SectionCard";
import FormField, { inputClass } from "@/components/admin/FormField";
import Toggle from "@/components/ui/Toggle";
import { parseCoordinates } from "../../settingsUtils";
import type { SectionProps } from "../../settings.types";

const AddressCard = ({ draft, errors, onChange }: SectionProps) => {
	const coords = parseCoordinates(draft.mapInput);
	return (
		<SectionCard
			title="Alamat Fisik & Kampus Sekolah"
			description="Lokasi geo-spasial resmi untuk administrasi surat dan navigasi tamu."
			icon={<LuMapPin />}
			badge={{ text: "Wajib", tone: "navy" }}
		>
			<div className="flex flex-col gap-4">
				<FormField
					id="c-address"
					label="Alamat Lengkap Sekolah (Format Kedinasan)"
					error={errors.address}
				>
					<textarea
						id="c-address"
						rows={3}
						value={draft.address}
						onChange={(e) => onChange("address", e.target.value)}
						aria-invalid={Boolean(errors.address)}
						className={`${inputClass} resize-y`}
					/>
				</FormField>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_140px]">
					<FormField
						id="c-landmark"
						label="Patokan / Landmark Sekitar"
					>
						<input
							id="c-landmark"
							value={draft.landmark}
							onChange={(e) =>
								onChange("landmark", e.target.value)
							}
							className={inputClass}
						/>
					</FormField>
					<FormField
						id="c-postal"
						label="Kode Pos Wilayah"
						error={errors.postalCode}
					>
						<input
							id="c-postal"
							inputMode="numeric"
							maxLength={5}
							value={draft.postalCode}
							onChange={(e) =>
								onChange("postalCode", e.target.value)
							}
							aria-invalid={Boolean(errors.postalCode)}
							className={inputClass}
						/>
					</FormField>
				</div>
				<FormField
					id="c-map"
					label="Google Maps Embed URL / Kode Koordinat Latitude & Longitude"
					error={errors.mapInput}
					hint={
						coords
							? `Koordinat aktif: Lat ${coords.lat.toFixed(4)}, Long ${coords.lng.toFixed(4)}`
							: "Koordinat belum terbaca."
					}
				>
					<input
						id="c-map"
						value={draft.mapInput}
						onChange={(e) => onChange("mapInput", e.target.value)}
						aria-invalid={Boolean(errors.mapInput)}
						className={inputClass}
					/>
				</FormField>
				<div className="flex items-center justify-between gap-4 rounded-lg bg-[#EBF1FF] p-4">
					<div className="flex items-center gap-3 text-xs text-[#021B3E]">
						<LuMap className="shrink-0 text-lg" />
						<span>
							Tampilkan Peta Interaktif di Website Publik
							<span className="block text-gray-500">
								Pengunjung dapat mengklik tombol "Buka Petunjuk
								Arah" menuju Google Maps.
							</span>
						</span>
					</div>
					<Toggle
						checked={draft.showMap}
						onChange={(v) => onChange("showMap", v)}
						label="Tampilkan peta interaktif"
					/>
				</div>
			</div>
		</SectionCard>
	);
};

export default AddressCard;
