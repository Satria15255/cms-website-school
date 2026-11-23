import { useCallback, useEffect, useMemo, useState } from "react";
import RombelHeader from "@/features/classes/components/admin/RombelHeader";
import RombelStats from "@/features/classes/components/admin/RombelStats";
import RombelForm from "@/features/classes/components/admin/RombelForm";
import RombelFilter, {
	type LevelTab,
	type ViewMode,
} from "@/features/classes/components/admin/RombelFilter";
import RombelSection from "@/features/classes/components/admin/RombelSection";
import RombelPrivacyNotice from "@/features/classes/components/admin/RombelPrivacyNotice";
import { classService } from "@/features/classes/services/class.service";
import { getRombelStats, nameKey } from "@/features/classes/rombelUtils";
import type {
	LevelMeta,
	Rombel,
	RombelInput,
	TeacherOption,
} from "@/features/classes/rombel.types";

const scrollToForm = () =>
	requestAnimationFrame(() =>
		document
			.getElementById("rombel-form")
			?.scrollIntoView({ behavior: "smooth", block: "start" }),
	);

const ClassesPage = () => {
	const [rombels, setRombels] = useState<Rombel[]>([]);
	const [levels, setLevels] = useState<LevelMeta[]>([]);
	const [teachers, setTeachers] = useState<TeacherOption[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [notice, setNotice] = useState("");
	const [loadedAt, setLoadedAt] = useState("");

	const [tab, setTab] = useState<LevelTab>("all");
	const [query, setQuery] = useState("");
	const [view, setView] = useState<ViewMode>("grid");
	const [editing, setEditing] = useState<Rombel | null>(null);
	const [formVersion, setFormVersion] = useState(0);

	const load = useCallback(async () => {
		try {
			const [r, l, t] = await Promise.all([
				classService.getAll(),
				classService.getLevels(),
				classService.getTeachers(),
			]);
			setRombels(r);
			setLevels(l);
			setTeachers(t);
			setLoadedAt(
				new Date().toLocaleTimeString("id-ID", {
					hour: "2-digit",
					minute: "2-digit",
				}),
			);
			setError("");
		} catch {
			setError("Data rombel gagal dimuat. Muat ulang halaman.");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		load();
	}, [load]);

	const stats = useMemo(() => getRombelStats(rombels), [rombels]);
	const teacherMap = useMemo(
		() => new Map(teachers.map((t) => [nameKey(t.name), t])),
		[teachers],
	);

	const counts = useMemo<Record<LevelTab, number>>(
		() => ({
			all: rombels.length,
			VII: rombels.filter((r) => r.tingkat === "VII").length,
			VIII: rombels.filter((r) => r.tingkat === "VIII").length,
			IX: rombels.filter((r) => r.tingkat === "IX").length,
		}),
		[rombels],
	);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		return rombels.filter(
			(r) =>
				!q ||
				[r.name, r.wali, r.room].some((v) =>
					v.toLowerCase().includes(q),
				),
		);
	}, [rombels, query]);

	const handleAdd = () => {
		setEditing(null);
		setFormVersion((v) => v + 1);
		scrollToForm();
	};

	const handleEdit = (r: Rombel) => {
		setNotice("");
		setEditing(r);
		scrollToForm();
	};

	const handleSubmit = async (data: RombelInput, id?: string) => {
		const saved = await classService.save(data, id);
		await load();
		setNotice(`${saved.name} berhasil disimpan.`);
		setEditing(null);
		setFormVersion((v) => v + 1);
	};

	const handleToggleArchive = async (r: Rombel) => {
		try {
			await classService.toggleArchive(r.id);
			await load();
		} catch {
			setError("Status rombel gagal diubah. Coba lagi.");
		}
	};

	const visible = levels
		.filter((l) => tab === "all" || l.symbol === tab)
		.map((l) => ({
			level: l,
			items: filtered.filter((r) => r.tingkat === l.symbol),
		}))
		.filter((s) => s.items.length > 0);

	return (
		<div className="flex flex-col gap-8">
			<RombelHeader loadedAt={loadedAt} onAdd={handleAdd} />
			{error && (
				<p role="alert" className="text-sm text-red-600">
					{error}
				</p>
			)}

			{loading ? (
				<p className="text-sm text-gray-500">Memuat data rombel…</p>
			) : (
				<>
					<RombelStats stats={stats} />
					<RombelForm
						key={`${editing?.id ?? "new"}-${formVersion}`}
						editing={editing}
						teachers={teachers}
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

					<RombelFilter
						tab={tab}
						counts={counts}
						query={query}
						view={view}
						onTab={setTab}
						onQuery={setQuery}
						onView={setView}
					/>

					{visible.length === 0 && (
						<p className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500">
							Tidak ada rombel yang cocok dengan pencarian ini.
						</p>
					)}
					{visible.map(({ level, items }) => (
						<RombelSection
							key={level.symbol}
							level={level}
							rombels={items}
							teachers={teacherMap}
							view={view}
							onEdit={handleEdit}
							onToggleArchive={handleToggleArchive}
						/>
					))}

					<RombelPrivacyNotice />
				</>
			)}
		</div>
	);
};

export default ClassesPage;
