import type { SchoolProfile } from "@/features/school-profile/profile.types";

// Teks sejarah, visi, misi, dan sambutan disalin dari halaman publik About Us.
// NPSN, tahun berdiri, dan status akreditasi belum ada di project: ini nilai contoh dari desain, ganti dengan data asli.
export const schoolProfile: SchoolProfile = {
	name: "SMP Nusantara",
	npsn: "20104829 / 20101010",
	level: "Sekolah Menengah Pertama (SMP) • Terakreditasi A",
	founded: "1998",
	curriculum: "Kurikulum Merdeka Mandiri Berbagi",
	tagline: "Unggul dalam Prestasi, Berkarakter dalam Budipekerti",
	history:
		"Didirikan dengan tekad untuk menyediakan sarana pendidikan menengah berkualitas tinggi yang terjangkau dan inklusif, SMP Nusantara telah menempuh perjalanan panjang dalam menorehkan prestasi dan melahirkan lulusan berintegritas.\n\nKami meyakini bahwa jenjang Sekolah Menengah Pertama (SMP) adalah fase pembentukan fondasi kognitif, emosional, dan sosial yang sangat krusial bagi remaja awal. Melalui pengajaran kontekstual, bimbingan personal berpusat pada murid, serta fasilitas modern yang ramah lingkungan, sekolah kami menghadirkan ruang tumbuh yang dinamis dan berdaya saing global.",
	visi: "Menjadi lembaga pendidikan menengah pertama unggulan yang mencetak generasi bertakwa, berakhlak mulia, berprestasi global, dan berakar pada kearifan budaya bangsa.",
	misi: [
		"Penyelenggaraan kurikulum adaptif serta penguatan Profil Pelajar Pancasila yang aplikatif dan berbasis pemecahan masalah nyata.",
		"Pembinaan akhlak karimah, etika pergaulan, dan kapasitas kepemimpinan mandiri melalui kegiatan kokurikuler terpadu.",
		"Penyediaan fasilitas belajar sains, teknologi informatika, dan literasi multimedia yang aman, modern, dan inklusif.",
		"Membangun kolaborasi sinergis dan berkelanjutan antara para pendidik, komite orang tua, dan pemangku kepentingan masyarakat.",
	],
	welcome: {
		name: "Dra. Hj. Sri Rahayu, M.Pd.",
		title: "Kepala Sekolah SMP Nusantara",
		published: true,
	},
};
