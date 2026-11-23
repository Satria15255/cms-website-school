import { useEffect, useState } from "react";
import MainInfo from "@/features/dashboard/components/MainInfo";
import Pintasan from "@/features/dashboard/components/Pintasan";
import LatestNews from "@/features/dashboard/components/LatestNews";
import Log from "@/features/dashboard/components/Log";
import PrivacyNotice from "@/features/dashboard/components/PrivacyNotice";
import { dashboardService } from "@/features/dashboard/services/dashboard.service";
import type {
	ActivityLogItem,
	DashboardNewsRow,
	DashboardSummary,
} from "@/features/dashboard/types";

const DashboardPage = () => {
	const [summary, setSummary] = useState<DashboardSummary | null>(null);
	const [news, setNews] = useState<DashboardNewsRow[]>([]);
	const [logs, setLogs] = useState<ActivityLogItem[]>([]);
	const [error, setError] = useState("");

	useEffect(() => {
		(async () => {
			try {
				const [s, n, l] = await Promise.all([
					dashboardService.getSummary(),
					dashboardService.getLatestNews(),
					dashboardService.getActivityLog(),
				]);
				setSummary(s);
				setNews(n);
				setLogs(l);
			} catch {
				setError("Data dashboard gagal dimuat. Muat ulang halaman.");
			}
		})();
	}, []);

	if (error) return <p className="text-sm text-red-600">{error}</p>;
	if (!summary)
		return <p className="text-sm text-gray-500">Memuat dashboard…</p>;

	return (
		<div className="flex flex-col gap-8">
			<MainInfo data={summary} />
			<Pintasan />
			<div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
				<LatestNews
					rows={news}
					total={summary.news.total}
					published={summary.news.published}
					draft={summary.news.draft}
				/>
				<div className="flex flex-col gap-6">
					<Log items={logs} />
					<PrivacyNotice />
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;
