export const UserBannerSkeleton = () => (
    <div className="flex flex-col w-3/4 gap-4 border-2 border-quinary rounded-2xl overflow-hidden animate-pulse">
        <div className="relative">
            <div className="bg-quaternary w-full h-[120px]"></div>
            <span className="absolute top-5 left-5 bg-quaternary w-[120px] h-[120px] rounded-lg"></span>
        </div>
        <div className="flex flex-row justify-between p-5">
            <div className="flex flex-col gap-2">
                <div className="bg-quaternary h-8 w-40 rounded"></div>
                <div className="bg-quaternary h-4 w-60 rounded"></div>
                <div className="bg-quaternary h-4 w-32 rounded"></div>
            </div>
        </div>
    </div>
);