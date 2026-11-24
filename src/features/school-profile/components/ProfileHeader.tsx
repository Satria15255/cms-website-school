import { Link } from "react-router-dom";
import {
	LuChevronRight,
	LuExternalLink,
	LuRefreshCw,
	LuSave,
} from "react-icons/lu";
import { PATHS } from "@/app/router/paths";

const ProfileHeader = ({
	onSave,
	saving,
	dirty,
}: {
	onSave: () => void;
	saving: boolean;
	dirty: boolean;
}) => (
	<header>
		<nav
			aria-label="Breadcrumb"
			className="mb-4 flex items-center gap-1 text-xs text-gray-500"
		>
			<Link to={PATHS.admin.root} className="hover:underline">
				Dashboard
			</Link>
			<LuChevronRight />
			<span>Konten & Publikasi</span>
			<LuChevronRight />
			<span className="font-semibold text-[#021B3E]">
				Kelola Profil Sekolah
			</span>
		</nav>

		<div className="flex flex-wrap items-start justify-between gap-4">
			<div className="max-w-2xl">
				<div className="flex flex-wrap gap-2">
					<span className="rounded-full bg-[#EBF1FF] px-3 py-1 text-[10px] font-semibold tracking-wider text-[#021B3E] uppercase">
						• Modul Profil Lembaga v1.2
					</span>
					<span className="flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-[10px] font-semibold tracking-wider text-amber-900 uppercase">
						<LuRefreshCw /> Portal sinkron live ke {PATHS.aboutUs} &
						/
					</span>
				</div>
				<h1 className="mt-3 font-moda text-4xl leading-tight text-[#021B3E]">
					Kelola Profil Sekolah, Visi-Misi & Sambutan
				</h1>
				<p className="mt-2 text-sm text-gray-500">
					Perbarui identitas kelembagaan, visi misi, sejarah singkat,
					nilai utama, serta sambutan kepala sekolah yang tampil pada
					halaman Beranda dan About Us website publik.
				</p>
			</div>
			<div className="flex flex-wrap items-center gap-3 text-sm">
				<Link
					to={PATHS.aboutUs}
					target="_blank"
					className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-[#021B3E]"
				>
					<LuExternalLink /> Pratinjau Halaman Publik
				</Link>
				<button
					onClick={onSave}
					disabled={saving}
					className="flex items-center gap-2 rounded-lg bg-[#F4BF46] px-4 py-2.5 font-semibold text-[#021B3E] disabled:opacity-60"
				>
					<LuSave />{" "}
					{saving ? "Menyimpan…" : "Simpan Semua Pembaruan"}
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

export default ProfileHeader;
