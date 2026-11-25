import {
	LuMail,
	LuMapPin,
	LuMessageSquare,
	LuPhone,
	LuTv,
} from "react-icons/lu";
import {
	getContactStats,
	parseCoordinates,
	whatsappLink,
} from "../../settingsUtils";
import type { ContactSettings } from "../../settings.types";

// Cermin kartu kontak di halaman publik, ikut berubah saat form diedit (belum disimpan).
const LivePreview = ({ draft }: { draft: ContactSettings }) => {
	const stats = getContactStats(draft);
	const coords = parseCoordinates(draft.mapInput);
	const waOn = draft.whatsappEnabled && draft.whatsapp.trim() !== "";

	return (
		<section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
			<div className="flex items-center justify-between gap-2 bg-[#021B3E] p-4 text-white">
				<div className="flex items-center gap-3">
					<LuTv className="text-lg text-[#F4BF46]" />
					<div>
						<h2 className="text-sm font-semibold">
							Pratinjau Tampilan Publik
						</h2>
						<p className="text-[11px] text-white/70">
							Rendering aktual pada /contact portal siswa & wali
						</p>
					</div>
				</div>
				<span className="rounded bg-[#F4BF46] px-2 py-0.5 text-[10px] font-semibold tracking-wider text-[#021B3E] uppercase">
					Live mirror
				</span>
			</div>

			<div className="p-4">
				<div className="rounded-xl border border-gray-200 p-4 shadow-sm">
					<div className="flex items-center justify-between gap-2">
						<div className="flex items-center gap-3">
							<span className="grid size-9 place-items-center rounded-full bg-[#021B3E] text-xs font-semibold text-white">
								SN
							</span>
							<div>
								<p className="text-sm font-semibold text-[#021B3E]">
									SMP Nusantara
								</p>
								<p className="text-[11px] text-gray-500">
									Pusat Informasi & Humas
								</p>
							</div>
						</div>
						<span
							className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${stats.openToday ? "bg-[#EBF1FF] text-[#021B3E]" : "bg-red-100 text-red-700"}`}
						>
							{stats.openToday
								? "Buka Hari Ini"
								: "Tutup Hari Ini"}
						</span>
					</div>

					{draft.showMap && (
						<div className="relative mt-3 overflow-hidden rounded-lg">
							<img
								src="/heroImage.png"
								alt=""
								className="h-36 w-full object-cover"
							/>
							<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
								<p className="flex items-center gap-1 text-xs font-semibold">
									<LuMapPin />{" "}
									{draft.address
										.split(",")
										.slice(1, 3)
										.join(",")
										.trim() || "Lokasi sekolah"}
								</p>
								<p className="text-[10px] text-white/80">
									Koordinat •{" "}
									{coords
										? `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`
										: "belum valid"}
								</p>
							</div>
						</div>
					)}

					<div className="mt-3 flex flex-col gap-2 text-xs">
						{waOn ? (
							<a
								href={whatsappLink(
									draft.whatsapp,
									draft.whatsappTemplate,
								)}
								target="_blank"
								rel="noreferrer"
								className="flex items-center justify-center gap-2 rounded-lg bg-[#F4BF46] py-2.5 font-semibold text-[#021B3E]"
							>
								<LuMessageSquare /> Hubungi via WhatsApp Resmi
							</a>
						) : (
							<span className="flex items-center justify-center gap-2 rounded-lg bg-gray-100 py-2.5 text-gray-400">
								<LuMessageSquare /> WhatsApp tidak aktif
							</span>
						)}
						<div className="grid grid-cols-2 gap-2">
							<a
								href={`tel:${draft.phone.replace(/[^\d+]/g, "")}`}
								className="flex items-center justify-center gap-1.5 rounded-lg bg-[#EBF1FF] py-2 text-[#021B3E]"
							>
								<LuPhone />{" "}
								<span className="truncate">
									{draft.phone || "-"}
								</span>
							</a>
							<a
								href={`mailto:${draft.email}`}
								className="flex items-center justify-center gap-1.5 rounded-lg bg-[#EBF1FF] py-2 text-[#021B3E]"
							>
								<LuMail /> Kirim Surel
							</a>
						</div>
					</div>

					<div className="mt-3 rounded-lg bg-[#EBF1FF] p-3 text-[11px] leading-relaxed text-[#021B3E]">
						<p className="font-semibold">Alamat Surat Kedinasan:</p>
						<p>{draft.address || "-"}</p>
						{draft.landmark && (
							<p className="mt-1 font-medium text-amber-800">
								Patokan: {draft.landmark}
							</p>
						)}
					</div>
				</div>
				<p className="mt-3 text-center text-[11px] text-gray-400">
					Sistem akan memvalidasi cache CDN setiap kali tombol simpan
					ditekan.
				</p>
			</div>
		</section>
	);
};

export default LivePreview;
