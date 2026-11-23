import { LuShieldCheck, LuExternalLink } from "react-icons/lu";

const PrivacyNotice = () => (
	<aside className="rounded-xl bg-[#021B3E] p-5 text-white">
		<div className="flex items-center gap-3">
			<span className="grid size-9 place-items-center rounded-lg bg-white/10 text-lg text-[#F4BF46]">
				<LuShieldCheck />
			</span>
			<h2 className="text-sm font-semibold">
				Pengingat Privasi & Kepatuhan PRD
			</h2>
		</div>
		<p className="mt-3 text-xs leading-relaxed text-white/80">
			Sesuai batasan PRD MVP (Bagian 3.3 & 8),{" "}
			<strong>
				nama individual siswa, NISN, nilai rapor, dan kontak pribadi
				siswa
			</strong>{" "}
			tidak dipublikasikan ke portal umum demi perlindungan privasi anak
			dan kepatuhan hukum perlindungan data.
		</p>
		<a
			href="#"
			className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold tracking-wider uppercase hover:underline"
		>
			Baca pedoman konten sekolah <LuExternalLink />
		</a>
	</aside>
);

export default PrivacyNotice;
