// PLACEHOLDER: belum ada backend. Ganti isi file ini dengan panggilan API (Axios) nanti.
const KEY = "admin_token";

export const isAuthenticated = (): boolean => {
	try {
		return Boolean(localStorage.getItem(KEY));
	} catch {
		return false;
	}
};

export const login = async (email: string, password: string): Promise<void> => {
	if (!email || !password) throw new Error("Email dan kata sandi wajib diisi.");
	localStorage.setItem(KEY, "dev-token");
};

export const logout = (): void => localStorage.removeItem(KEY);
