import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";

const PublicLayout = () => (
	<div>
		<ScrollToTop />
		<Navbar />
		<Outlet />
		<Footer />
	</div>
);

export default PublicLayout;
