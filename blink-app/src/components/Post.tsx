"use client"
import { CircleUserRound, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { PostType } from "@/utils/types";
import { useAuthStore } from '@/store/AuthStore';
import { deletePost, modifyPost } from '@/utils/apiFunctions';
import { DeleteModal } from './DeleteModal';
import { ModifyModal } from './ModifyModal';
import dayjs from "dayjs";

export const Post = ({ post, modify, setPosts, posts }: { post: PostType, modify: boolean, setPosts: (posts: PostType[]) => void, posts: PostType[] }) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [isModifying, setIsModifying] = useState(false);
    const [modifiedContent, setModifiedContent] = useState(post.content);

    const { user, token } = useAuthStore();

    const formatDate = (dateString: string) => {
        return dayjs(dateString).format('DD/MM/YYYY');
    };

    const handleDeletePost = async () => {
        if (!token) return;
        setIsDeleting(true);
        const success = await deletePost(post.id.toString(), token);
        if (success) {
            setPosts(posts.filter(p => p.id !== post.id));
        }
        setIsDeleting(false);
        setShowDeleteModal(false);
    };

    const handleModifyPost = async () => {
        if (!token) return;
        setIsModifying(true);
        const success = await modifyPost(post.id.toString(), modifiedContent, token);
        if (success) {
            const updatedPosts = posts.map(p =>
                p.id === post.id ? { ...p, content: success.content } : p
            );
            setPosts(updatedPosts);
        }
        setIsModifying(false);
        setShowModifyModal(false);
    };


    return (
        <div className="flex flex-col gap-4 bg-quaternary/80 border-2 border-quinary text-secondary p-5 rounded-2xl">
            <div className="flex items-center w-full gap-2">
                <div className="flex items-center w-full gap-2">
                    <div className="flex gap-2 items-center">
                        <CircleUserRound className="w-8 h-8" />
                        <Link href={`/profile/${post.user_id}`} className='text-lg hover:underline'>
                            {post.username}
                        </Link>
                    </div>
                    <p className='text-xs text-secondary/50'>{formatDate(post.created_at)}</p>
                </div>
                {modify && (
                    <div className="flex items-center gap-2">
                        <button className="w-fit h-fit bg-action text-primary px-2 py-2 rounded-lg hover:bg-action/80 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer" onClick={() => setShowModifyModal(true)}>
                            <Pencil className="w-4 h-4" />
                        </button>
                        {user?.is_admin || user?.id === post.user_id && (
                            <button
                                className="w-fit h-fit bg-red-500 text-primary px-2 py-2 rounded-lg hover:bg-red-500/80 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                                onClick={() => setShowDeleteModal(true)}
                            >
                                <Trash className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                )}
            </div>
            <p className="text-lg whitespace-pre-line">{post.content}</p>
            {showDeleteModal && (
                <DeleteModal
                    message="Are you sure you want to delete this post?"
                    isDeleting={isDeleting}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDeletePost}
                />
            )}
            {showModifyModal && (
                <ModifyModal
                    type="post"
                    isModifying={isModifying}
                    content={modifiedContent}
                    setContent={setModifiedContent}
                    setUsername={(username: string) => { }}
                    setEmail={(email: string) => { }}
                    setDescription={(description: string) => { }}
                    onClose={() => setShowModifyModal(false)}
                    onModify={handleModifyPost}
                />
            )}
        </div>
    )
}