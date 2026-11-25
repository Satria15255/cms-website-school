import { Link } from "react-router-dom";
import { LuScrollText } from "react-icons/lu";
import { PATHS } from "@/app/router/paths";

const AuditNotice = () => (
	<aside className="rounded-xl bg-[#EBF1FF] p-5">
		<h2 className="flex items-center gap-2 text-sm font-semibold text-[#021B3E]">
			<LuScrollText /> Pencatatan Audit Kelembagaan
		</h2>
		<p className="mt-2 text-xs leading-relaxed text-gray-600">
			Setiap pergantian nomor telepon, email, atau jam layanan otomatis
			tercatat pada{" "}
			<Link
				to={PATHS.admin.logs}
				className="font-semibold text-[#021B3E] underline"
			>
				Log Aktivitas Admin
			</Link>{" "}
			dengan stempel waktu dan identitas admin Humas demi kepatuhan
			kearsipan sekolah.
		</p>
	</aside>
);

export default AuditNotice;
