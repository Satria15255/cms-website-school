import { useState } from "react";
import { LuChevronUp, LuInfo, LuSettings2, LuUserCheck } from "react-icons/lu";
import { MAX_CAPACITY, nameKey } from "../../rombelUtils";
import type {
	Rombel,
	RombelInput,
	TeacherOption,
	Tingkat,
} from "../../rombel.types";

const LEVELS: Tingkat[] = ["VII", "VIII", "IX"];
const EMPTY: RombelInput = {
	tingkat: "",
	name: "",
	room: "",
	wali: "",
	capacity: MAX_CAPACITY,
	status: "active",
};
const input =
	"w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:outline-2 focus:outline-[#021B3E]";
const label = "mb-1.5 block text-xs font-semibold text-[#021B3E]";

interface Props {
	editing: Rombel | null;
	teachers: TeacherOption[];
	onSubmit: (data: RombelInput, id?: string) => Promise<void>;
}

// Dipasang dengan `key` dari halaman, jadi state awal dibaca dari `editing` tanpa useEffect.
const RombelForm = ({ editing, teachers, onSubmit }: Props) => {
	const names = teachers.map((t) => t.name);
	const match = editing
		? names.find((n) => nameKey(n) === nameKey(editing.wali))
		: undefined;
	if (editing?.wali && !match) names.push(editing.wali); // wali lama yang belum ada di direktori tetap bisa dipilih

	const [form, setForm] = useState<RombelInput>(
		editing
			? {
					tingkat: editing.tingkat,
					name: editing.name,
					room: editing.room,
					wali: match ?? editing.wali,
					capacity: editing.capacity,
					status: editing.status,
				}
			: EMPTY,
	);
	const [open, setOpen] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");
	const set = <K extends keyof RombelInput>(k: K, v: RombelInput[K]) =>
		setForm((f) => ({ ...f, [k]: v }));

	const validate = () => {
		if (!form.tingkat || !form.name.trim() || !form.wali)
			return "Lengkapi jenjang, nama rombel, dan wali kelas.";
		if (form.capacity < 1 || form.capacity > MAX_CAPACITY)
			return `Kapasitas siswa harus 1 sampai ${MAX_CAPACITY}.`;
		if (editing && form.capacity < editing.enrolled)
			return `Kapasitas tidak boleh di bawah jumlah siswa saat ini (${editing.enrolled}).`;
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
					: "Rombel gagal disimpan. Coba lagi.",
			);
		} finally {
			setSaving(false);
		}
	};

	return (
		<section
			id="rombel-form"
			className="rounded-xl border border-gray-200 bg-white shadow-sm"
		>
			<div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-5">
				<div className="flex items-center gap-3">
					<span className="grid size-10 place-items-center rounded-lg bg-[#021B3E] text-lg text-white">
						<LuSettings2 />
					</span>
					<div>
						<h2 className="flex items-center gap-2 font-moda text-xl text-[#021B3E]">
							Formulir Penetapan Rombel & Wali Kelas
							<span className="rounded bg-amber-200 px-1.5 py-0.5 font-sans text-[10px] font-semibold tracking-wider text-amber-900 uppercase">
								{editing ? "Mode Edit" : "Form Interaktif"}
							</span>
						</h2>
						<p className="text-xs text-gray-500">
							{editing
								? `Mengubah ${editing.name}`
								: "Mode Tambah & Pembaharuan Rombel Semester Berjalan"}
						</p>
					</div>
				</div>
				<button
					type="button"
					onClick={() => setOpen(!open)}
					aria-expanded={open}
					className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-xs"
				>
					<LuChevronUp className={open ? "" : "rotate-180"} />{" "}
					{open ? "Ciutkan Formulir" : "Buka Formulir"}
				</button>
			</div>

			{open && (
				<form onSubmit={submit} className="p-5">
					<div className="mb-5 flex gap-3 rounded-lg bg-[#EBF1FF] p-4 text-xs leading-relaxed text-[#021B3E]">
						<LuInfo className="mt-0.5 shrink-0 text-base" />
						<p>
							<strong>
								Koneksi Direktori Guru Terintegrasi:
							</strong>{" "}
							Nama wali kelas wajib dipilih langsung dari daftar
							Tenaga Pendidik aktif yang terdaftar di database
							CMS. Hal ini mencegah data duplikat, kesalahan
							penulisan nama, atau ketidaksesuaian gelar akademik
							pada tampilan profil publik.
						</p>
					</div>

					<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
						<div>
							<label htmlFor="f-level" className={label}>
								Jenjang / Tingkat Kelas *
							</label>
							<select
								id="f-level"
								value={form.tingkat}
								onChange={(e) =>
									set(
										"tingkat",
										e.target.value as Tingkat | "",
									)
								}
								className={input}
							>
								<option value="">Pilih Tingkat Kelas...</option>
								{LEVELS.map((l) => (
									<option key={l} value={l}>
										Kelas {l}
									</option>
								))}
							</select>
						</div>
						<div>
							<label htmlFor="f-name" className={label}>
								Nama Rombel / Kode Kelas *
							</label>
							<input
								id="f-name"
								value={form.name}
								onChange={(e) => set("name", e.target.value)}
								placeholder="Contoh: Kelas VII-E"
								className={input}
							/>
						</div>
						<div>
							<label htmlFor="f-room" className={label}>
								Lokasi Ruang / Gedung
							</label>
							<input
								id="f-room"
								value={form.room}
								onChange={(e) => set("room", e.target.value)}
								placeholder="Contoh: A - Lt.2 (R.205)"
								className={input}
							/>
						</div>
						<div className="md:col-span-2">
							<label htmlFor="f-wali" className={label}>
								Pilih Wali Kelas (Dari Direktori Pendidik) *
							</label>
							<select
								id="f-wali"
								value={form.wali}
								onChange={(e) => set("wali", e.target.value)}
								className={input}
							>
								<option value="">
									Pilih Guru Penanggung Jawab / Wali...
								</option>
								{names.map((n) => (
									<option key={n} value={n}>
										{n}
									</option>
								))}
							</select>
						</div>
						<div>
							<label htmlFor="f-cap" className={label}>
								Kapasitas Siswa
							</label>
							<input
								id="f-cap"
								type="number"
								min={1}
								max={MAX_CAPACITY}
								value={form.capacity}
								onChange={(e) =>
									set("capacity", Number(e.target.value))
								}
								className={input}
							/>
							<p className="mt-1 text-[11px] text-gray-400">
								Standar pemerintah: maks {MAX_CAPACITY}{" "}
								siswa/rombel
							</p>
						</div>
					</div>

					{error && (
						<p role="alert" className="mt-4 text-sm text-red-600">
							{error}
						</p>
					)}

					<div className="mt-5 flex flex-wrap items-center justify-between gap-4">
						<div className="flex items-center gap-5 text-xs">
							<label className="flex items-center gap-2">
								<input
									type="radio"
									name="status"
									checked={form.status === "active"}
									onChange={() => set("status", "active")}
								/>{" "}
								Aktif Berjalan (T.A. 2026/2027)
							</label>
							<label className="flex items-center gap-2 text-gray-500">
								<input
									type="radio"
									name="status"
									checked={form.status === "archived"}
									onChange={() => set("status", "archived")}
								/>{" "}
								Arsipkan Rombel
							</label>
						</div>
						<div className="flex gap-3 text-sm">
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
								<LuUserCheck />{" "}
								{saving
									? "Menyimpan…"
									: "Simpan & Sinkronkan Rombel"}
							</button>
						</div>
					</div>
				</form>
			)}
		</section>
	);
};

export default RombelForm;
