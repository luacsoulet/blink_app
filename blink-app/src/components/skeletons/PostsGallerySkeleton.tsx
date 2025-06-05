export const PostsGallerySkeleton = () => {
    return (
        <div className="flex flex-col gap-4 w-full animate-pulse">
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col gap-4 bg-quaternary border-2 border-quinary p-5 rounded-2xl animate-pulse">
                    <div className="flex items-center gap-2">
                        <div className="bg-tertiary h-8 w-8 rounded-full"></div>
                        <div className="bg-tertiary h-4 w-32 rounded"></div>
                    </div>
                    <div className="bg-tertiary h-16 w-full rounded"></div>
                </div>
            ))}
        </div>
    );
}