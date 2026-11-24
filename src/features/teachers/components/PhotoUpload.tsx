import { useRef, useState } from "react";
import { LuCamera, LuTrash2, LuUser } from "react-icons/lu";

const MAX_BYTES = 2 * 1024 * 1024;

// Foto disimpan sebagai object URL (hanya berlaku selama sesi) sampai ada backend upload.
const PhotoUpload = ({
	value,
	onChange,
}: {
	value?: string;
	onChange: (url?: string) => void;
}) => {
	const ref = useRef<HTMLInputElement>(null);
	const [error, setError] = useState("");

	const pick = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		e.target.value = "";
		if (!file) return;
		if (!["image/jpeg", "image/png"].includes(file.type))
			return setError("Format harus JPG atau PNG.");
		if (file.size > MAX_BYTES) return setError("Ukuran foto maksimal 2MB.");
		setError("");
		if (value?.startsWith("blob:")) URL.revokeObjectURL(value);
		onChange(URL.createObjectURL(file));
	};

	const remove = () => {
		if (value?.startsWith("blob:")) URL.revokeObjectURL(value);
		onChange(undefined);
		setError("");
	};

	return (
		<div className="rounded-xl bg-[#EBF1FF] p-4">
			<p className="mb-3 text-xs font-semibold text-[#021B3E]">
				Pasfoto Resmi Direktori
			</p>
			<div className="flex gap-4">
				<div className="grid aspect-[3/4] w-24 shrink-0 place-items-center overflow-hidden rounded-lg bg-white text-3xl text-gray-300">
					{value ? (
						<img
							src={value}
							alt="Pratinjau pasfoto"
							className="size-full object-cover"
						/>
					) : (
						<LuUser />
					)}
				</div>
				<div className="flex flex-col justify-between">
					<div className="flex flex-col items-start gap-2">
						<input
							ref={ref}
							type="file"
							accept="image/jpeg,image/png"
							onChange={pick}
							className="hidden"
						/>
						<button
							type="button"
							onClick={() => ref.current?.click()}
							className="flex items-center gap-2 rounded-lg bg-[#021B3E] px-3 py-2 text-xs font-semibold text-white"
						>
							<LuCamera />{" "}
							{value ? "Ganti Berkas" : "Unggah Foto"}
						</button>
						{value && (
							<button
								type="button"
								onClick={remove}
								className="flex items-center gap-1 text-xs text-red-600"
							>
								<LuTrash2 /> Hapus Foto
							</button>
						)}
					</div>
					<p className="text-[11px] leading-snug text-gray-500">
						Format JPG/PNG, maks. 2MB. Rasio 3:4 atau tampilan
						potret.
					</p>
				</div>
			</div>
			{error && (
				<p role="alert" className="mt-2 text-xs text-red-600">
					{error}
				</p>
			)}
		</div>
	);
};

export default PhotoUpload;
