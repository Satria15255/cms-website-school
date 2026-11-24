import { Link } from "react-router-dom";
import {
	LuChevronRight,
	LuDownload,
	LuRefreshCw,
	LuUserPlus,
} from "react-icons/lu";
import { PATHS } from "@/app/router/paths";

interface Props {
	loadedAt: string;
	onAdd: () => void;
	onExport: () => void;
}

const DirectoryHeader = ({ loadedAt, onAdd, onExport }: Props) => (
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
					Kelola Tenaga Pendidik & Staf
				</span>
			</nav>
			<span className="flex items-center gap-2">
				<span className="flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 font-semibold text-green-700">
					<LuRefreshCw /> Portal Sinkron
				</span>
				Dimuat hari ini, {loadedAt}
			</span>
		</div>

		<div className="flex flex-wrap items-start justify-between gap-4">
			<div className="max-w-2xl">
				<span className="rounded bg-amber-200 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-amber-900 uppercase">
					Modul Akademik & SDM v1.2
				</span>
				<h1 className="mt-3 font-moda text-4xl leading-tight text-[#021B3E]">
					Kelola Tenaga Pendidik & Tenaga Kependidikan
				</h1>
				<p className="mt-2 text-sm text-gray-500">
					Kelola direktori resmi guru pengampu dan staf kependidikan
					SMP Nusantara. Data ini terhubung langsung ke profil publik{" "}
					<em>About Us</em> dan penetapan wali kelas di rombongan
					belajar.
				</p>
			</div>
			<div className="flex flex-wrap gap-3 text-sm">
				<button
					onClick={onExport}
					className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-[#021B3E]"
				>
					<LuDownload /> Ekspor Direktori (CSV)
				</button>
				<button
					onClick={onAdd}
					className="flex items-center gap-2 rounded-lg bg-[#F4BF46] px-4 py-2.5 font-semibold text-[#021B3E]"
				>
					<LuUserPlus /> Tambah Guru / Staf Baru
				</button>
			</div>
		</div>
	</header>
);

export default DirectoryHeader;
