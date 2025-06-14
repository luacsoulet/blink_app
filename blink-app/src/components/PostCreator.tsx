import { createPost } from "@/utils/apiFunctions";
import { useAuthStore } from "@/store/AuthStore";
import { PostType } from "@/utils/types";

export const PostCreator = ({
    newPost,
    setNewPost,
    setPosts,
    posts
}: {
    newPost: string,
    setNewPost: (value: string) => void,
    setPosts: (posts: PostType[]) => void,
    posts: PostType[]
}) => {
    const { token, user } = useAuthStore();

    const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!token || !user) return;

        const response = await createPost(newPost, token);
        if (response) {
            const newPostData: PostType = {
                id: response.id,
                user_id: user.id,
                content: response.content,
                username: user.username,
                created_at: new Date().toISOString()
            };

            setPosts([newPostData, ...posts]);
            setNewPost("");
        }
    }

    return (
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
    )
}