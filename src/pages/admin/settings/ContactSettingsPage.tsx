import { useEffect, useMemo, useState } from "react";
import ContactSettingsHeader from "@/features/contact/components/admin/ContactSettingsHeader";
import ContactSettingsStats from "@/features/contact/components/admin/ContactSettingsStats";
import AddressCard from "@/features/contact/components/admin/AddressCard";
import ChannelsCard from "@/features/contact/components/admin/ChannelsCard";
import HoursCard from "@/features/contact/components/admin/HoursCard";
import SocialCard from "@/features/contact/components/admin/SocialCard";
import LivePreview from "@/features/contact/components/admin/LivePreview";
import AntiSpamNotice from "@/features/contact/components/admin/AntiSpamNotice";
import AuditNotice from "@/features/contact/components/admin/AuditNotice";
import { contactSettingsService } from "@/features/contact/services/contact-settings.service";
import {
	getContactStats,
	validateSettings,
} from "@/features/contact/settingsUtils";
import type {
	ContactSettings,
	SettingsErrors,
} from "@/features/contact/settings.types";

const ContactSettingsPage = () => {
	const [saved, setSaved] = useState<ContactSettings | null>(null);
	const [draft, setDraft] = useState<ContactSettings | null>(null);
	const [errors, setErrors] = useState<SettingsErrors>({});
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
				const s = await contactSettingsService.get();
				setSaved(s);
				setDraft(s);
			} catch {
				setLoadError(
					"Pengaturan kontak gagal dimuat. Muat ulang halaman.",
				);
			}
		})();
	}, []);

	const dirty = useMemo(
		() => JSON.stringify(saved) !== JSON.stringify(draft),
		[saved, draft],
	);
	const savedStats = useMemo(
		() => (saved ? getContactStats(saved) : null),
		[saved],
	);

	if (loadError)
		return (
			<p role="alert" className="text-sm text-red-600">
				{loadError}
			</p>
		);
	if (!saved || !draft || !savedStats)
		return (
			<p className="text-sm text-gray-500">Memuat pengaturan kontak…</p>
		);

	const change = <K extends keyof ContactSettings>(
		key: K,
		value: ContactSettings[K],
	) => {
		setDraft({ ...draft, [key]: value });
		setErrors({});
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
		const found = validateSettings(draft);
		setErrors(found);
		if (Object.keys(found).length > 0) {
			setMessage({
				type: "error",
				text: `${Object.keys(found).length} kolom perlu diperbaiki sebelum disimpan.`,
			});
			return;
		}
		setSaving(true);
		try {
			const next = await contactSettingsService.save(draft);
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
				text: "Pengaturan kontak berhasil disimpan.",
			});
		} catch {
			setMessage({
				type: "error",
				text: "Pengaturan gagal disimpan. Coba lagi.",
			});
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className="flex flex-col gap-6">
			<ContactSettingsHeader
				lastSaved={lastSaved}
				dirty={dirty}
				saving={saving}
				onSave={handleSave}
			/>
			{message && (
				<p
					role={message.type === "error" ? "alert" : "status"}
					className={`text-sm ${message.type === "error" ? "text-red-600" : "text-green-700"}`}
				>
					{message.text}
				</p>
			)}
			<ContactSettingsStats stats={savedStats} saved={saved} />

			<div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[1fr_380px]">
				<div className="flex flex-col gap-6">
					<AddressCard
						draft={draft}
						errors={errors}
						onChange={change}
					/>
					<ChannelsCard
						draft={draft}
						errors={errors}
						onChange={change}
					/>
					<HoursCard
						draft={draft}
						errors={errors}
						onChange={change}
					/>
					<SocialCard
						draft={draft}
						errors={errors}
						onChange={change}
					/>
				</div>
				<div className="flex flex-col gap-6 xl:sticky xl:top-6">
					<LivePreview draft={draft} />
					<AntiSpamNotice />
					<AuditNotice />
				</div>
			</div>
		</div>
	);
};

export default ContactSettingsPage;
