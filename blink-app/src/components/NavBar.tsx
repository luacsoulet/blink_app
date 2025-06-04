"use client";
import Link from "next/link"
import { useAuthStore } from "@/store/AuthStore"
import { CircleUserRound } from "lucide-react";
import "@/styles/navBar.scss";

export const NavBar = () => {

    const { user, isAuthenticated, logout } = useAuthStore();
    return (
        <div className="flex justify-between items-center p-5">
            <div>
                <Link href="/">
                    <h1 className="navbar__logo font-bold">Blink</h1>
                </Link>
            </div>
            <div>
                {
                    isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <Link href="/profile" className="navbar__title user">
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
                    )
                }
            </div>
        </div>
    )
}