import Link from "next/link"
import { User } from "@/utils/types"

export const UserCard = ({ user }: { user: User | null }) => {
    return (
        <div className="flex flex-col items-center gap-15 bg-secondary/10 border border-quinary/70 h-fit min-w-1/3 w-full max-w-[400px] py-8 px-10 rounded-lg transition-all duration-300">
            <div className="flex flex-col items-center justify-center gap-4 w-full">
                <div className="flex items-center justify-center gap-2 w-full">
                    <span className="bg-secondary w-1/2 aspect-square rounded-lg"></span>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 w-full">
                    {user ? (
                        <>
                            <h1 className="text-xl font-bold text-center">{user?.username}</h1>
                            <p className="text-sm text-secondary/50 text-center whitespace-pre-line">{user?.description || "No description"}</p>
                        </>
                    ) : (
                        <>
                            <h1 className="text-xl font-bold text-center">Guest</h1>
                            <p className="text-sm text-secondary/50 text-center whitespace-pre-line">You are currently logged out</p>
                        </>
                    )}
                </div>
            </div>
            {user ? (
                <Link href={`/profile/${user?.id}`} className="bg-action text-primary p-2 text-center rounded-md w-fit py-1 px-4 hover:bg-action/80 hover:scale-105 active:scale-95 transition-all duration-300">View Profile</Link>
            ) : (
                <Link href={`/login`} className="bg-action text-primary p-2 text-center rounded-md w-fit py-1 px-4 hover:bg-action/80 hover:scale-105 active:scale-95 transition-all duration-300">Login</Link>
            )}
        </div>
    )
}