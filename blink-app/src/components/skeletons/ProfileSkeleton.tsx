import { UserBannerSkeleton } from "@/components/skeletons/UserBannerSkeleton";
import { PostsGallerySkeleton } from "@/components/skeletons/PostsGallerySkeleton";

export function ProfileSkeleton() {
    return (
        <>
            <UserBannerSkeleton />
            <div className="flex flex-col w-2/3 gap-4">
                <PostsGallerySkeleton />
            </div>
        </>
    );
} 