import { Link } from "react-router-dom";
import {
	LuChevronRight,
	LuClock,
	LuExternalLink,
	LuSave,
} from "react-icons/lu";
import { PATHS } from "@/app/router/paths";

interface Props {
	lastSaved: string | null;
	dirty: boolean;
	saving: boolean;
	onSave: () => void;
}

const ContactSettingsHeader = ({ lastSaved, dirty, saving, onSave }: Props) => (
	<header className="flex flex-col gap-5">
		<div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
			<nav aria-label="Breadcrumb" className="flex items-center gap-1">
				<Link to={PATHS.admin.root} className="hover:underline">
					Dashboard
				</Link>
				<LuChevronRight />
				<span>Pengaturan</span>
				<LuChevronRight />
				<span className="font-semibold text-[#021B3E]">
					Pengaturan Kontak & Saluran Komunikasi
				</span>
			</nav>
			<div className="flex flex-col items-end gap-1">
				<span className="rounded-full bg-[#EBF1FF] px-3 py-1 text-[10px] font-semibold tracking-wider text-[#021B3E] uppercase">
					• Portal sinkron live ke {PATHS.contact}
				</span>
				<span className="flex items-center gap-1">
					<LuClock />{" "}
					{lastSaved
						? `Terakhir diperbarui: Hari ini, ${lastSaved}`
						: "Belum ada perubahan di sesi ini"}
				</span>
			</div>
		</div>

		<div className="flex flex-wrap items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
			<div className="max-w-xl">
				<p className="text-[11px] font-semibold tracking-wider text-amber-800 uppercase">
					Manajemen identitas & interaksi
				</p>
				<h1 className="mt-2 font-moda text-4xl leading-tight text-[#021B3E]">
					Pengaturan Kontak & Kanal Layanan Publik
				</h1>
				<p className="mt-2 text-sm text-gray-500">
					Kelola alamat fisik, nomor WhatsApp layanan, sambungan
					telepon, surel kedinasan, jam operasional tata usaha, serta
					tautan peta dan media sosial resmi yang tayang pada portal
					publik <strong>{PATHS.contact}</strong> dan footer website.
				</p>
			</div>
			<div className="flex flex-wrap items-center gap-3 text-sm">
				<Link
					to={PATHS.contact}
					target="_blank"
					className="flex items-center gap-2 rounded-lg bg-[#EBF1FF] px-4 py-2.5 text-[#021B3E]"
				>
					<LuExternalLink /> Pratinjau Halaman Kontak
				</Link>
				<button
					onClick={onSave}
					disabled={saving}
					className="flex items-center gap-2 rounded-lg bg-[#F4BF46] px-4 py-2.5 font-semibold text-[#021B3E] disabled:opacity-60"
				>
					<LuSave />{" "}
					{saving ? "Menyimpan…" : "Simpan Semua Perubahan"}
					{dirty && !saving && (
						<span
							className="size-2 rounded-full bg-red-600"
							aria-label="Ada perubahan belum disimpan"
						/>
					)}
				</button>
			</div>
		</div>
	</header>
);

export default ContactSettingsHeader;
