import { AuthStoreType, User } from "@/utils/types"
import dayjs from "dayjs"

export const UserBanner = ({ user, authStore }: { user: User, authStore: AuthStoreType }) => {
    return (
        <div className="flex flex-col w-1/2 gap-4 border-2 border-quinary rounded-2xl overflow-hidden">
            <div className="relative">
                <div className="bg-secondary/70 w-full h-30"></div>
                <span className="absolute top-5 left-5 bg-secondary w-30 h-30 rounded-lg"></span>
            </div>
            <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-2 p-5">
                    <h1 className="text-2xl font-bold">{user?.username || "No username"}</h1>
                    <p>{user?.description || "No description"}</p>
                    <p>{dayjs(user?.created_at).format("DD/MM/YYYY") || "No date"}</p>
                </div>
                {user?.id === authStore.user?.id && (
                    <div className="flex items-center p-5">
                        <button className="w-fit h-fit bg-action text-primary px-4 py-2 rounded-lg hover:bg-action/80 hover:scale-105 active:scale-95 transition-all duration-300">
                            Edit Info
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}