import { Link } from "react-router-dom";
import {
	LuChevronRight,
	LuGlobe,
	LuListChecks,
	LuSquarePen,
} from "react-icons/lu";
import { PATHS } from "@/app/router/paths";

const NewsHeader = () => (
	<header>
		<div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
			<nav aria-label="Breadcrumb" className="flex items-center gap-1">
				<Link to={PATHS.admin.root} className="hover:underline">
					Dashboard
				</Link>
				<LuChevronRight />
				<span>Konten & Publikasi</span>
				<LuChevronRight />
				<span className="font-semibold text-[#021B3E]">
					Kelola Berita
				</span>
			</nav>
			<span className="flex items-center gap-1.5 rounded-full bg-[#EBF1FF] px-3 py-1">
				<LuGlobe /> Portal Sinkron • admin.humas@smpnusantara.sch.id
			</span>
		</div>

		<div className="flex flex-wrap items-start justify-between gap-4">
			<div className="max-w-2xl">
				<span className="rounded bg-amber-200 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-amber-900 uppercase">
					CMS Modul Berita v2.4
				</span>
				<h1 className="mt-3 font-moda text-4xl leading-tight text-[#021B3E]">
					Manajemen Berita & Publikasi Warta
				</h1>
				<p className="mt-2 text-sm text-gray-500">
					Tulis, tinjau, jadwalkan, dan kelola artikel kegiatan,
					pengumuman resmi, serta prestasi siswa untuk portal publik
					SMP Nusantara.
				</p>
			</div>

			<div className="flex rounded-xl bg-[#EBF1FF] p-1 text-sm">
				<span className="flex items-center gap-2 rounded-lg bg-[#021B3E] px-4 py-2.5 font-semibold text-white">
					<LuListChecks /> Daftar Semua Berita
				</span>
				<Link
					to={`${PATHS.admin.news}/new`}
					className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-gray-700 hover:bg-white/60"
				>
					<LuSquarePen /> Tulis / Edit Warta Baru
				</Link>
			</div>
		</div>
	</header>
);

export default NewsHeader;
