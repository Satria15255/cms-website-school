import type { ContactSettings } from "@/features/contact/settings.types";

// Nilai disalin dari halaman Kontak publik (mocks/Contact.tsx dan pages/public/contact/section/Address.tsx).
// URL media sosial belum ada di project: nilai di bawah hanya contoh, ganti dengan akun asli.
export const contactSettings: ContactSettings = {
	address:
		"Jl. Pendidikan Karakter No. 12, Kelurahan Cilandak, Jakarta Selatan, DKI Jakarta 10110",
	landmark: "MRT Stasiun Fatmawati (10 menit) & TransJakarta Koridor 6/7",
	postalCode: "10110",
	mapInput: "-6.48220915595435, 106.72857206193093",
	showMap: true,
	whatsapp: "+62 812-3456-7890",
	whatsappEnabled: true,
	whatsappTemplate:
		"Halo Admin SMP Nusantara, saya ingin menanyakan informasi seputar...",
	phone: "+62 21 555-0199",
	phoneNote: "Ext. 101 (Tata Usaha) & Ext. 102 (Kesiswaan)",
	email: "info@smpnusantara.sch.id",
	emailAlt: "humas@smpnusantara.sch.id",
	hours: [
		{
			id: "h1",
			label: "Senin - Kamis",
			days: [1, 2, 3, 4],
			hours: "07.00 - 15.30 WIB",
			open: true,
		},
		{
			id: "h2",
			label: "Jumat",
			days: [5],
			hours: "07.00 - 15.30 WIB",
			note: "Jadwal Sholat Jumat: 11.30 - 13.00",
			open: true,
		},
		{
			id: "h3",
			label: "Sabtu",
			days: [6],
			hours: "08.00 - 12.00 WIB",
			open: true,
		},
		{
			id: "h4",
			label: "Minggu & Libur Nasional",
			days: [0],
			hours: "Libur Operasional",
			open: false,
		},
	],
	hoursNote:
		"Layanan tatap muka diliburkan pada tanggal merah dan cuti bersama.",
	social: [
		{
			id: "instagram",
			label: "Instagram Official",
			url: "https://instagram.com/smpnusantara",
			enabled: true,
		},
		{
			id: "youtube",
			label: "YouTube Channel",
			url: "https://youtube.com/@smpnusantara",
			enabled: true,
		},
		{
			id: "facebook",
			label: "Facebook Official Page",
			url: "https://facebook.com/smpnusantara",
			enabled: true,
		},
	],
};
