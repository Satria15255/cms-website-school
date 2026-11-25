import { buildDiff } from "../auditUtils";
import type { AuditEntry } from "../audit.types";

const STYLE = {
	same: "text-slate-300",
	remove: "bg-red-950/70 text-red-300",
	add: "bg-green-950/70 text-green-300",
} as const;
const MARK = { same: " ", remove: "-", add: "+" } as const;

const JsonDiffView = ({ entry }: { entry: AuditEntry | null }) => {
	const hasPayload = entry && (entry.before || entry.after);
	const lines = hasPayload
		? buildDiff(
				entry.before,
				entry.after,
				`${entry.userId}@smpnusantara.sch.id`,
			)
		: [];

	return (
		<div className="overflow-hidden rounded-xl bg-[#0B1B3A] text-xs text-white">
			<div className="flex items-center justify-between gap-2 bg-black/20 px-4 py-2.5">
				<span className="flex items-center gap-1.5" aria-hidden>
					<span className="size-2.5 rounded-full bg-red-400" />
					<span className="size-2.5 rounded-full bg-amber-400" />
					<span className="size-2.5 rounded-full bg-green-400" />
				</span>
				<span className="text-[10px] font-semibold tracking-wider text-white/70 uppercase">
					JSON Payload Diff View
				</span>
				<span className="font-mono text-[10px] text-white/50">
					{entry ? `PAYLOAD: POST_${entry.action}_DELTA` : ""}
				</span>
			</div>
			<pre
				className="overflow-x-auto p-4 font-mono leading-relaxed"
				aria-label="Perbandingan payload sebelum dan sesudah"
			>
				{hasPayload ? (
					lines.map((l, i) => (
						<code
							key={i}
							className={`block whitespace-pre px-2 ${STYLE[l.kind]}`}
						>
							{MARK[l.kind]} {l.text}
						</code>
					))
				) : (
					<code className="block text-white/50">
						// Aksi ini tidak memiliki payload perubahan data.
					</code>
				)}
			</pre>
		</div>
	);
};

export default JsonDiffView;
