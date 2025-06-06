"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"
import { getUser, getUserPosts } from "@/utils/apiFunctions";
import { User, PostType } from "@/utils/types";
import { useAuthStore } from "@/store/AuthStore";
import { UserBanner } from "@/components/UserBanner";
import { PostsGallery } from "@/components/PostsGallery";
import { PostCreator } from "@/components/PostCreator";
import { PostsGallerySkeleton } from "@/components/skeletons/PostsGallerySkeleton";
import { UserBannerSkeleton } from "@/components/skeletons/UserBannerSkeleton";
import { PostCreatorSkeleton } from "@/components/skeletons/PostCreatorSkeleton";

export default function ProfilePage() {
    const { id } = useParams();
    const authStore = useAuthStore();
    const [posts, setPosts] = useState<PostType[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [newPost, setNewPost] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);
            try {
                const userData = await getUser(id as string);
                setUser(userData);
                const userPosts = await getUserPosts(id as string);
                setPosts(userPosts || []);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setPosts([]);
            } finally {
                setIsLoading(false);
            }
        }
        fetchUser();
    }, [id]);

    if (!user && !isLoading) {
        return <div className="flex items-center justify-center h-screen">User not found</div>;
    }

    return (
        <div className="flex flex-col items-center min-h-screen py-40 gap-10">
            {isLoading ? <UserBannerSkeleton /> : user && <UserBanner user={user} authStore={authStore} />}
            <div className="flex flex-col w-1/3 gap-4">
                {isLoading ? (
                    user?.id === authStore.user?.id && <PostCreatorSkeleton />
                ) : (
                    user?.id === authStore.user?.id && <PostCreator newPost={newPost} setNewPost={setNewPost} setPosts={setPosts} posts={posts} />
                )}
                {isLoading ? (
                    <PostsGallerySkeleton />
                ) : (
                    <PostsGallery posts={posts} user={user!} authStore={authStore} setPosts={setPosts} />
                )}
            </div>
        </div>
    )
}