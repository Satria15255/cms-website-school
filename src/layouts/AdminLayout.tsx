import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
	LuLayoutDashboard,
	LuNewspaper,
	LuSchool,
	LuUsers,
	LuBriefcase,
	LuMessageSquare,
	LuSettings,
	LuMenu,
	LuLogOut,
	LuX,
} from "react-icons/lu";
import { logout } from "@/features/auth/auth";
import { PATHS } from "@/app/router/paths";

const NAV = [
	{
		to: PATHS.admin.root,
		label: "Dashboard",
		icon: LuLayoutDashboard,
		end: true,
	},
	{ to: PATHS.admin.news, label: "Berita", icon: LuNewspaper },
	{ to: PATHS.admin.classes, label: "Kelas", icon: LuSchool },
	{ to: PATHS.admin.teachers, label: "Guru", icon: LuUsers },
	{ to: PATHS.admin.staff, label: "Tenaga kependidikan", icon: LuBriefcase },
	{ to: PATHS.admin.messages, label: "Pesan masuk", icon: LuMessageSquare },
	{ to: PATHS.admin.settings, label: "Pengaturan", icon: LuSettings },
];

const AdminLayout = () => {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate(PATHS.admin.login, { replace: true });
	};

	return (
		<div className="min-h-screen bg-[#EBF1FF] lg:flex">
			{open && (
				<div
					className="fixed inset-0 z-30 bg-black/40 lg:hidden"
					onClick={() => setOpen(false)}
				/>
			)}

			<aside
				className={`fixed inset-y-0 left-0 max-h-screen z-40 w-64 bg-[#021B3E] text-white flex flex-col transition-transform lg:static lg:translate-x-0 ${
					open ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
					<span className="font-moda text-xl">Admin Sekolah</span>
					<button
						className="lg:hidden"
						aria-label="Tutup menu"
						onClick={() => setOpen(false)}
					>
						<LuX />
					</button>
				</div>
				<nav className="flex-1 p-3 flex flex-col gap-1">
					{NAV.map(({ to, label, icon: Icon, end }) => (
						<NavLink
							key={to}
							to={to}
							end={end}
							onClick={() => setOpen(false)}
							className={({ isActive }) =>
								`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm border-l-4 ${
									isActive
										? "bg-white/10 border-[#F4BF46] text-[#F4BF46]"
										: "border-transparent text-white/80 hover:bg-white/5"
								}`
							}
						>
							<Icon /> {label}
						</NavLink>
					))}
				</nav>
			</aside>

			<div className="flex-1 max-h-screen overflow-y-auto flex flex-col">
				<header className="flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3 lg:px-8">
					<button
						className="lg:hidden text-xl"
						aria-label="Buka menu"
						onClick={() => setOpen(true)}
					>
						<LuMenu />
					</button>
					<span className="hidden lg:block text-sm text-gray-500">
						SMP Nusantara
					</span>
					<button
						onClick={handleLogout}
						className="flex items-center gap-2 text-sm text-[#021B3E] font-semibold"
					>
						<LuLogOut /> Keluar
					</button>
				</header>
				<main className="flex-1 p-4 lg:p-8">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default AdminLayout;
