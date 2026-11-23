import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
	LuNewspaper,
	LuContact,
	LuDoorOpen,
	LuCircleCheck,
	LuExternalLink,
	LuArrowRight,
} from "react-icons/lu";
import { BsCloudCheck } from "react-icons/bs";
import type { DashboardSummary } from "../types";

const Card = ({
	label,
	icon,
	children,
	footer,
}: {
	label: string;
	icon: ReactNode;
	children: ReactNode;
	footer: ReactNode;
}) => (
	<div className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
		<div className="flex items-start justify-between gap-2">
			<p className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
				{label}
			</p>
			<span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#EBF1FF] text-lg text-[#021B3E]">
				{icon}
			</span>
		</div>
		<div className="mt-3 flex-1">{children}</div>
		<div className="mt-4 text-xs">{footer}</div>
	</div>
);

const Value = ({ children }: { children: ReactNode }) => (
	<p className="font-moda text-3xl text-[#021B3E]">{children}</p>
);

const FooterLink = ({ to, children }: { to: string; children: ReactNode }) => (
	<Link
		to={to}
		className="flex items-center gap-1 font-semibold text-[#021B3E] hover:underline"
	>
		{children} <LuArrowRight />
	</Link>
);

const Dot = ({ className }: { className: string }) => (
	<span className={`inline-block size-2 rounded-full ${className}`} />
);

const MainInfo = ({ data }: { data: DashboardSummary }) => {
	const { news, staff, classes, site } = data;
	return (
		<section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
			<Card
				label="Total berita & warta"
				icon={<LuNewspaper />}
				footer={
					<FooterLink to="/admin/news">Lihat Semua Berita</FooterLink>
				}
			>
				<Value>{news.total} Artikel</Value>
				<p className="mt-2 flex gap-4 text-sm text-gray-600">
					<span className="flex items-center gap-1.5">
						<Dot className="bg-green-500" />
						{news.published} Terbit
					</span>
					<span className="flex items-center gap-1.5">
						<Dot className="bg-amber-500" />
						{news.draft} Draft
					</span>
				</p>
				<p className="mt-3 text-xs text-gray-500">
					Terakhir terbit {news.lastPublished}
				</p>
			</Card>

			<Card
				label="Tenaga pendidik & staf"
				icon={<LuContact />}
				footer={
					<FooterLink to="/admin/teachers">
						Kelola Guru & Staf
					</FooterLink>
				}
			>
				<Value>{staff.total} Orang</Value>
				<p className="mt-2 text-sm text-gray-600">
					{staff.teachers} Guru Pengampu • {staff.tu} Staf TU
				</p>
				{staff.allVerified && (
					<p className="mt-3 flex items-center gap-1.5 text-xs text-green-700">
						<LuCircleCheck /> Semua profil terverifikasi lengkap
					</p>
				)}
			</Card>

			<Card
				label="Rombongan belajar"
				icon={<LuDoorOpen />}
				footer={
					<FooterLink to="/admin/classes">
						Kelola Kelas & Wali
					</FooterLink>
				}
			>
				<Value>{classes.total} Rombel</Value>
				<p className="mt-2 text-sm text-gray-600">
					{classes.vii} Kelas VII • {classes.viii} Kelas VIII •{" "}
					{classes.ix} Kelas IX
				</p>
				{classes.needsHomeroom > 0 && (
					<p className="mt-3 text-xs text-red-700">
						{classes.total - classes.needsHomeroom} rombel aktif,{" "}
						{classes.needsHomeroom} butuh penetapan wali
					</p>
				)}
			</Card>

			<Card
				label="Status publikasi web"
				icon={<BsCloudCheck />}
				footer={
					<div className="flex items-center justify-between">
						<span className="rounded bg-gray-100 px-2 py-1 font-mono text-[11px]">
							{site.version} Terkini
						</span>
						<a
							href="/"
							target="_blank"
							rel="noreferrer"
							className="flex items-center gap-1 font-semibold text-[#021B3E] hover:underline"
						>
							Periksa Web <LuExternalLink />
						</a>
					</div>
				}
			>
				<p className="flex items-center justify-between">
					<span
						className={`font-moda text-2xl ${site.online ? "text-green-700" : "text-red-700"}`}
					>
						{site.online ? "Online & Sinkron" : "Offline"}
					</span>
					<Dot
						className={site.online ? "bg-green-500" : "bg-red-500"}
					/>
				</p>
				<p className="mt-2 text-sm text-gray-600">
					Server Publik Aktif • SSL Aman ({site.ssl})
				</p>
			</Card>
		</section>
	);
};

export default MainInfo;
