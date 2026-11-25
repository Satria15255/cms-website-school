import type { ContactSettings, SettingsErrors } from "./settings.types";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Menerima "lat, lng" atau URL Google Maps yang memuat pasangan koordinat (?q=lat,lng atau @lat,lng).
export const parseCoordinates = (
	input: string,
): { lat: number; lng: number } | null => {
	const m = input.match(/(-?\d{1,3}(?:\.\d+)?)\s*,\s*(-?\d{1,3}(?:\.\d+)?)/);
	if (!m) return null;
	const lat = Number(m[1]);
	const lng = Number(m[2]);
	return Math.abs(lat) <= 90 && Math.abs(lng) <= 180 ? { lat, lng } : null;
};

export const whatsappLink = (phone: string, template: string) => {
	const digits = phone.replace(/\D/g, "");
	const intl = digits.startsWith("0") ? `62${digits.slice(1)}` : digits;
	return `https://wa.me/${intl}?text=${encodeURIComponent(template)}`;
};

export const todayRow = (s: ContactSettings, date = new Date()) =>
	s.hours.find((r) => r.days.includes(date.getDay()));

export const validateSettings = (s: ContactSettings): SettingsErrors => {
	const e: SettingsErrors = {};
	if (!s.address.trim()) e.address = "Alamat lengkap sekolah wajib diisi.";
	if (!/^\d{5}$/.test(s.postalCode.trim()))
		e.postalCode = "Kode pos harus 5 digit.";
	if (s.showMap && !parseCoordinates(s.mapInput))
		e.mapInput =
			"Koordinat tidak terbaca. Isi 'lat, lng' atau tempel URL Google Maps yang memuat koordinat.";
	if (s.whatsappEnabled && !/^\+62[\d\s-]{8,15}$/.test(s.whatsapp.trim()))
		e.whatsapp = "Gunakan format internasional, contoh +62 812-3456-7890.";
	if (s.phone.trim() && !/^[+\d\s()./-]{6,}$/.test(s.phone.trim()))
		e.phone = "Nomor telepon tidak valid.";
	if (!EMAIL.test(s.email.trim())) e.email = "Surel utama tidak valid.";
	if (s.emailAlt.trim() && !EMAIL.test(s.emailAlt.trim()))
		e.emailAlt = "Surel alternatif tidak valid.";
	for (const r of s.hours)
		if (r.open && !r.hours.trim())
			e[`hours:${r.id}`] = "Isi jam layanan atau tandai tutup.";
	for (const l of s.social) {
		if (l.enabled && !/^https:\/\/\S+$/.test(l.url.trim()))
			e[`social:${l.id}`] =
				"URL harus diawali https:// agar bisa ditampilkan.";
	}
	return e;
};

export const getContactStats = (s: ContactSettings) => {
	const coords = parseCoordinates(s.mapInput);
	const channels: [string, boolean][] = [
		[
			"WA",
			s.whatsappEnabled && /^\+62[\d\s-]{8,15}$/.test(s.whatsapp.trim()),
		],
		["Telepon", s.phone.trim() !== ""],
		["Email", s.email.trim() !== ""],
		["Jam", s.hours.some((r) => r.open)],
		["Peta", s.showMap && coords !== null],
	];
	const active = channels.filter(([, on]) => on);
	const firstOpen = s.hours.find((r) => r.open);
	const today = todayRow(s);
	return {
		activeCount: active.length,
		activeLabels: active.map(([l]) => l).join(", "),
		mainHours: firstOpen?.hours.replace(/\s*WIB$/i, "") ?? "-",
		openToday: Boolean(today?.open),
		todayLabel: today?.label ?? "",
		mapStatus: !s.showMap
			? "Nonaktif"
			: coords
				? "Terverifikasi"
				: "Belum Valid",
		coordsText: coords
			? `Lat ${coords.lat.toFixed(4)}, Long ${coords.lng.toFixed(4)}`
			: "Koordinat belum terbaca",
	};
};
