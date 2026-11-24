import { useState } from "react";
import { LuChevronUp, LuInfo, LuNetwork, LuSave } from "react-icons/lu";
import { PATHS } from "@/app/router/paths";
import { LEVELS, initialsOf } from "../orgUtils";
import type { Level, Person, Position, PositionInput } from "../org.types";

const EMPTY: PositionInput = {
	level: "",
	title: "",
	order: 1,
	holder: "",
	unit: "",
	parentId: "",
	showOnWeb: true,
	cmsAccess: false,
};
const input =
	"w-full rounded-lg border border-white/20 bg-white px-3 py-2.5 text-sm text-[#021B3E] focus:outline-2 focus:outline-[#F4BF46]";
const label = "mb-1.5 block text-xs font-semibold text-[#021B3E]";

interface Props {
	editing: Position | null;
	people: Person[];
	positions: Position[];
	onSubmit: (data: PositionInput, id?: string) => Promise<void>;
}

// Dipasang dengan `key` dari halaman, jadi state awal dibaca dari `editing` tanpa useEffect.
const OrgForm = ({ editing, people, positions, onSubmit }: Props) => {
	const nextOrder = (lvl: Level) =>
		Math.max(
			0,
			...positions.filter((p) => p.level === lvl).map((p) => p.order),
		) + 1;

	const [form, setForm] = useState<PositionInput>(
		editing
			? {
					level: editing.level,
					title: editing.title,
					order: editing.order,
					holder:
						editing.holderId ??
						(editing.holderName ? `ext:${editing.holderName}` : ""),
					unit: editing.unit,
					parentId: editing.parentId ?? "",
					showOnWeb: editing.showOnWeb,
					cmsAccess: Boolean(editing.cmsAccess),
				}
			: EMPTY,
	);
	const [open, setOpen] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");
	const set = <K extends keyof PositionInput>(k: K, v: PositionInput[K]) =>
		setForm((f) => ({ ...f, [k]: v }));

	const selected = people.find((p) => p.id === form.holder);
	const external = form.holder.startsWith("ext:") ? form.holder.slice(4) : "";

	const onLevel = (v: string) => {
		const level = v ? (Number(v) as Level) : "";
		setForm((f) => ({
			...f,
			level,
			order: level && !editing ? nextOrder(level) : f.order,
		}));
	};

	const validate = () => {
		if (!form.level || !form.title.trim() || !form.holder)
			return "Lengkapi tingkat hierarki, nama jabatan, dan pejabat.";
		if (!Number.isInteger(form.order) || form.order < 1)
			return "Urutan tampil harus bilangan bulat mulai dari 1.";
		return "";
	};

	const submit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		const msg = validate();
		if (msg) {
			setError(msg);
			return;
		}
		setSaving(true);
		setError("");
		try {
			await onSubmit(form, editing?.id);
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: "Jabatan gagal disimpan. Coba lagi.",
			);
		} finally {
			setSaving(false);
		}
	};

	return (
		<section
			id="org-form"
			className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
		>
			<div className="flex flex-wrap items-center justify-between gap-3 bg-[#021B3E] p-5 text-white">
				<div className="flex items-center gap-3">
					<span className="grid size-10 place-items-center rounded-lg bg-white/10 text-lg text-[#F4BF46]">
						<LuNetwork />
					</span>
					<div>
						<h2 className="font-moda text-xl">
							Formulir Penetapan Jabatan Struktural
						</h2>
						<p className="text-xs text-white/70">
							{editing
								? `Mengubah: ${editing.title}`
								: "Mode Sunting & Tambah Posisi Hierarki Sekolah"}
						</p>
					</div>
				</div>
				<div className="flex items-center gap-3">
					<span className="rounded bg-white/10 px-2 py-1 text-[10px] font-semibold tracking-wider uppercase">
						{editing ? "Mode Edit" : "Form Interaktif"}
					</span>
					<button
						type="button"
						onClick={() => setOpen(!open)}
						aria-expanded={open}
						aria-label={open ? "Ciutkan formulir" : "Buka formulir"}
						className="rounded-lg bg-white/10 p-2"
					>
						<LuChevronUp className={open ? "" : "rotate-180"} />
					</button>
				</div>
			</div>

			{open && (
				<form onSubmit={submit} className="p-5">
					<div className="mb-5 flex gap-3 rounded-lg bg-[#EBF1FF] p-4 text-xs leading-relaxed text-[#021B3E]">
						<LuInfo className="mt-0.5 shrink-0 text-base" />
						<p>
							<strong>Koneksi Data SDM Terpusat:</strong> Pilih
							pejabat dari data Tenaga Pendidik & Kependidikan
							yang telah terdaftar agar foto formal, nama lengkap
							beserta gelar akademik, dan NIP selalu konsisten
							tanpa redundansi input.
						</p>
					</div>

					<div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1.4fr_120px]">
						<div>
							<label htmlFor="o-level" className={label}>
								Tingkat / Eselon Hierarki *
							</label>
							<select
								id="o-level"
								value={form.level}
								onChange={(e) => onLevel(e.target.value)}
								className={`${input} border-gray-300`}
							>
								<option value="">Pilih tingkat...</option>
								{([1, 2, 3, 4] as Level[]).map((l) => (
									<option key={l} value={l}>
										{LEVELS[l].full}
									</option>
								))}
							</select>
						</div>
						<div>
							<label htmlFor="o-title" className={label}>
								Nama Jabatan Resmi *
							</label>
							<input
								id="o-title"
								value={form.title}
								onChange={(e) => set("title", e.target.value)}
								placeholder="Contoh: Wakil Kepala Sekolah Bidang Humas"
								className={`${input} border-gray-300`}
							/>
						</div>
						<div>
							<label htmlFor="o-order" className={label}>
								Urutan Tampil *
							</label>
							<input
								id="o-order"
								type="number"
								min={1}
								value={form.order}
								onChange={(e) =>
									set("order", Number(e.target.value))
								}
								className={`${input} border-gray-300`}
							/>
						</div>

						<div>
							<label htmlFor="o-holder" className={label}>
								Pilih Pejabat (Direktori Guru & Staf) *
							</label>
							<select
								id="o-holder"
								value={form.holder}
								onChange={(e) => set("holder", e.target.value)}
								className={`${input} border-gray-300`}
							>
								<option value="">Pilih pejabat...</option>
								{external && (
									<option value={form.holder}>
										{external} (di luar direktori)
									</option>
								)}
								{people.map((p) => (
									<option key={p.id} value={p.id}>
										{p.name}
									</option>
								))}
							</select>
							{(selected || external) && (
								<div className="mt-3 flex items-center gap-3 rounded-lg border border-gray-200 p-3">
									<span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#021B3E] text-xs font-semibold text-white">
										{selected?.init ?? initialsOf(external)}
									</span>
									<div className="min-w-0 flex-1">
										<p className="truncate text-sm font-medium text-[#021B3E]">
											{selected?.name ?? external}
										</p>
										<p className="truncate text-xs text-gray-500">
											{selected?.role ??
												"Di luar direktori guru & staf"}
										</p>
									</div>
									<span
										className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${selected ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-800"}`}
									>
										{selected ? "AKTIF" : "EKSTERNAL"}
									</span>
								</div>
							)}
						</div>
						<div className="md:col-span-2">
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div>
									<label htmlFor="o-unit" className={label}>
										Unit Kerja / Bidang Koordinasi
									</label>
									<input
										id="o-unit"
										value={form.unit}
										onChange={(e) =>
											set("unit", e.target.value)
										}
										placeholder="Contoh: Kesiswaan, Ekstrakurikuler & Bimbingan"
										className={`${input} border-gray-300`}
									/>
									<p className="mt-1 text-[11px] text-gray-400">
										Ditampilkan sebagai sub-keterangan di
										bagan publik.
									</p>
								</div>
								<div>
									<label htmlFor="o-parent" className={label}>
										Laporan Kepada (Parent Node)
									</label>
									<select
										id="o-parent"
										value={form.parentId}
										onChange={(e) =>
											set("parentId", e.target.value)
										}
										className={`${input} border-gray-300`}
									>
										<option value="">
											Tidak ada (puncak hierarki)
										</option>
										{positions
											.filter((p) => p.id !== editing?.id)
											.map((p) => (
												<option key={p.id} value={p.id}>
													{p.title}
												</option>
											))}
									</select>
								</div>
							</div>
						</div>
					</div>

					<div className="mt-5 flex flex-col gap-3 rounded-lg bg-gray-50 p-4 text-sm">
						<label className="flex items-start gap-3">
							<input
								type="checkbox"
								checked={form.showOnWeb}
								onChange={(e) =>
									set("showOnWeb", e.target.checked)
								}
								className="mt-1"
							/>
							<span>
								Tampilkan di Bagan Struktur Publik{" "}
								<code className="text-xs text-gray-500">
									({PATHS.aboutUs})
								</code>
							</span>
						</label>
						<label className="flex items-start gap-3">
							<input
								type="checkbox"
								checked={form.cmsAccess}
								onChange={(e) =>
									set("cmsAccess", e.target.checked)
								}
								className="mt-1"
							/>
							<span>
								Berikan Hak Akses Login Admin CMS Modul Terkait
								<span className="block text-xs text-gray-500">
									Kebijakan PRD: Posisi struktural tidak
									otomatis memberi hak akses admin CMS. Hak
									akses harus diberikan secara eksplisit oleh
									Super Admin.
								</span>
							</span>
						</label>
					</div>

					{error && (
						<p role="alert" className="mt-4 text-sm text-red-600">
							{error}
						</p>
					)}

					<div className="mt-5 flex justify-end gap-3 text-sm">
						<button
							type="button"
							onClick={() => {
								setForm(EMPTY);
								setError("");
							}}
							className="rounded-lg bg-gray-100 px-4 py-2.5 text-gray-700"
						>
							Reset Form
						</button>
						<button
							disabled={saving}
							className="flex items-center gap-2 rounded-lg bg-[#021B3E] px-4 py-2.5 font-semibold text-white disabled:opacity-60"
						>
							<LuSave />{" "}
							{saving
								? "Menyimpan…"
								: "Simpan & Terapkan ke Bagan"}
						</button>
					</div>
				</form>
			)}
		</section>
	);
};

export default OrgForm;
