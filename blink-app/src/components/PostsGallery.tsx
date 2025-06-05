import { AuthStoreType, PostType, User } from "@/utils/types"
import { Post } from "./Post"

export const PostsGallery = ({ posts, user, authStore }: { posts: PostType[], user: User, authStore: AuthStoreType }) => {
    return (
        <div className="flex flex-col gap-4">
            {posts.map((post: PostType) => (
                <Post key={post.id} post={post} modify={user?.id === authStore.user?.id} />
            ))}
            {posts.length === 0 && (
                <p className="text-secondary/50 text-center text-lg">No posts yet</p>
            )}
        </div>
    )
}