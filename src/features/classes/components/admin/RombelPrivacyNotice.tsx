import { LuBookOpen, LuShieldCheck } from "react-icons/lu";

const RombelPrivacyNotice = () => (
	<aside className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#021B3E] p-6 text-white">
		<div className="max-w-3xl">
			<p className="flex items-center gap-2 text-[11px] font-semibold tracking-wider text-[#F4BF46] uppercase">
				<LuShieldCheck /> PRD Kepatuhan & Perlindungan Privasi Data
				Siswa (UU PDP No. 27/2022)
			</p>
			<h2 className="mt-2 font-moda text-xl">
				Batasan Privasi Publikasi Data Rombel
			</h2>
			<p className="mt-2 text-xs leading-relaxed text-white/80">
				Sesuai ketentuan PRD MVP Bagian 3.3 & 8, daftar rombel hanya
				menampilkan{" "}
				<strong>nama rombel, tingkat kelas, dan nama pendidik</strong>{" "}
				yang bertugas sebagai wali kelas. Data individual siswa seperti
				nama lengkap murid, nomor induk (NISN), foto profil siswa,
				absensi harian, maupun nilai rapor{" "}
				<strong>TIDAK DIPUBLIKASIKAN</strong> ke portal web publik demi
				menjaga keamanan dan perlindungan privasi anak di bawah umur.
			</p>
		</div>
		<a
			href="#"
			className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-xs font-semibold hover:bg-white/15"
		>
			<LuBookOpen /> Pelajari Kebijakan Data Akademik
		</a>
	</aside>
);

export default RombelPrivacyNotice;
