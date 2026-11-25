import type { ReactNode } from "react";

interface Props {
	id: string;
	label: string;
	error?: string;
	hint?: string;
	aside?: ReactNode;
	children: ReactNode;
}

export const inputClass =
	"w-full rounded-lg border border-transparent bg-[#F5F3EE] px-3 py-2.5 text-sm text-[#021B3E] focus:outline-2 focus:outline-[#021B3E] aria-[invalid=true]:border-red-500";

const FormField = ({ id, label, error, hint, aside, children }: Props) => (
	<div>
		<div className="mb-1.5 flex items-end justify-between gap-2">
			<label
				htmlFor={id}
				className="text-xs font-semibold text-[#021B3E]"
			>
				{label}
			</label>
			{aside}
		</div>
		{children}
		{error ? (
			<p role="alert" className="mt-1 text-xs text-red-600">
				{error}
			</p>
		) : (
			hint && <p className="mt-1 text-[11px] text-gray-400">{hint}</p>
		)}
	</div>
);

export default FormField;
