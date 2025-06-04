"use client";
import Link from "next/link"
import { useAuthStore } from "@/store/AuthStore"
import { CircleUserRound } from "lucide-react";

export const NavBar = () => {

    const { user, isAuthenticated, logout } = useAuthStore();
    return (
        <div className="flex justify-between items-center p-5">
            <div>
                <Link href="/">
                    <h1 className="text-2xl font-bold hover:cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300">Blink</h1>
                </Link>
            </div>
            <div>
                {
                    isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <Link href="/profile" className="flex items-center gap-2 bg-secondary text-primary py-2 px-4 rounded-xl hover:cursor-pointer hover:bg-action/80 hover:text-secondary hover:scale-105 active:scale-95 transition-all duration-300">
                                <span>{user?.username}</span>
                                <CircleUserRound />
                            </Link>
                            <button onClick={() => logout()} className="btn border btn-ghost border-secondary py-2 px-4 rounded-xl hover:cursor-pointer hover:bg-action/80 hover:border-action hover:scale-105 active:scale-95 transition-all duration-300">Logout</button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link href="/auth" className="btn border btn-ghost border-secondary py-2 px-4 rounded-xl hover:cursor-pointer hover:bg-action/80 hover:border-action hover:scale-105 active:scale-95 transition-all duration-300">
                                Login
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}