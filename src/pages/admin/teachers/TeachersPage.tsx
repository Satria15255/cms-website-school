import { useCallback, useEffect, useMemo, useState } from "react";
import DirectoryHeader from "@/features/teachers/components/DirectoryHeader";
import DirectoryStats from "@/features/teachers/components/DirectoryStats";
import DirectoryForm from "@/features/teachers/components/DirectoryForm";
import DirectoryTable from "@/features/teachers/components/DirectoryTable";
import DirectoryPrivacyNotice from "@/features/teachers/components/DirectoryPrivacyNotice";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { directoryService } from "@/features/teachers/services/directory.service";
import { classService } from "@/features/classes/services/class.service";
import { nameKey } from "@/features/classes/rombelUtils";
import { getDirectoryStats } from "@/features/teachers/directoryUtils";
import { exportDirectoryCsv } from "@/features/teachers/exportCsv";
import type {
	DirectoryInput,
	DirectoryPerson,
} from "@/features/teachers/directory.types";
import type { Rombel } from "@/features/classes/rombel.types";

const scrollToForm = () =>
	requestAnimationFrame(() =>
		document
			.getElementById("directory-form")
			?.scrollIntoView({ behavior: "smooth", block: "start" }),
	);

const TeachersPage = () => {
	const [people, setPeople] = useState<DirectoryPerson[]>([]);
	const [rombels, setRombels] = useState<Rombel[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [notice, setNotice] = useState("");
	const [loadedAt, setLoadedAt] = useState("");
	const [editing, setEditing] = useState<DirectoryPerson | null>(null);
	const [formVersion, setFormVersion] = useState(0);
	const [toDelete, setToDelete] = useState<DirectoryPerson | null>(null);
	const [deleting, setDeleting] = useState(false);

	const load = useCallback(async () => {
		try {
			const [p, r] = await Promise.all([
				directoryService.getAll(),
				classService.getAll(),
			]);
			setPeople(p);
			setRombels(r);
			setLoadedAt(
				new Date().toLocaleTimeString("id-ID", {
					hour: "2-digit",
					minute: "2-digit",
				}),
			);
			setError("");
		} catch {
			setError("Direktori gagal dimuat. Muat ulang halaman.");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		load();
	}, [load]);

	// id orang -> nama rombel aktif yang diwalikan (dicocokkan lewat nama, sama seperti halaman Kelas & Rombel)
	const waliMap = useMemo(() => {
		const map = new Map<string, string[]>();
		const active = rombels.filter((r) => r.status === "active" && r.wali);
		for (const person of people) {
			const mine = active
				.filter((r) => nameKey(r.wali) === nameKey(person.name))
				.map((r) => r.name);
			if (mine.length > 0) map.set(person.id, mine);
		}
		return map;
	}, [people, rombels]);

	const stats = useMemo(() => {
		const teacherKeys = new Set(
			people
				.filter((p) => p.category === "pendidik")
				.map((p) => nameKey(p.name)),
		);
		const active = rombels.filter((r) => r.status === "active");
		return getDirectoryStats(
			people,
			waliMap,
			active.length,
			active.filter((r) => r.wali && teacherKeys.has(nameKey(r.wali)))
				.length,
		);
	}, [people, rombels, waliMap]);

	const run = async (action: () => Promise<void>, failMsg: string) => {
		try {
			await action();
			await load();
			setError("");
		} catch (err) {
			setError(err instanceof Error ? err.message : failMsg);
		}
	};

	const handleAdd = () => {
		setEditing(null);
		setFormVersion((v) => v + 1);
		scrollToForm();
	};

	const handleEdit = (p: DirectoryPerson) => {
		setNotice("");
		setEditing(p);
		scrollToForm();
	};

	const handleSubmit = async (
		data: DirectoryInput,
		publish: boolean,
		id?: string,
	) => {
		const saved = await directoryService.save(data, publish, id);
		await load();
		setNotice(
			`${saved.name} disimpan sebagai ${publish ? "Aktif Tayang" : "Draf"}.`,
		);
		setEditing(null);
		setFormVersion((v) => v + 1);
	};

	const confirmDelete = async () => {
		if (!toDelete) return;
		setDeleting(true);
		await run(
			() => directoryService.remove(toDelete.id),
			"Data gagal dihapus. Coba lagi.",
		);
		setDeleting(false);
		setToDelete(null);
	};

	return (
		<div className="flex flex-col gap-8">
			<DirectoryHeader
				loadedAt={loadedAt}
				onAdd={handleAdd}
				onExport={() => exportDirectoryCsv(people, waliMap)}
			/>
			{error && (
				<p role="alert" className="text-sm text-red-600">
					{error}
				</p>
			)}

			{loading ? (
				<p className="text-sm text-gray-500">Memuat direktori…</p>
			) : (
				<>
					<DirectoryStats stats={stats} />
					<DirectoryForm
						key={`${editing?.id ?? "new"}-${formVersion}`}
						editing={editing}
						total={people.length}
						onSubmit={handleSubmit}
					/>
					{notice && (
						<p
							role="status"
							className="-mt-4 text-sm text-green-700"
						>
							{notice}
						</p>
					)}
					<DirectoryTable
						people={people}
						waliMap={waliMap}
						onEdit={handleEdit}
						onDelete={setToDelete}
						onMove={(id, dir) =>
							run(
								() => directoryService.move(id, dir),
								"Urutan gagal diubah. Coba lagi.",
							)
						}
						onTogglePublish={(p) =>
							run(
								() =>
									directoryService.setPublished(
										p.id,
										!p.published,
									),
								"Status tayang gagal diubah. Coba lagi.",
							)
						}
					/>
					<DirectoryPrivacyNotice />
				</>
			)}

			<ConfirmDialog
				open={toDelete !== null}
				title="Hapus dari direktori?"
				message={`${toDelete?.name ?? ""} akan dihapus dari direktori dan halaman publik. Tindakan ini tidak bisa dikembalikan.`}
				loading={deleting}
				onConfirm={confirmDelete}
				onCancel={() => setToDelete(null)}
			/>
		</div>
	);
};

export default TeachersPage;
