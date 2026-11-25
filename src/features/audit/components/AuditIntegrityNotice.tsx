import { LuFingerprint, LuShieldCheck } from "react-icons/lu";

export interface VerifyResult {
	valid: boolean;
	checked: number;
	brokenAt?: string;
}

interface Props {
	verifying: boolean;
	result: VerifyResult | null;
	onVerify: () => void;
}

const AuditIntegrityNotice = ({ verifying, result, onVerify }: Props) => (
	<aside className="rounded-xl bg-[#021B3E] p-6 text-white">
		<div className="flex flex-wrap items-center justify-between gap-4">
			<div className="flex max-w-3xl gap-4">
				<span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white/10 text-xl text-[#F4BF46]">
					<LuShieldCheck />
				</span>
				<div>
					<h2 className="font-moda text-xl">
						Jaminan Integritas Audit Log & Kepatuhan Regulasi
						Kearsipan Digital
					</h2>
					<p className="mt-2 text-xs leading-relaxed text-white/80">
						Seluruh catatan aktivitas sistem bersifat{" "}
						<strong>Append-Only</strong> (hanya dapat direkam, tidak
						dapat diubah atau dihapus oleh pihak mana pun). Log
						dienkripsi otomatis secara berkala untuk keperluan
						akreditasi sekolah, audit eksternal yayasan, dan
						pertanggungjawaban publik sesuai amanat UU No. 11/2008
						(ITE) dan Permendikbudristek.
					</p>
				</div>
			</div>
			<button
				onClick={onVerify}
				disabled={verifying}
				className="flex items-center gap-2 rounded-lg bg-[#F4BF46] px-4 py-2.5 text-sm font-semibold text-[#021B3E] disabled:opacity-60"
			>
				<LuFingerprint />{" "}
				{verifying ? "Memverifikasi…" : "Verifikasi Hash Kriptografis"}
			</button>
		</div>
		{result && (
			<p
				role="status"
				className={`mt-4 rounded-lg px-4 py-2.5 text-xs ${result.valid ? "bg-green-500/15 text-green-200" : "bg-red-500/20 text-red-200"}`}
			>
				{result.valid
					? `Rantai hash valid: ${result.checked.toLocaleString("id-ID")} entri terverifikasi (SHA-256). Tidak ada entri yang diubah.`
					: `Rantai hash TIDAK valid. Entri ${result.brokenAt} dan seluruh entri setelahnya tidak dapat dipercaya.`}
			</p>
		)}
	</aside>
);

export default AuditIntegrityNotice;
