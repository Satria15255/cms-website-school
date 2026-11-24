import { useState } from "react";
import { LuChevronUp, LuRefreshCw, LuSave, LuUserCog } from "react-icons/lu";
import PhotoUpload from "./PhotoUpload";
import { validateInput } from "../directoryUtils";
import type {
	Category,
	DirectoryErrors,
	DirectoryInput,
	DirectoryPerson,
} from "../directory.types";

const EMPTY: DirectoryInput = {
	category: "pendidik",
	name: "",
	nip: "",
	position: "",
	duty: "",
	order: 1,
	homeroom: false,
	consent: false,
	photo: undefined,
};
const input =
	"w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-[#021B3E] focus:outline-2 focus:outline-[#021B3E]";
const label = "mb-1.5 block text-xs font-semibold text-[#021B3E]";
const POSITIONS = [
	"Guru Mata Pelajaran",
	"Wakil Kurikulum",
	"Wakil Kesiswaan",
	"Kepala Sekolah & Pembina Akademik",
	"Kepala Tata Usaha & Administrasi Kepegawaian",
	"Pengelola Perpustakaan & Literasi Digital",
];

interface Props {
	editing: DirectoryPerson | null;
	total: number;
	onSubmit: (
		data: DirectoryInput,
		publish: boolean,
		id?: string,
	) => Promise<void>;
}

// Dipasang dengan `key` dari halaman, jadi state awal dibaca dari `editing` tanpa useEffect.
const DirectoryForm = ({ editing, total, onSubmit }: Props) => {
	const initial: DirectoryInput = editing
		? {
				category: editing.category,
				name: editing.name,
				nip: editing.nip,
				position: editing.position,
				duty: editing.duty,
				order: editing.order,
				homeroom: editing.homeroom,
				consent: editing.consent,
				photo: editing.photo,
			}
		: { ...EMPTY, order: total + 1 };

	const [form, setForm] = useState<DirectoryInput>(initial);
	const [errors, setErrors] = useState<DirectoryErrors>({});
	const [formError, setFormError] = useState("");
	const [open, setOpen] = useState(true);
	const [saving, setSaving] = useState(false);
	const set = <K extends keyof DirectoryInput>(
		k: K,
		v: DirectoryInput[K],
	) => {
		setForm((f) => ({ ...f, [k]: v }));
		setErrors((e) => ({ ...e, [k]: undefined }));
	};

	const submit = async (publish: boolean) => {
		const found = validateInput(form);
		setErrors(found);
		setFormError("");
		if (Object.keys(found).length > 0) return;
		setSaving(true);
		try {
			await onSubmit(form, publish, editing?.id);
		} catch (err) {
			setFormError(
				err instanceof Error
					? err.message
					: "Data gagal disimpan. Coba lagi.",
			);
		} finally {
			setSaving(false);
		}
	};

	const Err = ({ k }: { k: keyof DirectoryInput }) =>
		errors[k] ? (
			<p role="alert" className="mt-1 text-xs text-red-600">
				{errors[k]}
			</p>
		) : null;
	const cards: { key: Category; title: string; desc: string }[] = [
		{
			key: "pendidik",
			title: "Tenaga Pendidik (Guru)",
			desc: "Pengampu mata pelajaran, kurikulum, & pembina siswa",
		},
		{
			key: "kependidikan",
			title: "Tenaga Kependidikan (Staf)",
			desc: "Tata Usaha, pustakawan, laboran, & staf IT",
		},
	];

	return (
		<section
			id="directory-form"
			className="rounded-xl border border-gray-200 bg-white shadow-sm"
		>
			<div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-5">
				<div className="flex items-center gap-3">
					<span className="grid size-10 place-items-center rounded-lg bg-[#021B3E] text-lg text-white">
						<LuUserCog />
					</span>
					<div>
						<h2 className="font-moda text-xl text-[#021B3E]">
							Formulir Pendidik & Staf (
							{editing ? "Mode Edit" : "Mode Tambah"} Data)
						</h2>
						<p className="text-xs text-gray-500">
							{editing
								? `Mengubah: ${editing.name}`
								: "Lengkapi kredensial formal guru atau staf sesuai standar dokumentasi kelembagaan SMP Nusantara."}
						</p>
					</div>
				</div>
				<div className="flex items-center gap-3">
					<span className="flex items-center gap-1.5 rounded bg-amber-200 px-2 py-1 text-[10px] font-semibold tracking-wider text-amber-900 uppercase">
						<LuRefreshCw /> Real-time sinkronisasi
					</span>
					<button
						type="button"
						onClick={() => setOpen(!open)}
						aria-expanded={open}
						aria-label={open ? "Ciutkan formulir" : "Buka formulir"}
						className="p-2"
					>
						<LuChevronUp className={open ? "" : "rotate-180"} />
					</button>
				</div>
			</div>

			{open && (
				<div className="p-5">
					<div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_280px]">
						<div className="flex flex-col gap-4">
							<fieldset>
								<legend className={label}>
									Kategori Penugasan Lembaga *
								</legend>
								<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
									{cards.map((c) => (
										<label
											key={c.key}
											className={`flex cursor-pointer gap-3 rounded-xl p-4 text-xs ${form.category === c.key ? "bg-[#EBF1FF] ring-2 ring-[#021B3E]" : "bg-gray-50"}`}
										>
											<input
												type="radio"
												name="category"
												checked={
													form.category === c.key
												}
												onChange={() => {
													set("category", c.key);
													if (
														c.key === "kependidikan"
													)
														set("homeroom", false);
												}}
												className="mt-0.5"
											/>
											<span>
												<strong className="block text-sm text-[#021B3E]">
													{c.title}
												</strong>
												<span className="text-gray-500">
													{c.desc}
												</span>
											</span>
										</label>
									))}
								</div>
							</fieldset>

							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div>
									<label htmlFor="d-name" className={label}>
										Nama Lengkap & Gelar Akademik *
									</label>
									<input
										id="d-name"
										value={form.name}
										onChange={(e) =>
											set("name", e.target.value)
										}
										aria-invalid={Boolean(errors.name)}
										className={input}
									/>
									<p className="mt-1 text-[11px] text-gray-400">
										Gunakan ejaan baku beserta gelar depan
										dan belakang resmi.
									</p>
									<Err k="name" />
								</div>
								<div>
									<label htmlFor="d-nip" className={label}>
										NIP / NIY / Nomor Registrasi Pegawai
									</label>
									<input
										id="d-nip"
										value={form.nip}
										onChange={(e) =>
											set("nip", e.target.value)
										}
										aria-invalid={Boolean(errors.nip)}
										className={input}
									/>
									<p className="mt-1 text-[11px] text-gray-400">
										Format resmi dinas atau yayasan.
										Bersifat data internal terverifikasi.
									</p>
									<Err k="nip" />
								</div>
								<div>
									<label
										htmlFor="d-position"
										className={label}
									>
										Jabatan Struktural / Peran Utama *
									</label>
									<input
										id="d-position"
										list="d-positions"
										value={form.position}
										onChange={(e) =>
											set("position", e.target.value)
										}
										aria-invalid={Boolean(errors.position)}
										className={input}
									/>
									<datalist id="d-positions">
										{POSITIONS.map((p) => (
											<option key={p} value={p} />
										))}
									</datalist>
									<Err k="position" />
								</div>
								<div>
									<label htmlFor="d-duty" className={label}>
										Mata Pelajaran Diampu / Bidang Tugas *
									</label>
									<input
										id="d-duty"
										value={form.duty}
										onChange={(e) =>
											set("duty", e.target.value)
										}
										aria-invalid={Boolean(errors.duty)}
										className={input}
									/>
									<Err k="duty" />
								</div>
								<div>
									<label htmlFor="d-order" className={label}>
										Urutan Tampil (Sort Order) *
									</label>
									<input
										id="d-order"
										type="number"
										min={1}
										max={99}
										value={form.order}
										onChange={(e) =>
											set("order", Number(e.target.value))
										}
										aria-invalid={Boolean(errors.order)}
										className={input}
									/>
									<p className="mt-1 text-[11px] text-gray-400">
										Angka 1 adalah posisi paling atas di
										halaman About Us.
									</p>
									<Err k="order" />
								</div>
							</div>
						</div>
						<PhotoUpload
							value={form.photo}
							onChange={(url) => set("photo", url)}
						/>
					</div>

					<div className="mt-5 grid grid-cols-1 gap-3 rounded-xl bg-[#EBF1FF] p-4 text-xs md:grid-cols-2">
						<label
							className={`flex items-start gap-3 ${form.category === "kependidikan" ? "opacity-50" : ""}`}
						>
							<input
								type="checkbox"
								checked={form.homeroom}
								disabled={form.category === "kependidikan"}
								onChange={(e) =>
									set("homeroom", e.target.checked)
								}
								className="mt-0.5"
							/>
							<span>
								<strong className="block text-sm text-[#021B3E]">
									Tugaskan sebagai Wali Kelas Rombel
								</strong>
								Aktifkan jika pendidik ini memegang tanggung
								jawab pembinaan kelas di tahun ajaran berjalan.
								Rombel dapat dikaitkan pada modul Kelas &
								Rombel.
							</span>
						</label>
						<label className="flex items-start gap-3">
							<input
								type="checkbox"
								checked={form.consent}
								onChange={(e) =>
									set("consent", e.target.checked)
								}
								className="mt-0.5"
							/>
							<span>
								<strong className="block text-sm text-[#021B3E]">
									Persetujuan Publikasi Profil & Kepatuhan UU
									PDP
								</strong>
								Guru/staf telah menyetujui penayangan nama
								lengkap, gelar akademik, peran, dan foto dinas
								pada direktori umum publik SMP Nusantara.
							</span>
						</label>
					</div>

					{formError && (
						<p role="alert" className="mt-4 text-sm text-red-600">
							{formError}
						</p>
					)}

					<div className="mt-5 flex flex-wrap justify-end gap-3 text-sm">
						<button
							type="button"
							onClick={() => {
								setForm(initial);
								setErrors({});
								setFormError("");
							}}
							className="rounded-lg bg-gray-100 px-4 py-2.5 text-gray-700"
						>
							Reset Formulir
						</button>
						<button
							type="button"
							disabled={saving}
							onClick={() => submit(false)}
							className="rounded-lg border border-gray-300 px-4 py-2.5 text-[#021B3E] disabled:opacity-60"
						>
							Simpan Sebagai Draf
						</button>
						<button
							type="button"
							disabled={saving}
							onClick={() => submit(true)}
							className="flex items-center gap-2 rounded-lg bg-[#021B3E] px-4 py-2.5 font-semibold text-white disabled:opacity-60"
						>
							<LuSave />{" "}
							{saving
								? "Menyimpan…"
								: "Simpan & Perbarui Direktori Publik"}
						</button>
					</div>
				</div>
			)}
		</section>
	);
};

export default DirectoryForm;
