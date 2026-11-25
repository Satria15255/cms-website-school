export interface HoursRow {
	id: string;
	label: string;
	days: number[]; // 0 = Minggu ... 6 = Sabtu
	hours: string;
	note?: string;
	open: boolean;
}

export type SocialId = "instagram" | "youtube" | "facebook";

export interface SocialLink {
	id: SocialId;
	label: string;
	url: string;
	enabled: boolean;
}

export interface ContactSettings {
	address: string;
	landmark: string;
	postalCode: string;
	mapInput: string; // URL Google Maps atau "lat, lng"
	showMap: boolean;
	whatsapp: string;
	whatsappEnabled: boolean;
	whatsappTemplate: string;
	phone: string;
	phoneNote: string;
	email: string;
	emailAlt: string;
	hours: HoursRow[];
	hoursNote: string;
	social: SocialLink[];
}

export type SettingsErrors = Record<string, string>; // kunci: nama field, "hours:<id>", "social:<id>"

export interface SectionProps {
	draft: ContactSettings;
	errors: SettingsErrors;
	onChange: <K extends keyof ContactSettings>(
		key: K,
		value: ContactSettings[K],
	) => void;
}
