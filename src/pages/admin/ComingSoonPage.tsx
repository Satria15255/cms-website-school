import PageHeader from "@/components/admin/PageHeader";

const ComingSoonPage = ({ title }: { title: string }) => (
	<>
		<PageHeader title={title} />
		<div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500">
			Halaman ini belum dibuat. Tambahkan komponennya di <code>pages/admin/</code> dan ganti route-nya di{" "}
			<code>app/router/index.tsx</code>.
		</div>
	</>
);

export default ComingSoonPage;
