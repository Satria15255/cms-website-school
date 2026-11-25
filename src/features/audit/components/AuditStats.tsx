import type { ReactNode } from "react";
import {
	LuDatabase,
	LuListChecks,
	LuLock,
	LuShieldCheck,
} from "react-icons/lu";
import { RETENTION_DAYS, type getAuditStats } from "../auditUtils";

type Stats = ReturnType<typeof getAuditStats>;
export type Integrity = "checking" | "valid" | "broken";

const Card = ({
	label,
	icon,
	children,
}: {
	label: string;
	icon: ReactNode;
	children: ReactNode;
}) => (
	<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
		<div className="flex items-start justify-between gap-2">
			<p className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
				{label}
			</p>
			<span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#EBF1FF] text-lg text-[#021B3E]">
				{icon}
			</span>
		</div>
		<div className="mt-3">{children}</div>
	</div>
);

const INTEGRITY_TEXT: Record<Integrity, { text: string; tone: string }> = {
	checking: { text: "Memverifikasi hash SHA-256…", tone: "text-gray-500" },
	valid: { text: "Hash SHA-256 Terverifikasi", tone: "text-green-700" },
	broken: { text: "Rantai hash tidak valid!", tone: "text-red-700" },
};

const AuditStats = ({
	stats,
	integrity,
}: {
	stats: Stats;
	integrity: Integrity;
}) => (
	<section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
		<Card label="Total entri log" icon={<LuDatabase />}>
			<p className="font-moda text-3xl text-[#021B3E]">
				{stats.total.toLocaleString("id-ID")}
			</p>
			<p className="mt-1 text-xs text-gray-500">
				Perekaman otomatis {stats.spanDays} hari terakhir
			</p>
		</Card>
		<Card label="Mutasi konten & data" icon={<LuListChecks />}>
			<p className="font-moda text-3xl text-[#021B3E]">
				{stats.mutations.toLocaleString("id-ID")}
			</p>
			<p className="mt-1 text-xs text-gray-500">
				{stats.mutationModules || "-"}
			</p>
		</Card>
		<Card label="Status akses & login" icon={<LuShieldCheck />}>
			<p
				className={`font-moda text-3xl ${stats.suspicious > 0 ? "text-red-700" : "text-green-700"}`}
			>
				{stats.validPercent}% Sah
			</p>
			<p className="mt-1 text-xs text-gray-500">
				{stats.suspicious} percobaan anomali / suspicious IP
			</p>
		</Card>
		<Card label="Retensi & integritas" icon={<LuLock />}>
			<p className="font-moda text-3xl text-[#021B3E]">
				{RETENTION_DAYS} Hari
			</p>
			<p className={`mt-1 text-xs ${INTEGRITY_TEXT[integrity].tone}`}>
				{INTEGRITY_TEXT[integrity].text}
			</p>
		</Card>
	</section>
);

export default AuditStats;
