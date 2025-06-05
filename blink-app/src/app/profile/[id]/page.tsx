"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"
import { getUser, getUserPosts } from "@/utils/apiFunctions";
import { User, PostType } from "@/utils/types";
import { Post } from "@/components/Post";
import { useAuthStore } from "@/store/AuthStore";
import dayjs from "dayjs";

export default function ProfilePage() {
    const { id } = useParams();
    const authStore = useAuthStore();
    const [posts, setPosts] = useState<PostType[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [newPost, setNewPost] = useState<string>("");

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser(id as string);
            setUser(user);
            const posts = await getUserPosts(id as string);
            setPosts(posts);
        }
        fetchUser();
    }, [id]);

    const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(newPost);
    }

    return (
        <div className="flex flex-col items-center h-screen pt-60 gap-10">
            <div className="flex flex-col w-1/2 gap-4 border-2 border-quinary rounded-2xl overflow-hidden">
                <div className="relative">
                    <div className="bg-secondary/70 w-full h-30"></div>
                    <span className="absolute top-5 left-5 bg-secondary w-30 h-30 rounded-lg"></span>
                </div>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col gap-2 p-5">
                        <h1 className="text-2xl font-bold">{user?.username}</h1>
                        <p>{user?.description}</p>
                        <p>{dayjs(user?.created_at).format("DD/MM/YYYY")}</p>
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
            <div className="flex flex-col w-1/3 gap-4">
                {user?.id === authStore.user?.id && (
                    <form className="flex items-center gap-4 bg-quaternary border-2 border-quinary text-secondary p-2 rounded-lg w-full" onSubmit={handlePost}>
                        <textarea
                            placeholder="Type your post here..."
                            className="text-secondary p-2 rounded-lg w-full outline-none focus:border-action resize-none min-h-[40px] max-h-[200px] overflow-y-auto"
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            rows={1}
                            onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = 'auto';
                                target.style.height = target.scrollHeight + 'px';
                            }}
                            required
                        />
                        <button className="w-fit h-fit bg-action text-primary px-4 py-2 rounded-lg hover:bg-action/80 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100" type="submit" disabled={newPost.length === 0}>
                            Post
                        </button>
                    </form>
                )}
                <div className="flex flex-col gap-4">
                    {posts.map((post: PostType) => (
                        <Post key={post.id} post={post} modify={user?.id === authStore.user?.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}