"use client";

export const SearchResultsSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {[1, 2, 3, 4, 5, 6].map((index) => (
                <div key={index} className="flex items-start gap-4 bg-secondary/10 border border-quinary/70 p-4 rounded-lg animate-pulse">
                    <div className="bg-secondary/20 w-12 h-12 rounded-full"></div>
                    <div className="flex flex-col gap-2 flex-1">
                        <div className="bg-secondary/20 h-5 w-32 rounded-md"></div>
                        <div className="bg-secondary/20 h-4 w-48 rounded-md"></div>
                        <div className="bg-secondary/20 h-3 w-24 rounded-md"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}