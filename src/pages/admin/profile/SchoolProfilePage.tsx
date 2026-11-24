import { useEffect, useMemo, useState } from "react";
import ProfileHeader from "@/features/school-profile/components/ProfileHeader";
import ProfileStats from "@/features/school-profile/components/ProfileStats";
import ProfileTabs from "@/features/school-profile/components/ProfileTabs";
import IdentityForm from "@/features/school-profile/components/IdentityForm";
import IntegrityNotice from "@/features/school-profile/components/IntegrityNotice";
import { profileService } from "@/features/school-profile/services/profile.service";
import {
	getProfileStats,
	validateProfile,
} from "@/features/school-profile/profileUtils";
import type {
	ProfileErrors,
	ProfileTab,
	SchoolProfile,
} from "@/features/school-profile/profile.types";

const TAB_TITLES: Record<Exclude<ProfileTab, "identity">, string> = {
	visi: "Visi, Misi & Nilai",
	welcome: "Sambutan Kepala Sekolah",
	media: "Media & Foto Sekolah",
};

const SchoolProfilePage = () => {
	const [saved, setSaved] = useState<SchoolProfile | null>(null);
	const [draft, setDraft] = useState<SchoolProfile | null>(null);
	const [errors, setErrors] = useState<ProfileErrors>({});
	const [tab, setTab] = useState<ProfileTab>("identity");
	const [saving, setSaving] = useState(false);
	const [loadError, setLoadError] = useState("");
	const [message, setMessage] = useState<{
		type: "ok" | "error";
		text: string;
	} | null>(null);
	const [lastSaved, setLastSaved] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			try {
				const p = await profileService.get();
				setSaved(p);
				setDraft(p);
			} catch {
				setLoadError(
					"Profil sekolah gagal dimuat. Muat ulang halaman.",
				);
			}
		})();
	}, []);

	const dirty = useMemo(
		() => JSON.stringify(saved) !== JSON.stringify(draft),
		[saved, draft],
	);
	const stats = useMemo(
		() =>
			saved ? getProfileStats(saved, profileService.nilaiCount()) : null,
		[saved],
	);

	if (loadError)
		return (
			<p role="alert" className="text-sm text-red-600">
				{loadError}
			</p>
		);
	if (!saved || !draft || !stats)
		return <p className="text-sm text-gray-500">Memuat profil sekolah…</p>;

	const change = <K extends keyof SchoolProfile>(
		key: K,
		value: SchoolProfile[K],
	) => {
		setDraft({ ...draft, [key]: value });
		setErrors((e) => ({ ...e, [key]: undefined }));
		setMessage(null);
	};

	const handleSave = async () => {
		if (!dirty) {
			setMessage({
				type: "ok",
				text: "Tidak ada perubahan untuk disimpan.",
			});
			return;
		}
		const found = validateProfile(draft);
		if (Object.keys(found).length > 0) {
			setErrors(found);
			setTab("identity");
			setMessage({
				type: "error",
				text: "Periksa kembali kolom yang ditandai merah.",
			});
			return;
		}
		setSaving(true);
		try {
			const next = await profileService.save(draft);
			setSaved(next);
			setDraft(next);
			setLastSaved(
				new Date().toLocaleTimeString("id-ID", {
					hour: "2-digit",
					minute: "2-digit",
				}),
			);
			setMessage({
				type: "ok",
				text: "Profil sekolah berhasil disimpan.",
			});
		} catch {
			setMessage({
				type: "error",
				text: "Profil gagal disimpan. Coba lagi.",
			});
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className="flex flex-col gap-6">
			<ProfileHeader onSave={handleSave} saving={saving} dirty={dirty} />
			{message && (
				<p
					role={message.type === "error" ? "alert" : "status"}
					className={`text-sm ${message.type === "error" ? "text-red-600" : "text-green-700"}`}
				>
					{message.text}
				</p>
			)}
			<ProfileStats profile={saved} stats={stats} lastSaved={lastSaved} />
			<ProfileTabs tab={tab} onTab={setTab} />

			{tab === "identity" ? (
				<IdentityForm draft={draft} errors={errors} onChange={change} />
			) : (
				<div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500">
					Panel “{TAB_TITLES[tab]}” belum dibuat. Kirim desainnya dan
					saya buatkan.
				</div>
			)}

			<IntegrityNotice onSave={handleSave} saving={saving} />
		</div>
	);
};

export default SchoolProfilePage;
