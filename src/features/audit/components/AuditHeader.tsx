import { Link } from "react-router-dom";
import {
	LuChevronRight,
	LuDownload,
	LuFileArchive,
	LuShieldCheck,
} from "react-icons/lu";
import { PATHS } from "@/app/router/paths";

interface Props {
	email: string;
	session: string | null;
	onExportZip: () => void;
	onExportCsv: () => void;
}

const AuditHeader = ({ email, session, onExportZip, onExportCsv }: Props) => (
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
					Log Aktivitas & Audit Trail
				</span>
			</nav>
			<div className="flex flex-col items-end gap-1">
				<span className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-[10px] font-semibold tracking-wider text-green-800 uppercase">
					<span className="size-1.5 rounded-full bg-green-500" />{" "}
					Audit logging aktif — kepatuhan ISO 27001 & UU PDP
				</span>
				<span className="flex items-center gap-1.5 rounded-full bg-[#EBF1FF] px-3 py-1 text-[11px] text-[#021B3E]">
					<LuShieldCheck /> {email}
					{session && ` • Sesi #${session}`}
				</span>
			</div>
		</div>

		<div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
			<span className="rounded bg-amber-100 px-2 py-1 text-[10px] font-semibold tracking-wider text-amber-900 uppercase">
				Modul keamanan & akuntabilitas v1.2
			</span>
			<h1 className="mt-3 max-w-2xl font-moda text-4xl leading-tight text-[#021B3E]">
				Log Aktivitas Sistem & Audit Trail Perubahan Data
			</h1>
			<p className="mt-2 max-w-2xl text-sm text-gray-500">
				Rekam jejak seluruh mutasi data, pembaruan konten berita,
				modifikasi profil lembaga, pergantian wali kelas, serta riwayat
				autentikasi sesi pengelola secara transparan dan terenkripsi
				append-only.
			</p>
			<div className="mt-5 flex flex-wrap justify-end gap-3 text-sm">
				<button
					onClick={onExportZip}
					className="flex items-center gap-2 rounded-lg bg-[#EBF1FF] px-4 py-2.5 text-[#021B3E]"
				>
					<LuFileArchive /> Unduh Berkas Arsip (.ZIP)
				</button>
				<button
					onClick={onExportCsv}
					className="flex items-center gap-2 rounded-lg bg-[#F4BF46] px-4 py-2.5 font-semibold text-[#021B3E]"
				>
					<LuDownload /> Ekspor Audit Log (CSV)
				</button>
			</div>
		</div>
	</header>
);

export default AuditHeader;
