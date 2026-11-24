export const PATHS = {
	home: "/",
	aboutUs: "/about-us",
	classList: "/class-list",
	news: "/news",
	contact: "/contact",
	admin: {
		root: "/admin" /*dashbaord*/,
		login: "/admin/login" /*login portal*/,
		news: "/admin/news" /* news */,
		teachers: "/admin/teachers-staff",
		organization: "/admin/organization",
		classes: "/admin/classes",
		profile: "/admin/profil-sekolah",
		settings: "/admin/settings",
		logs: "/admin/logs",
	},
} as const;
