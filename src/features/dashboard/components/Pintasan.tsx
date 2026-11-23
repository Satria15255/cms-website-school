import { Link } from "react-router-dom";
import {
	LuSquarePen,
	LuNetwork,
	LuUserCheck,
	LuHeadset,
	LuArrowRight,
} from "react-icons/lu";
import { PATHS } from "@/app/router/paths";

const ITEMS = [
	{
		title: "Tulis Warta Baru",
		desc: "Artikel kegiatan, PTS, atau prestasi siswa dengan foto sampul.",
		cta: "Buka Editor Berita",
		to: `${PATHS.admin.news}/new`,
		icon: LuSquarePen,
		tone: "bg-amber-100 text-amber-700",
	},
	{
		title: "Perbarui Struktur & Pejabat",
		desc: "Atur bagan hierarki kepemimpinan, waka kurikulum, dan komite.",
		cta: "Kelola Hierarki",
		to: PATHS.admin.organization,
		icon: LuNetwork,
		tone: "bg-blue-100 text-blue-700",
	},
	{
		title: "Penetapan Wali Kelas",
		desc: "Tetapkan penanggung jawab rombel jenjang VII, VIII, IX tanpa kode.",
		cta: "Atur Rombel",
		to: PATHS.admin.classes,
		icon: LuUserCheck,
		tone: "bg-slate-100 text-slate-700",
	},
	{
		title: "Informasi Kontak & Layanan",
		desc: "Perbarui alamat kantor, telepon TU, dan WhatsApp resmi humas.",
		cta: "Edit Kontak",
		to: PATHS.admin.settings,
		icon: LuHeadset,
		tone: "bg-slate-100 text-slate-700",
	},
];

const Pintasan = () => (
	<section>
		<div className="mb-4 flex flex-wrap items-end justify-between gap-2">
			<div>
				<h2 className="font-moda text-2xl text-[#021B3E]">
					Pintasan Aksi Cepat
				</h2>
				<p className="text-sm text-gray-500">
					Akses langsung ke alur kerja pembaruan profil dan konten
					sekolah
				</p>
			</div>
			<span className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
				Modul operasional MVP
			</span>
		</div>
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
			{ITEMS.map(({ title, desc, cta, to, icon: Icon, tone }) => (
				<div
					key={title}
					className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
				>
					<div className="flex items-center gap-3">
						<span
							className={`grid size-10 shrink-0 place-items-center rounded-lg text-xl ${tone}`}
						>
							<Icon />
						</span>
						<h3 className="text-sm font-semibold text-[#021B3E]">
							{title}
						</h3>
					</div>
					<p className="mt-3 flex-1 text-xs leading-relaxed text-gray-500">
						{desc}
					</p>
					<Link
						to={to}
						className="mt-4 flex items-center gap-1 text-xs font-semibold text-amber-800 hover:underline"
					>
						{cta} <LuArrowRight />
					</Link>
				</div>
			))}
		</div>
	</section>
);

export default Pintasan;
