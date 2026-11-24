import { LuShield, LuShieldCheck } from "react-icons/lu";

const DirectoryPrivacyNotice = () => (
	<aside className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#021B3E] p-6 text-white">
		<div className="flex max-w-3xl gap-4">
			<span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white/10 text-xl text-[#F4BF46]">
				<LuShieldCheck />
			</span>
			<div>
				<h2 className="flex flex-wrap items-center gap-3 font-moda text-xl">
					Kepatuhan PRD & Perlindungan Privasi Pendidik (UU PDP No.
					27/2022)
					<span className="rounded bg-[#F4BF46] px-2 py-0.5 font-sans text-[10px] font-semibold tracking-wider text-[#021B3E] uppercase">
						Terkontrol
					</span>
				</h2>
				<p className="mt-2 text-xs leading-relaxed text-white/80">
					Hanya data institusional berupa{" "}
					<strong className="text-[#F4BF46]">
						nama resmi, gelar akademik, peran struktural, dan foto
						dinas
					</strong>{" "}
					yang diizinkan yang ditayangkan pada portal publik{" "}
					<em>/about</em>. Informasi pribadi sensitif seperti nomor
					induk kependudukan (NIK), alamat rumah, nomor seluler
					pribadi, dan catatan evaluasi kinerja dilindungi secara
					ketat dalam server terenkripsi dan tidak dipublikasikan ke
					publik.
				</p>
			</div>
		</div>
		<a
			href="#"
			className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-xs font-semibold hover:bg-white/15"
		>
			<LuShield /> Kebijakan Privasi CMS
		</a>
	</aside>
);

export default DirectoryPrivacyNotice;
