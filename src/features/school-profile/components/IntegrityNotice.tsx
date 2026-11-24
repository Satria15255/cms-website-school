import { LuCheck, LuGavel } from "react-icons/lu";

const IntegrityNotice = ({
	onSave,
	saving,
}: {
	onSave: () => void;
	saving: boolean;
}) => (
	<aside className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#021B3E] p-6 text-white">
		<div className="flex max-w-3xl gap-4">
			<span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white/10 text-xl text-[#F4BF46]">
				<LuGavel />
			</span>
			<div>
				<h2 className="font-moda text-xl">
					Integritas & Kepatuhan Data Kelembagaan
				</h2>
				<p className="mt-2 text-xs leading-relaxed text-white/80">
					Perubahan profil kelembagaan, visi misi, serta susunan
					kepemimpinan mengikat secara administratif pada Surat
					Keputusan (SK) Yayasan & Dinas Pendidikan. Seluruh perubahan
					tercatat pada Log Aktivitas CMS demi menjamin kredibilitas
					dan keabsahan informasi publik.
				</p>
			</div>
		</div>
		<button
			onClick={onSave}
			disabled={saving}
			className="flex items-center gap-2 rounded-lg bg-[#F4BF46] px-5 py-2.5 text-sm font-semibold text-[#021B3E] disabled:opacity-60"
		>
			<LuCheck /> {saving ? "Menyimpan…" : "Simpan Perubahan"}
		</button>
	</aside>
);

export default IntegrityNotice;
