import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ allowedRoles }) => {
    const { user } = useAuth();

    if (!user) {
       return <Navigate to="/login" replace />;
    }

    const isAllowed = user.roles.some((role) => allowedRoles.includes(role));

    if (allowedRoles && !isAllowed) {
        return <Navigate to={"/unauthorized"} replace />
    }

    return (
        <Outlet />
    );
};