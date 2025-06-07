export const UserCardSkeleton = () => {
    return (
        <div className="flex flex-col items-center gap-15 bg-secondary/10 border border-quinary/70 h-fit min-w-1/3 w-full max-w-[400px] py-8 px-10 rounded-lg">
            <div className="flex flex-col items-center justify-center gap-4 w-full">
                <div className="flex items-center justify-center gap-2 w-full">
                    <div className="bg-secondary/20 w-1/2 aspect-square rounded-lg animate-pulse"></div>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 w-full">
                    <div className="bg-secondary/20 h-6 w-32 rounded-md animate-pulse"></div>
                    <div className="bg-secondary/20 h-4 w-48 rounded-md animate-pulse"></div>
                </div>
            </div>
            <div className="bg-secondary/20 h-8 w-24 rounded-md mt-4 animate-pulse"></div>
        </div>
    )
} 