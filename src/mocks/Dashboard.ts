import type {
	ActivityLogItem,
	DashboardNewsRow,
	DashboardSummary,
} from "@/features/dashboard/types";

export const dashboardSummary: DashboardSummary = {
	news: { total: 8, published: 6, draft: 2, lastPublished: "15 Sep 2026" },
	staff: { total: 18, teachers: 14, tu: 4, allVerified: true },
	classes: { total: 12, vii: 4, viii: 4, ix: 4, needsHomeroom: 1 },
	site: { online: true, version: "v1.0.4", ssl: "Let's Encrypt" },
};

export const dashboardNews: DashboardNewsRow[] = [
	{
		id: "d1",
		title: "Tim Robotik SMP Nusantara Raih Juara 1 Tingkat Provinsi",
		category: "Prestasi",
		date: "15 Sep 2026",
		status: "published",
		author: "Humas Kesiswaan",
		email: "admin.humas@smpnusantara.sch.id",
		thumbnail: "/news1.jfif",
	},
	{
		id: "d2",
		title: "Peringatan Hari Guru Nasional dan Apresiasi Pendidik",
		category: "Kegiatan",
		date: "25 Sep 2026",
		status: "published",
		author: "Tim Kurikulum",
		email: "kurikulum@smpnusantara.sch.id",
		thumbnail: "/news1.jfif",
	},
	{
		id: "d3",
		title: "Jadwal Penilaian Tengah Semester (PTS) Ganjil",
		category: "Pengumuman",
		date: "20 Sep 2026",
		status: "published",
		author: "Tim Kurikulum",
		email: "kurikulum@smpnusantara.sch.id",
	},
	{
		id: "d4",
		title: "Workshop Pengembangan Kurikulum Berbasis Proyek",
		category: "Kegiatan",
		date: "26 Sep 2026",
		status: "draft",
		author: "Humas Kesiswaan",
		email: "admin.humas@smpnusantara.sch.id",
	},
];

export const activityLog: ActivityLogItem[] = [
	{
		id: "l1",
		user: "admin.humas",
		time: "10:45 WIB",
		color: "green",
		message:
			'Menerbitkan artikel "Prestasi Robotik Provinsi" ke halaman publik.',
	},
	{
		id: "l2",
		user: "kurikulum.smp",
		time: "Kemarin, 14:20",
		color: "blue",
		message:
			"Memperbarui alokasi ruang kelas IX B & penetapan wali kelas baru.",
	},
	{
		id: "l3",
		user: "admin.humas",
		time: "23 Sep 2026",
		color: "purple",
		message:
			"Mengunggah foto resmi sambutan Kepala Sekolah Dra. Hj. Sri Rahayu, M.Pd.",
	},
	{
		id: "l4",
		user: "tatausaha.smp",
		time: "20 Sep 2026",
		color: "amber",
		message:
			"Menyesuaikan jam layanan hari Jumat pada profil kontak sekolah.",
	},
];
