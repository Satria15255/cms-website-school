import type { ReactNode } from "react";
import { LuLock, LuShieldCheck, LuStar } from "react-icons/lu";
import HistoryEditor from "./HistoryEditor";
import type { ProfileErrors, SchoolProfile } from "../profile.types";

const input =
	"w-full rounded-lg border border-transparent bg-[#EBF1FF] px-4 py-3 text-sm text-[#021B3E] focus:outline-2 focus:outline-[#021B3E]";
const label =
	"mb-1.5 block text-[11px] font-semibold tracking-wider text-[#021B3E] uppercase";

const Field = ({
	id,
	title,
	error,
	aside,
	children,
}: {
	id: string;
	title: string;
	error?: string;
	aside?: ReactNode;
	children: ReactNode;
}) => (
	<div>
		<div className="flex items-end justify-between gap-2">
			<label htmlFor={id} className={label}>
				{title}
			</label>
			{aside}
		</div>
		{children}
		{error && (
			<p role="alert" className="mt-1 text-xs text-red-600">
				{error}
			</p>
		)}
	</div>
);

interface Props {
	draft: SchoolProfile;
	errors: ProfileErrors;
	onChange: <K extends keyof SchoolProfile>(
		key: K,
		value: SchoolProfile[K],
	) => void;
}

const IdentityForm = ({ draft, errors, onChange }: Props) => (
	<section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
		<div className="mb-6 flex flex-wrap items-start justify-between gap-3">
			<div>
				<h2 className="font-moda text-2xl text-[#021B3E]">
					Identitas Resmi & Informasi Lembaga
				</h2>
				<p className="text-sm text-gray-500">
					Atribut primer sekolah yang digunakan pada skema SEO &
					header publik.
				</p>
			</div>
			<span className="flex items-center gap-1.5 rounded-full bg-[#EBF1FF] px-3 py-1.5 text-[11px] font-semibold tracking-wider text-[#021B3E]">
				<LuLock /> Sinkron Dapodikdasmen
			</span>
		</div>

		<div className="grid grid-cols-1 gap-5 md:grid-cols-3">
			<div className="md:col-span-2">
				<Field
					id="p-name"
					title="Nama resmi sekolah"
					aside={
						<span className="text-[10px] font-semibold tracking-wider text-amber-800 uppercase">
							Terkunci akreditasi Kemendikbudristek
						</span>
					}
				>
					<div className="relative">
						<input
							id="p-name"
							value={draft.name}
							readOnly
							className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-amber-50/50 px-4 py-3 pr-10 text-sm text-[#021B3E]"
						/>
						<LuShieldCheck className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
					</div>
				</Field>
			</div>
			<Field id="p-npsn" title="NPSN / NSS" error={errors.npsn}>
				<input
					id="p-npsn"
					value={draft.npsn}
					onChange={(e) => onChange("npsn", e.target.value)}
					aria-invalid={Boolean(errors.npsn)}
					className={input}
				/>
			</Field>

			<Field
				id="p-level"
				title="Jenjang & status akreditasi"
				error={errors.level}
			>
				<input
					id="p-level"
					value={draft.level}
					onChange={(e) => onChange("level", e.target.value)}
					aria-invalid={Boolean(errors.level)}
					className={input}
				/>
			</Field>
			<Field id="p-founded" title="Tahun berdiri" error={errors.founded}>
				<input
					id="p-founded"
					inputMode="numeric"
					maxLength={4}
					value={draft.founded}
					onChange={(e) => onChange("founded", e.target.value)}
					aria-invalid={Boolean(errors.founded)}
					className={input}
				/>
			</Field>
			<Field
				id="p-curriculum"
				title="Implementasi kurikulum"
				error={errors.curriculum}
			>
				<input
					id="p-curriculum"
					value={draft.curriculum}
					onChange={(e) => onChange("curriculum", e.target.value)}
					aria-invalid={Boolean(errors.curriculum)}
					className={input}
				/>
			</Field>

			<div className="md:col-span-3">
				<Field
					id="p-tagline"
					title="Slogan / tagline sekolah"
					error={errors.tagline}
				>
					<div className="relative">
						<LuStar className="absolute top-1/2 left-4 -translate-y-1/2 text-amber-700" />
						<input
							id="p-tagline"
							value={draft.tagline}
							onChange={(e) =>
								onChange("tagline", e.target.value)
							}
							aria-invalid={Boolean(errors.tagline)}
							className={`${input} pl-11`}
						/>
					</div>
					<p className="mt-1 text-xs text-gray-500">
						Tagline ini disematkan di banner beranda, footer, serta
						kop dokumen resmi publik.
					</p>
				</Field>
			</div>

			<div className="md:col-span-3">
				<HistoryEditor
					value={draft.history}
					error={errors.history}
					onChange={(v) => onChange("history", v)}
				/>
			</div>
		</div>
	</section>
);

export default IdentityForm;
