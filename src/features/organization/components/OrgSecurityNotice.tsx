import { Link } from "react-router-dom";
import { LuArrowRight, LuLock, LuShieldCheck } from "react-icons/lu";
import { PATHS } from "@/app/router/paths";

const OrgSecurityNotice = () => (
	<aside className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#021B3E] p-6 text-white">
		<div className="flex max-w-3xl gap-4">
			<span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white/10 text-xl text-[#F4BF46]">
				<LuShieldCheck />
			</span>
			<div>
				<p className="text-[11px] font-semibold tracking-wider text-[#F4BF46] uppercase">
					PRD Keamanan & Tata Kelola Hak Akses
				</p>
				<h2 className="mt-1 font-moda text-xl">
					Prinsip Keamanan Akun & Penetapan Jabatan
				</h2>
				<p className="mt-2 text-xs leading-relaxed text-white/80">
					Penetapan posisi struktural murni bertujuan untuk menyajikan
					profil kepemimpinan sekolah kepada publik dan orang tua
					murid secara transparan. Hak akses login CMS dikelola secara
					terpisah dengan prinsip <em>least privilege</em> untuk
					menjaga integritas data akademik dan mencegah eskalasi
					wewenang yang tidak disengaja.
				</p>
				<p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-white/70">
					<span className="flex items-center gap-1">
						<LuLock /> Enkripsi Sesi Dua Faktor Aktif
					</span>
					<span className="flex items-center gap-1">
						<LuShieldCheck /> Setiap pergeseran posisi dicatat di
						Log Aktivitas Admin
					</span>
				</p>
			</div>
		</div>
		<Link
			to={PATHS.admin.logs}
			className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-xs font-semibold hover:bg-white/15"
		>
			Lihat Log Audit <LuArrowRight />
		</Link>
	</aside>
);

export default OrgSecurityNotice;
