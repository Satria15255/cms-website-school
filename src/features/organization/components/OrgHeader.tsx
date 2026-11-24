import { Link } from "react-router-dom";
import {
	LuChevronRight,
	LuCirclePlus,
	LuExternalLink,
	LuRefreshCw,
} from "react-icons/lu";
import { PATHS } from "@/app/router/paths";

const OrgHeader = ({
	loadedAt,
	onAdd,
}: {
	loadedAt: string;
	onAdd: () => void;
}) => (
	<header>
		<div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
			<nav aria-label="Breadcrumb" className="flex items-center gap-1">
				<Link to={PATHS.admin.root} className="hover:underline">
					Dashboard
				</Link>
				<LuChevronRight />
				<span>Akademik & SDM</span>
				<LuChevronRight />
				<span className="font-semibold text-[#021B3E]">
					Struktur Organisasi
				</span>
			</nav>
			<span className="flex items-center gap-2">
				<span className="flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 font-semibold text-green-700">
					<LuRefreshCw /> Portal Sinkron
				</span>
				Dimuat hari ini, {loadedAt}
			</span>
		</div>

		<div className="flex flex-wrap items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
			<div className="max-w-2xl">
				<span className="rounded bg-amber-200 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-amber-900 uppercase">
					Modul Akademik & SDM v1.2
				</span>
				<h1 className="mt-3 font-moda text-4xl leading-tight text-[#021B3E]">
					Kelola Struktur Organisasi & Hierarki Sekolah
				</h1>
				<p className="mt-2 text-sm text-gray-500">
					Atur susunan kepemimpinan, komite sekolah, wakil kepala
					sekolah, koordinator bidang, hingga kepala tata usaha.
					Pejabat dipilih langsung dari direktori Tenaga Pendidik &
					Kependidikan terpusat.
				</p>
			</div>
			<div className="flex flex-wrap gap-3 text-sm">
				<Link
					to={PATHS.aboutUs}
					target="_blank"
					className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-[#021B3E]"
				>
					<LuExternalLink /> Pratinjau Bagan Publik
				</Link>
				<button
					onClick={onAdd}
					className="flex items-center gap-2 rounded-lg bg-[#F4BF46] px-4 py-2.5 font-semibold text-[#021B3E]"
				>
					<LuCirclePlus /> Tambah Jabatan Baru
				</button>
			</div>
		</div>
	</header>
);

export default OrgHeader;
