import { User } from "@/utils/types";
import { CircleUserRound, Trash } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";
import { useState } from "react";
import { DeleteModal } from "./DeleteModal";
import { deleteUser } from "@/utils/apiFunctions";
import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "next/navigation";

export const SearchResults = ({ users }: { users: User[] }) => {
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const { user: currentUser, token } = useAuthStore();
    const router = useRouter();

    const handleDeleteUser = async () => {
        if (!userToDelete?.id || !token) return;
        setIsDeleting(true);
        const success = await deleteUser(userToDelete.id.toString(), token);
        if (success) {
            router.refresh();
        }
        setIsDeleting(false);
        setUserToDelete(null);
    };

    if (users.length === 0) {
        return (
            <div className="flex items-center justify-center w-full p-4">
                <p className="text-secondary/50">No user found</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {users.map((user) => (
                <div key={user.id} className="relative">
                    <Link href={`/profile/${user.id}`}>
                        <div className="flex items-start gap-4 bg-secondary/10 border border-quinary/70 p-4 rounded-lg hover:bg-secondary/20 transition-all duration-300">
                            <CircleUserRound className="w-12 h-12" />
                            <div className="flex flex-col gap-1">
                                <h3 className="font-bold">{user.username}</h3>
                                <p className="text-sm text-secondary/70">{user.description || "No description"}</p>
                                <p className="text-xs text-secondary/50">Member since {dayjs(user.created_at).format("DD/MM/YYYY")}</p>
                            </div>
                        </div>
                    </Link>
                    {currentUser?.is_admin && (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setUserToDelete(user);
                            }}
                            className="absolute top-2 right-2 bg-red-500/80 p-2 rounded-lg hover:bg-red-500 transition-all duration-300"
                        >
                            <Trash className="w-4 h-4 text-primary" />
                        </button>
                    )}
                </div>
            ))}
            {userToDelete && (
                <DeleteModal
                    message={`Are you sure you want to delete the user ${userToDelete.username} ?`}
                    isDeleting={isDeleting}
                    onClose={() => setUserToDelete(null)}
                    onDelete={handleDeleteUser}
                />
            )}
        </div>
    );
} 