import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export const AuthRedirect = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => { 
        if (user) {
            navigate(-1);
        }
    },[user, navigate]);

    if(user) {
        return <div>Redirecting...</div>;
    }

    return (
        <Outlet />
    );
};