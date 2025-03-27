import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export const ProtectedRoute = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => { 
        if (!user) {
            navigate('/login');
        }
    });

    if (!user) {
        return <span>Redirecting...</span>;
    }

    return (
        <Outlet />
    );
};