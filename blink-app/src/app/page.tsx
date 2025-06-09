"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getPosts, getUsers } from "@/utils/apiFunctions";
import { PostType, User } from "@/utils/types";
import { useAuthStore } from "@/store/AuthStore";
import { UserCard } from "@/components/UserCard";
import { UserCardSkeleton } from "@/components/skeletons/UserCardSkeleton";
import { PostsGallery } from "@/components/PostsGallery";
import { PostsGallerySkeleton } from "@/components/skeletons/PostsGallerySkeleton";
import { PostCreator } from "@/components/PostCreator";
import { PostCreatorSkeleton } from "@/components/skeletons/PostCreatorSkeleton";

export default function Home() {
  const authStore = useAuthStore();
  const { user } = authStore;
  const [posts, setPosts] = useState<PostType[]>([]);
  const [newPost, setNewPost] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      setPosts(posts);
      setIsLoading(false);
    }
    fetchPosts();
  }, []);

  const defaultUser = {
    id: 1,
    username: "John Doe",
    email: "john.doe@example.com",
    description: "I am a software engineer",
    is_admin: false,
    created_at: new Date().toISOString(),
  }

  return (
    <div className="flex items-start justify-center h-screen bg-primary text-secondary gap-4 mt-50 p-4">
      <div className="hidden gap-4 p-4 xl:w-1/3 md:w-1/4 lg:w-1/3 sm:flex ">
        {user ?
          isLoading ?
            <UserCardSkeleton />
            :
            <UserCard user={user} />
          :
          isLoading ?
            <UserCardSkeleton />
            :
            <UserCard user={null} />}
      </div>
      <div className="flex w-full flex-col m-4 items-center justify-center gap-4 w-1/3 md:w-1/2 sm:w-1/2 xs:w-1/2">
        {user ? (
          isLoading ?
            <PostCreatorSkeleton />
            :
            <PostCreator
              posts={posts}
              setPosts={setPosts}
              newPost={newPost}
              setNewPost={setNewPost}
            />
        ) : (
          isLoading ?
            <PostCreatorSkeleton />
            :
            (
              <div className="flex items-center justify-center gap-4 bg-secondary/10 border border-quinary/70 h-fit min-w-1/3 w-full max-w-[400px] py-2 px-4 rounded-lg transition-all duration-300">
                <h1 className="text-xl font-bold">Login to create posts</h1>
                <Link href="/auth" className="bg-action text-primary p-2 text-center rounded-md w-fit py-1 px-4 hover:bg-action/80 hover:scale-105 active:scale-95 transition-all duration-300">Login</Link>
              </div>
            )
        )}
        {
          isLoading ? (
            <PostsGallerySkeleton />
          ) : (
            <PostsGallery posts={posts} user={defaultUser} authStore={authStore} setPosts={setPosts} allowModify={false} />
          )
        }
      </div>
      <div className="hidden flex-col items-center justify-center gap-4 w-1/3 md:flex xs:hidden"></div>
    </div>
  )
}
