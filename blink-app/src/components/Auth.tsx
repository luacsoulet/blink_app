"use client";
import { useEffect, useState } from "react";
import { login, register } from "@/utils/apiFunctions";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/AuthStore";

export const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const { login: loginUser, isAuthenticated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!validateEmail(email)) {
            setError("Veuillez entrer une adresse email valide");
            return;
        }

        setIsLoading(true);

        try {
            let response = isLogin
                ? await login(email, password)
                : await register(username, email, password);

            if (!response || !response.token || !response.user) {
                console.error("Invalid response format:", response);
                setError("La réponse du serveur n'est pas dans le bon format");
                return;
            }

            loginUser(response);
            router.push("/");
        } catch (error) {
            console.error("Error logging in:", error);
            setError("Une erreur est survenue. Veuillez réessayer.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4 w-1/3 h-fit bg-tertiary text-secondary p-8 rounded-xl">
            <h1 className="text-2xl font-bold">{isLogin ? "Login" : "Register"}</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full items-center">
                {!isLogin && (
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-secondary text-primary p-2 rounded-md w-full" />
                )}
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-secondary text-primary p-2 rounded-md w-full" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-secondary text-primary p-2 rounded-md w-full" />
                {error && (
                    <div className="text-red-500 text-sm w-full text-center">{error}</div>
                )}
                <button type="submit" disabled={isLoading} className="bg-action text-primary p-2 w-2/3 rounded-md hover:bg-action/80 hover:scale-105 active:scale-95 transition-all duration-300">{isLogin ? "Login" : "Register"}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)} className="text-secondary p-2 btn-ghost rounded-md w-full hover:bg-secondary/80 hover:text-primary hover:scale-105 active:scale-95 transition-all duration-300">{isLogin ? "I don't have an account" : "I already have an account"}</button>
        </div>
    )
}