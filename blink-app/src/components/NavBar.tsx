"use client";
import Link from "next/link"
import { useAuthStore } from "@/store/AuthStore"
import { CircleUserRound } from "lucide-react";
import "@/styles/navBar.scss";
import { useEffect, useCallback } from "react";
import { verifyToken } from "@/utils/apiFunctions";
import { SearchBar } from "./SearchBar";

export const NavBar = () => {
    const { user, isAuthenticated, token, logout } = useAuthStore();

    const checkToken = useCallback(async () => {
        if (token) {
            const isValid = await verifyToken(token);
            if (!isValid) {
                logout();
            }
        }
    }, [token, logout]);

    useEffect(() => {
        const interval = setInterval(checkToken, 15 * 60 * 1000);
        checkToken();
        return () => clearInterval(interval);
    }, [checkToken]);

    return (
        <div className="navbar">
            <div>
                <Link href="/">
                    <h1 className="navbar__logo font-bold">Blink</h1>
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <SearchBar />
                {isAuthenticated ? (
                    <div className="flex items-center gap-4">
                        <Link href={`/profile/${user?.id}`} className="navbar__title user">
                            <span>{user?.username}</span>
                            <CircleUserRound />
                        </Link>
                        <button onClick={() => logout()} className="navbar__title auth">Logout</button>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link href="/auth" className="navbar__title auth">
                            Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}