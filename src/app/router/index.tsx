import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";
import AdminLayout from "@/layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import { PATHS } from "./paths";

import HomePage from "@/pages/public/home/HomePage";
import AboutUsPage from "@/pages/public/about-us/AboutUsPage";
import ClassListPage from "@/pages/public/class-list/ClassListPage";
import NewsPage from "@/pages/public/news/NewsPage";
import NewsDetailPage from "@/pages/public/news-detail/NewsDetailPage";
import ContactPage from "@/pages/public/contact/ContactPage";
import NotFoundPage from "@/pages/NotFoundPage";

// Halaman admin di-lazy load supaya pengunjung publik tidak ikut mengunduh kodenya.
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const DashboardPage = lazy(() => import("@/pages/admin/dashboard/DashboardPage"));
const NewsListPage = lazy(() => import("@/pages/admin/news/NewsListPage"));
const ComingSoonPage = lazy(() => import("@/pages/admin/ComingSoonPage"));

const AppRoutes = () => (
	<Suspense fallback={<p className="p-6 text-gray-500">Memuat…</p>}>
		<Routes>
			<Route element={<PublicLayout />}>
				<Route path={PATHS.home} element={<HomePage />} />
				<Route path={PATHS.aboutUs} element={<AboutUsPage />} />
				<Route path={PATHS.classList} element={<ClassListPage />} />
				<Route path={PATHS.news} element={<NewsPage />} />
				<Route path={`${PATHS.news}/:slug`} element={<NewsDetailPage />} />
				<Route path={PATHS.contact} element={<ContactPage />} />
			</Route>

			<Route path={PATHS.admin.login} element={<LoginPage />} />

			<Route path={PATHS.admin.root} element={<ProtectedRoute />}>
				<Route element={<AdminLayout />}>
					<Route index element={<DashboardPage />} />
					<Route path="news" element={<NewsListPage />} />
					<Route path="news/new" element={<ComingSoonPage title="Tambah berita" />} />
					<Route path="news/:id/edit" element={<ComingSoonPage title="Edit berita" />} />
					<Route path="classes" element={<ComingSoonPage title="Kelas" />} />
					<Route path="teachers" element={<ComingSoonPage title="Guru" />} />
					<Route path="staff" element={<ComingSoonPage title="Tenaga kependidikan" />} />
					<Route path="messages" element={<ComingSoonPage title="Pesan masuk" />} />
					<Route path="settings" element={<ComingSoonPage title="Pengaturan sekolah" />} />
				</Route>
			</Route>

			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	</Suspense>
);

export default AppRoutes;
