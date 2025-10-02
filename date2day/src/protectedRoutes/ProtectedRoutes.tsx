// src/components/ProtectedRoute.tsx

import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "@/auth/AuthContext";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const nav = useNavigate();
    const { user, loading } = useAuth();

    if (loading) {
        return <h1>Loading ...</h1>;
    }

    if (user !== null) {
        return children;
    } else {
        nav("/login");
    }
};
