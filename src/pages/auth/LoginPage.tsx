import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { isAuthenticated, login } from "@/features/auth/auth";
import { PATHS } from "@/app/router/paths";

const LoginPage = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	if (isAuthenticated()) return <Navigate to={PATHS.admin.root} replace />;

	const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await login(email, password);
			navigate(PATHS.admin.root, { replace: true });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Gagal masuk. Coba lagi.");
		}
	};

	const field = "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-2 focus:outline-[#021B3E]";

	return (
		<main className="min-h-screen flex items-center justify-center bg-[#EBF1FF] p-4">
			<form onSubmit={handleSubmit} className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg flex flex-col gap-4">
				<h1 className="font-moda text-3xl text-[#021B3E]">Masuk admin</h1>
				<label className="text-sm">
					Email
					<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${field} mt-1`} />
				</label>
				<label className="text-sm">
					Kata sandi
					<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={`${field} mt-1`} />
				</label>
				{error && <p className="text-sm text-red-600">{error}</p>}
				<button className="rounded-lg bg-[#021B3E] py-2.5 text-sm font-semibold text-white hover:bg-[#021B3E]/90">
					Masuk
				</button>
				<p className="text-xs text-gray-400">Mode pengembangan: isi email dan kata sandi apa saja.</p>
			</form>
		</main>
	);
};

export default LoginPage;
