import { useRef } from "react";
import { LuBold, LuItalic, LuLink, LuList } from "react-icons/lu";
import { MAX_WORDS, countWords } from "../profileUtils";

interface Props {
	value: string;
	error?: string;
	onChange: (v: string) => void;
}

// Toolbar menyisipkan sintaks Markdown (**tebal**, *miring*, "- " daftar, [teks](url)).
// Halaman publik perlu merender Markdown agar formatnya tampil.
const HistoryEditor = ({ value, error, onChange }: Props) => {
	const ref = useRef<HTMLTextAreaElement>(null);
	const words = countWords(value);

	const apply = (fn: (sel: string) => { text: string; shift: number }) => {
		const el = ref.current;
		if (!el) return;
		const { selectionStart: s, selectionEnd: e } = el;
		const { text, shift } = fn(value.slice(s, e));
		onChange(value.slice(0, s) + text + value.slice(e));
		requestAnimationFrame(() => {
			el.focus();
			el.setSelectionRange(s + shift, s + shift + (e - s));
		});
	};

	const wrap = (mark: string) => () =>
		apply((sel) => ({ text: `${mark}${sel}${mark}`, shift: mark.length }));
	const list = () =>
		apply((sel) => ({
			text: sel
				? sel
						.split("\n")
						.map((l) => `- ${l}`)
						.join("\n")
				: "- ",
			shift: 2,
		}));
	const link = () =>
		apply((sel) => ({
			text: `[${sel || "teks tautan"}](https://)`,
			shift: 1,
		}));

	const btn =
		"grid size-8 place-items-center rounded text-[#021B3E] hover:bg-white";
	return (
		<div>
			<div className="flex items-end justify-between gap-3">
				<div>
					<label
						htmlFor="p-history"
						className="text-[11px] font-semibold tracking-wider text-[#021B3E] uppercase"
					>
						Ringkasan sejarah lembaga
					</label>
					<p className="text-xs text-gray-500">
						Ditampilkan pada segmen 'Tentang Kami' (About Us) dan
						modul ringkas di halaman utama.
					</p>
				</div>
				<div
					className="flex rounded-lg bg-[#EBF1FF] p-1"
					role="toolbar"
					aria-label="Pemformatan teks"
				>
					<button
						type="button"
						onClick={wrap("**")}
						aria-label="Tebal"
						className={btn}
					>
						<LuBold />
					</button>
					<button
						type="button"
						onClick={wrap("*")}
						aria-label="Miring"
						className={btn}
					>
						<LuItalic />
					</button>
					<button
						type="button"
						onClick={list}
						aria-label="Daftar"
						className={btn}
					>
						<LuList />
					</button>
					<button
						type="button"
						onClick={link}
						aria-label="Tautan"
						className={btn}
					>
						<LuLink />
					</button>
				</div>
			</div>
			<textarea
				id="p-history"
				ref={ref}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				rows={8}
				aria-invalid={Boolean(error)}
				className="mt-2 w-full resize-y rounded-lg border border-transparent bg-[#EBF1FF] p-4 text-sm leading-relaxed text-[#021B3E] focus:outline-2 focus:outline-[#021B3E]"
			/>
			{error && (
				<p role="alert" className="mt-1 text-xs text-red-600">
					{error}
				</p>
			)}
			<div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
				<span
					className={
						words > MAX_WORDS ? "text-red-600" : "text-gray-500"
					}
				>
					Maksimal {MAX_WORDS} kata disarankan untuk kenyamanan
					membaca di perangkat seluler.
				</span>
				<span className="text-[#021B3E]">
					{words} Kata / {value.length} Karakter
				</span>
			</div>
		</div>
	);
};

export default HistoryEditor;
