import { Link } from "react-router-dom";
import {
	LuCirclePlus,
	LuChevronRight,
	LuExternalLink,
	LuRefreshCw,
} from "react-icons/lu";
import { PATHS } from "@/app/router/paths";

const RombelHeader = ({
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
					Kelola Kelas & Rombel
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
			<div className="max-w-3xl">
				<span className="rounded bg-[#EBF1FF] px-2 py-0.5 text-[10px] font-semibold tracking-wider text-[#021B3E] uppercase">
					Modul Akademik & Kurikulum v1.2
				</span>
				<h1 className="mt-3 font-moda text-4xl leading-tight text-[#021B3E]">
					Kelola Rombongan Belajar (Rombel) & Penetapan Wali Kelas
				</h1>
				<p className="mt-2 text-sm text-gray-500">
					Atur pembagian kelas jenjang VII, VIII, dan IX serta
					tetapkan guru penanggung jawab (wali kelas) langsung dari
					direktori tenaga pendidik terintegrasi. Data sinkron
					langsung ke halaman publik{" "}
					<code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">
						{PATHS.classList}
					</code>
					.
				</p>
				<p className="mt-2 text-xs text-gray-400">
					T.A. 2026/2027 • Semester Ganjil
				</p>
			</div>
			<div className="flex gap-3 text-sm">
				<Link
					to={PATHS.classList}
					target="_blank"
					className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-[#021B3E]"
				>
					<LuExternalLink /> Lihat Halaman Kelas Publik
				</Link>
				<button
					onClick={onAdd}
					className="flex items-center gap-2 rounded-lg bg-[#F4BF46] px-4 py-2.5 font-semibold text-[#021B3E]"
				>
					<LuCirclePlus /> Tambah Kelas Baru
				</button>
			</div>
		</div>
	</header>
);

export default RombelHeader;
