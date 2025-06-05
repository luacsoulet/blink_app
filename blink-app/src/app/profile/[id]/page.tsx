"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"
import { getUser, getUserPosts } from "@/utils/apiFunctions";
import { User, PostType } from "@/utils/types";
import { useAuthStore } from "@/store/AuthStore";
import { UserBanner } from "@/components/UserBanner";
import { PostsGallery } from "@/components/PostsGallery";
import { PostCreator } from "@/components/PostCreator";

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
            {user && <UserBanner user={user} authStore={authStore} />}
            <div className="flex flex-col w-1/3 gap-4">
                {user?.id === authStore.user?.id && (
                    <PostCreator handlePost={handlePost} newPost={newPost} setNewPost={setNewPost} />
                )}
                {posts && user && <PostsGallery posts={posts} user={user} authStore={authStore} />}
            </div>
        </div>
    )
}