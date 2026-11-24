import { useCallback, useEffect, useMemo, useState } from "react";
import OrgHeader from "@/features/organization/components/OrgHeader";
import OrgStats from "@/features/organization/components/OrgStats";
import OrgForm from "@/features/organization/components/OrgForm";
import OrgChart from "@/features/organization/components/OrgChart";
import OrgTable from "@/features/organization/components/OrgTable";
import OrgSecurityNotice from "@/features/organization/components/OrgSecurityNotice";
import { organizationService } from "@/features/organization/services/organization.service";
import { getOrgStats } from "@/features/organization/orgUtils";
import type {
	Person,
	Position,
	PositionInput,
} from "@/features/organization/org.types";

const scrollToForm = () =>
	requestAnimationFrame(() =>
		document
			.getElementById("org-form")
			?.scrollIntoView({ behavior: "smooth", block: "start" }),
	);

const OrganizationPage = () => {
	const [positions, setPositions] = useState<Position[]>([]);
	const [people, setPeople] = useState<Person[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [notice, setNotice] = useState("");
	const [loadedAt, setLoadedAt] = useState("");
	const [editing, setEditing] = useState<Position | null>(null);
	const [formVersion, setFormVersion] = useState(0);

	const load = useCallback(async () => {
		try {
			const [pos, dir] = await Promise.all([
				organizationService.getPositions(),
				organizationService.getDirectory(),
			]);
			setPositions(pos);
			setPeople(dir);
			setLoadedAt(
				new Date().toLocaleTimeString("id-ID", {
					hour: "2-digit",
					minute: "2-digit",
				}),
			);
			setError("");
		} catch {
			setError(
				"Data struktur organisasi gagal dimuat. Muat ulang halaman.",
			);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		load();
	}, [load]);

	const peopleMap = useMemo(
		() => new Map(people.map((p) => [p.id, p])),
		[people],
	);
	const stats = useMemo(
		() => getOrgStats(positions, peopleMap),
		[positions, peopleMap],
	);

	const handleAdd = () => {
		setEditing(null);
		setFormVersion((v) => v + 1);
		scrollToForm();
	};

	const handleEdit = (p: Position) => {
		setNotice("");
		setEditing(p);
		scrollToForm();
	};

	const handleSubmit = async (data: PositionInput, id?: string) => {
		const saved = await organizationService.save(data, id);
		await load();
		setNotice(`${saved.title} berhasil disimpan.`);
		setEditing(null);
		setFormVersion((v) => v + 1);
	};

	// move & toggle: jalankan aksi, lalu muat ulang data
	const run = (action: () => Promise<void>, failMsg: string) => async () => {
		try {
			await action();
			await load();
		} catch {
			setError(failMsg);
		}
	};

	return (
		<div className="flex flex-col gap-8">
			<OrgHeader loadedAt={loadedAt} onAdd={handleAdd} />
			{error && (
				<p role="alert" className="text-sm text-red-600">
					{error}
				</p>
			)}

			{loading ? (
				<p className="text-sm text-gray-500">
					Memuat struktur organisasi…
				</p>
			) : (
				<>
					<OrgStats stats={stats} />
					<OrgForm
						key={`${editing?.id ?? "new"}-${formVersion}`}
						editing={editing}
						people={people}
						positions={positions}
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
					<OrgChart
						positions={positions}
						people={peopleMap}
						onEdit={handleEdit}
					/>
					<OrgTable
						positions={positions}
						people={peopleMap}
						onEdit={handleEdit}
						onMove={(id, dir) =>
							run(
								() => organizationService.move(id, dir),
								"Urutan gagal diubah. Coba lagi.",
							)()
						}
						onToggleWeb={(id) =>
							run(
								() => organizationService.toggleWeb(id),
								"Status tayang gagal diubah. Coba lagi.",
							)()
						}
					/>
					<OrgSecurityNotice />
				</>
			)}
		</div>
	);
};

export default OrganizationPage;
