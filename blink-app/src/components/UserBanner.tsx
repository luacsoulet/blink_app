"use client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/AuthStore";
import { deleteUser, modifyUser } from "@/utils/apiFunctions";
import { AuthStoreType, User } from "@/utils/types"
import dayjs from "dayjs"
import { useState } from "react";
import { DeleteModal } from "@/components/DeleteModal";
import { ModifyModal } from "@/components/ModifyModal";

export const UserBanner = ({ user, authStore, setUser }: { user: User, authStore: AuthStoreType, setUser: (user: User) => void }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [isModifying, setIsModifying] = useState(false);
    const [modifiedUsername, setModifiedUsername] = useState(user.username);
    const [modifiedEmail, setModifiedEmail] = useState(user.email);
    const [modifiedDescription, setModifiedDescription] = useState(user.description);

    const { token } = useAuthStore();
    const router = useRouter();

    const handleDeleteUser = async () => {
        if (!user?.id || !token) {
            console.error('Missing user ID or token');
            return;
        }
        setIsDeleting(true);
        const success = await deleteUser(user.id.toString(), token);
        if (success) {
            router.push('/');
        }
        setIsDeleting(false);
        setShowDeleteModal(false);
    }

    const handleModifyUser = async () => {
        if (!user?.id || !token) {
            console.error('Missing user ID or token');
            return;
        }
        setIsModifying(true);
        const success = await modifyUser(user.id.toString(), modifiedUsername, modifiedEmail, modifiedDescription || "", token);
        if (success) {
            setUser({ ...user, username: success.username, email: success.email, description: success.description || "" });
        }

        setIsModifying(false);
        setShowModifyModal(false);
    }

    return (
        <>
            <div className="flex flex-col w-1/2 min-h-[200px] gap-4 border-2 border-quinary rounded-2xl overflow-hidden">
                <div className="relative h-[120px]">
                    <div className="bg-secondary/70 w-full h-full"></div>
                    <span className="absolute top-5 left-5 bg-secondary w-[120px] h-[120px] rounded-lg"></span>
                </div>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col gap-2 p-5">
                        <h1 className="text-2xl font-bold">{user?.username || "No username"}</h1>
                        <p className="whitespace-pre-line">{user?.description || "No description"}</p>
                        <p>{dayjs(user?.created_at).format("DD/MM/YYYY") || "No date"}</p>
                    </div>
                    <div className="flex flex-col items-center p-5 gap-2">
                        {user?.id === authStore.user?.id && (
                            <button
                                className="w-fit h-fit bg-action text-primary px-4 py-2 rounded-lg hover:bg-action/80 hover:scale-105 active:scale-95 transition-all duration-300"
                                onClick={() => setShowModifyModal(true)}
                            >
                                Edit Info
                            </button>
                        )}
                        {(authStore.user?.is_admin || user?.id == authStore.user?.id) && (
                            <button
                                className="w-fit h-fit bg-red-500 text-primary px-4 py-2 rounded-lg hover:bg-red-500/80 hover:scale-105 active:scale-95 transition-all duration-300"
                                onClick={() => setShowDeleteModal(true)}
                                disabled={isDeleting}
                            >
                                {isDeleting ? "Deleting..." : "Delete User"}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {showDeleteModal && (
                <DeleteModal
                    message={`Are you sure you want to delete this user ?`}
                    isDeleting={isDeleting}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDeleteUser}
                />
            )}
            {showModifyModal && (
                <ModifyModal
                    type="user"
                    isModifying={isModifying}
                    username={modifiedUsername}
                    email={modifiedEmail}
                    description={modifiedDescription}
                    setUsername={setModifiedUsername}
                    setEmail={setModifiedEmail}
                    setDescription={setModifiedDescription}
                    onClose={() => setShowModifyModal(false)}
                    onModify={handleModifyUser}
                />
            )}
        </>
    )
}