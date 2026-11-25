import { NewsList } from "@/mocks/NewsList";
import { ClassDetails } from "@/mocks/ClassList";
import { Teacher } from "@/mocks/TenagaPendidik";
import { createSlug } from "@/utils/createSlug";
import { cleanName } from "@/features/organization/orgUtils";
import type {
	AuditAction,
	AuditModule,
	AuditSeed,
	AuditUser,
} from "@/features/audit/audit.types";

export const AuditUsers: AuditUser[] = [
	{
		id: "admin.humas",
		name: "Humas & Kurikulum SMP",
		role: "Super Admin",
		init: "HU",
	},
	{
		id: "kurikulum.smp",
		name: "Admin Kurikulum",
		role: "Staf Akademik",
		init: "AK",
	},
	{
		id: "tatausaha.smp",
		name: "Admin Tata Usaha",
		role: "Staf Administrasi",
		init: "TU",
	},
];

const MIN = 1;
const HOUR = 60;
const DAY = 1440;
const clean = (s: string) => s.replace(/\s+/g, " ").trim();

const seed = (
	minutesAgo: number,
	userId: string,
	module: AuditModule,
	action: AuditAction,
	summary: string,
	entity: string,
	target: string,
	extra: Partial<AuditSeed> = {},
): AuditSeed => ({
	minutesAgo,
	userId,
	module,
	action,
	summary,
	entity,
	target,
	...extra,
});

const login = (minutesAgo: number, userId: string, session: string) =>
	seed(
		minutesAgo,
		userId,
		"auth",
		"LOGIN",
		"Login berhasil via IP terdaftar melalui Chrome (MFA token valid).",
		`Lokasi: Jakarta, ID • Sesi: #${session}`,
		userId,
		{ session },
	);

// Turunan dari data yang sudah ada: berita, rombel, dan direktori guru.
const news = NewsList.map((n, i) =>
	seed(
		DAY * (1 + i * 2) + (i % 5) * 37,
		"admin.humas",
		"berita",
		"PUBLISH",
		`Menerbitkan warta "${n.title}" ke halaman publik.`,
		`ID Entitas: ${n.id.toUpperCase()} • Status: Published`,
		`${n.id.toUpperCase()} (${n.title.slice(0, 28)}…)`,
		{
			before: { status_publikasi: "draft", kategori: n.category },
			after: {
				status_publikasi: "published",
				kategori: n.category,
				is_headline: i === 0,
			},
			attachment: {
				name: `${createSlug(n.title)}.jpg`,
				src: "/news1.jfif",
			},
		},
	),
);

const rombel = ClassDetails.flatMap((c, ci) =>
	c.subClass.map((s, si) => {
		const letter = clean(s.kelas).split(" ").pop();
		const name = `Kelas ${c.symbol}-${letter}`;
		return seed(
			DAY * (20 + ci * 2 + (si % 2)) + si * 53,
			"kurikulum.smp",
			"kelas",
			"UPDATE",
			`Menetapkan ${clean(s.walikel)} sebagai Wali Kelas ${name} (T.A. 2026/2027).`,
			`ID Entitas: #RBL-${c.symbol}-${letter} • Kapasitas: ${s.member} Siswa`,
			`RBL-${c.symbol}-${letter} (${name})`,
			{
				before: { wali_kelas: null, status_rombel: "active" },
				after: {
					wali_kelas: clean(s.walikel),
					status_rombel: "active",
				},
			},
		);
	}),
);

const teachers = Teacher.slice(0, 3).map((t, i) =>
	seed(
		DAY * (27 + i) + 90,
		"admin.humas",
		"pendidik",
		"CREATE",
		`Menambahkan Tenaga Pendidik ${cleanName(t.name)} ke direktori guru.`,
		`ID Entitas: #${t.id} • Mapel: ${t.mapel}`,
		`${t.id} (${cleanName(t.name)})`,
		{
			after: {
				nama: cleanName(t.name),
				mapel: t.mapel,
				status_tayang: "published",
			},
		},
	),
);

export const AuditSeeds: AuditSeed[] = [
	login(10 * MIN, "admin.humas", "SS-8829A"),
	seed(
		25 * MIN,
		"admin.humas",
		"profil",
		"UPDATE",
		"Memperbarui Slogan Sekolah pada Modul Profil Publik (About).",
		"Target: Block #slogan • Halaman: /about-us",
		"PRF-SLOGAN (Slogan Sekolah)",
		{
			before: { tagline: "Unggul & Berkarakter" },
			after: {
				tagline: "Unggul dalam Prestasi, Berkarakter dalam Budipekerti",
			},
		},
	),
	seed(
		2 * HOUR,
		"tatausaha.smp",
		"kontak",
		"UPDATE",
		"Menyesuaikan jam layanan hari Jumat pada profil kontak sekolah.",
		"Target: Jadwal Layanan • Halaman: /contact",
		"KTK-JAM (Jam Layanan Jumat)",
		{
			before: { jam_jumat: "07.00 - 11.30 WIB" },
			after: { jam_jumat: "07.00 - 15.30 WIB" },
		},
	),
	login(3 * HOUR, "tatausaha.smp", "SS-7714C"),
	seed(
		5 * HOUR,
		"admin.humas",
		"struktur",
		"CREATE",
		"Menambahkan pejabat baru pada Struktur: Wakil Kepala Sekolah Bidang Kurikulum (Drs. Bambang Sudiro, M.Si).",
		"Parent Node: #POS-01 • Urutan: 1",
		"POS-03 (Waka Kurikulum)",
		{
			after: {
				jabatan: "Wakil Kepala Sekolah Bidang Kurikulum",
				pejabat: "TP-01",
				level: 3,
				tayang: true,
			},
		},
	),
	seed(
		5 * HOUR + 12,
		"admin.humas",
		"struktur",
		"CREATE",
		"Menambahkan pejabat baru pada Struktur: Wakil Kepala Sekolah Bidang Kesiswaan (Siti Nurhaliza).",
		"Parent Node: #POS-01 • Urutan: 2",
		"POS-04 (Waka Kesiswaan)",
		{
			after: {
				jabatan: "Wakil Kepala Sekolah Bidang Kesiswaan",
				pejabat: "TP-02",
				level: 3,
				tayang: true,
			},
		},
	),
	seed(
		6 * HOUR,
		"admin.humas",
		"struktur",
		"CREATE",
		"Menambahkan pejabat baru pada Struktur: Kepala Tata Usaha (Tri Wahyuni, A.Md).",
		"Parent Node: #POS-01 • Urutan: 3",
		"POS-05 (Kepala Tata Usaha)",
		{
			after: {
				jabatan: "Kepala Tata Usaha",
				pejabat: "TK-01",
				level: 3,
				tayang: true,
			},
		},
	),
	seed(
		DAY + 2 * HOUR,
		"admin.humas",
		"profil",
		"UPDATE",
		"Memperbarui Ringkasan Sejarah Lembaga pada Modul Profil Publik (About).",
		"Target: Block #sejarah-lembaga • Paragraf 1-2",
		"PRF-SEJARAH (Ringkasan Sejarah)",
		{ before: { jumlah_kata: 61 }, after: { jumlah_kata: 74 } },
	),
	login(DAY + 4 * HOUR, "kurikulum.smp", "SS-6120B"),
	seed(
		2 * DAY,
		"admin.humas",
		"profil",
		"PUBLISH",
		"Menayangkan Sambutan Kepala Sekolah ke halaman Beranda dan About Us.",
		"Target: Block #sambutan • Status: Published",
		"PRF-SAMBUTAN (Sambutan Kepala Sekolah)",
		{
			before: { sambutan: "draft" },
			after: {
				sambutan: "published",
				penandatangan: "Dra. Hj. Sri Rahayu, M.Pd.",
			},
		},
	),
	seed(
		3 * DAY,
		"admin.humas",
		"kontak",
		"UPDATE",
		"Memperbarui nomor WhatsApp resmi pada kanal layanan publik.",
		"Target: Kanal WhatsApp • Halaman: /contact",
		"KTK-WA (WhatsApp Resmi)",
		{
			before: { whatsapp: "+62 812-3456-7000" },
			after: { whatsapp: "+62 812-3456-7890" },
		},
	),
	login(5 * DAY, "admin.humas", "SS-5503D"),
	login(9 * DAY, "tatausaha.smp", "SS-4417A"),
	login(14 * DAY, "admin.humas", "SS-3290F"),
	login(21 * DAY, "kurikulum.smp", "SS-2108E"),
	seed(
		29 * DAY,
		"kurikulum.smp",
		"kelas",
		"ARCHIVE",
		"Mengarsipkan rombel Kelas IX-D (T.A. 2025/2026) setelah kelulusan.",
		"ID Entitas: #RBL-IX-D-2025 • Kapasitas: 30 Siswa",
		"RBL-IX-D-2025 (Kelas IX-D lama)",
		{
			before: { status_rombel: "active" },
			after: { status_rombel: "archived" },
		},
	),
	...news,
	...rombel,
	...teachers,
];
