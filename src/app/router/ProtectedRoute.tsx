import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "@/features/auth/auth";
import { PATHS } from "./paths";

const ProtectedRoute = () =>
	isAuthenticated() ? <Outlet /> : <Navigate to={PATHS.admin.login} replace />;

export default ProtectedRoute;
