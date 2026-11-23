interface Props {
	open: boolean;
	title: string;
	message: string;
	confirmLabel?: string;
	loading?: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}

const ConfirmDialog = ({ open, title, message, confirmLabel = "Hapus", loading, onConfirm, onCancel }: Props) => {
	if (!open) return null;
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true">
			<div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
				<h2 className="text-lg font-semibold text-[#021B3E]">{title}</h2>
				<p className="mt-2 text-sm text-gray-600">{message}</p>
				<div className="mt-6 flex justify-end gap-3">
					<button onClick={onCancel} className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
						Batal
					</button>
					<button
						onClick={onConfirm}
						disabled={loading}
						className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-60"
					>
						{loading ? "Menghapus…" : confirmLabel}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmDialog;
