import { AuthStoreType, PostType, User } from "@/utils/types"
import { Post } from "./Post"

export const PostsGallery = ({ posts, user, authStore, setPosts }: {
    posts: PostType[],
    user: User,
    authStore: AuthStoreType,
    setPosts: (posts: PostType[]) => void
}) => {
    return (
        <div className="flex flex-col gap-4">
            {posts.map((post: PostType) => (
                <Post key={post.id} post={post} modify={user?.id === authStore.user?.id} setPosts={setPosts} posts={posts} />
            ))}
            {posts.length === 0 && (
                <p className="text-secondary/50 text-center text-lg">No posts yet</p>
            )}
        </div>
    )
}