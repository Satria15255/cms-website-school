import { LuShield } from "react-icons/lu";

const AntiSpamNotice = () => (
	<aside className="rounded-xl border border-gray-200 border-l-4 border-l-[#F4BF46] bg-white p-5 shadow-sm">
		<h2 className="flex items-center gap-2 text-sm font-semibold text-[#021B3E]">
			<LuShield /> Kepatuhan Anti-Spam (PRD 3.5)
		</h2>
		<p className="mt-2 text-xs leading-relaxed text-gray-600">
			Sesuai spesifikasi PRD MVP, formulir input pesan bebas di publik
			sengaja ditiadakan demi mencegah spam bot dan antrean tiket tidak
			terkelola. Interaksi dialihkan langsung menuju kanal terverifikasi
			(WhatsApp, Telepon PSTN, dan Surel Resmi).
		</p>
		<p className="mt-3 flex flex-wrap gap-2 text-[10px] font-semibold tracking-wider uppercase">
			<span className="rounded bg-[#EBF1FF] px-2 py-1 text-[#021B3E]">
				ISO-EDU Compliant
			</span>
			<span className="rounded bg-[#EBF1FF] px-2 py-1 text-[#021B3E]">
				Direct-Routing
			</span>
		</p>
	</aside>
);

export default AntiSpamNotice;
