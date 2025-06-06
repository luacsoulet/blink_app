import { CircleUserRound, Pencil, Trash } from 'lucide-react';
import { PostType } from "@/utils/types";
import { useAuthStore } from '@/store/AuthStore';
import dayjs from "dayjs";

export const Post = ({ post, modify }: { post: PostType, modify: boolean }) => {

    const { user } = useAuthStore();

    const formatDate = (dateString: string) => {
        return dayjs(dateString).format('DD/MM/YYYY');
    };


    return (
        <div className="flex flex-col gap-4 bg-quaternary/80 border-2 border-quinary text-secondary p-5 rounded-2xl">
            <div className="flex items-center w-full gap-2">
                <div className="flex items-center w-full gap-2">
                    <div className="flex gap-2 items-center">
                        <CircleUserRound className="w-8 h-8" />
                        <p className='text-lg'>{post.username}</p>
                    </div>
                    <p className='text-xs text-secondary/50'>{formatDate(post.created_at)}</p>
                </div>
                {modify && (
                    <div className="flex items-center gap-2">
                        <button className="w-fit h-fit bg-action text-primary px-2 py-2 rounded-lg hover:bg-action/80 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer">
                            <Pencil className="w-4 h-4" />
                        </button>
                        {user?.is_admin && (
                            <button className="w-fit h-fit bg-red-500 text-primary px-2 py-2 rounded-lg hover:bg-red-500/80 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer">
                                <Trash className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                )}
            </div>
            <p className="text-lg">{post.content}</p>
        </div>
    )
}