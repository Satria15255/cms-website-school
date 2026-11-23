import { useCallback, useEffect, useMemo, useState } from "react";
import NewsHeader from "@/features/news/components/admin/NewsHeader";
import NewsStats from "@/features/news/components/admin/NewsStats";
import NewsTable from "@/features/news/components/admin/NewsTable";
import { newsService } from "@/features/news/services/news.service";
import { getNewsStats } from "@/features/news/newsStats";
import type { AdminNewsItem } from "@/features/news/admin.types";

const NewsListPage = () => {
	const [items, setItems] = useState<AdminNewsItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const load = useCallback(async () => {
		try {
			setItems(await newsService.getAdminList());
			setError("");
		} catch {
			setError("Berita gagal dimuat. Muat ulang halaman.");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		load();
	}, [load]);

	const handlePublish = async (id: string) => {
		try {
			await newsService.publish(id);
			await load();
		} catch {
			setError("Berita gagal diterbitkan. Coba lagi.");
		}
	};

	const stats = useMemo(() => getNewsStats(items), [items]);

	return (
		<div className="flex flex-col gap-6">
			<NewsHeader />
			{error && <p className="text-sm text-red-600">{error}</p>}
			{loading ? (
				<p className="text-sm text-gray-500">Memuat berita…</p>
			) : (
				<>
					<NewsStats stats={stats} />
					<NewsTable items={items} onPublish={handlePublish} />
				</>
			)}
		</div>
	);
};

export default NewsListPage;
