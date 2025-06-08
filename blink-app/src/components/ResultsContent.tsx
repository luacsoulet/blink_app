"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { searchUsers } from "@/utils/apiFunctions";
import { User } from "@/utils/types";
import { SearchResults } from "@/components/SearchResults";
import { SearchResultsSkeleton } from "@/components/skeletons/SearchResultsSkeleton";

export default function ResultsContent() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const searchParams = useSearchParams();
    const query = searchParams.get("q");

    useEffect(() => {
        const fetchUsers = async () => {
            if (!query) {
                setUsers([]);
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            const results = await searchUsers(query);
            setUsers(results);
            setIsLoading(false);
        };
        fetchUsers();
    }, [query]);

    return (
        <>
            <h1 className="text-2xl font-bold mb-8">
                {isLoading ? (
                    "Searching..."
                ) : (
                    `Results for "${query}"`
                )}
            </h1>
            {isLoading ? <SearchResultsSkeleton /> : <SearchResults users={users} />}
        </>
    );
} 