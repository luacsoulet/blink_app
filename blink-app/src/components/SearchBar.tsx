"use client";

import { useEffect, useRef, useState } from "react";
import { Search, CircleUserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "@/utils/types";
import { searchUsers } from "@/utils/apiFunctions";

export const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [lastValidQuery, setLastValidQuery] = useState("");
    const [lastValidResults, setLastValidResults] = useState<User[]>([]);
    const searchTimeout = useRef<NodeJS.Timeout | null>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
                if (searchQuery.trim() !== lastValidQuery) {
                    setLastValidQuery(searchQuery.trim());
                    setLastValidResults(searchResults);
                }
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [searchQuery, searchResults, lastValidQuery]);

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }
        setIsSearching(true);
        const results = await searchUsers(searchQuery);
        setSearchResults(results);
        setIsSearching(false);
    };

    const handleFocus = () => {
        if (searchQuery.trim() && searchQuery.trim() === lastValidQuery) {
            setShowResults(true);
            setSearchResults(lastValidResults);
        }
    };

    useEffect(() => {
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }
        if (searchQuery.trim()) {
            if (searchQuery.trim() !== lastValidQuery) {
                searchTimeout.current = setTimeout(handleSearch, 800);
            } else {
                setSearchResults(lastValidResults);
            }
        } else {
            setSearchResults([]);
        }
    }, [searchQuery, lastValidQuery, lastValidResults]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/results?q=${encodeURIComponent(searchQuery.trim())}`);
            setShowResults(false);
            setLastValidQuery(searchQuery.trim());
            setLastValidResults(searchResults);
            setSearchQuery("");
        }
    };

    const handleResultClick = (userId: number) => {
        router.push(`/profile/${userId}`);
        setShowResults(false);
        setLastValidQuery(searchQuery.trim());
        setLastValidResults(searchResults);
        setSearchQuery("");
    };

    return (
        <div ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Search for a user..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setShowResults(true);
                        }}
                        onFocus={handleFocus}
                        className="bg-secondary/10 text-secondary px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-action"
                    />
                    <button
                        type="submit"
                        className="bg-action text-primary px-4 py-2 rounded-lg hover:bg-action/80 transition-all duration-300"
                    >
                        <Search className="w-5 h-5" />
                    </button>
                </div>
                {showResults && (searchQuery.trim() !== "") && (
                    <div className="absolute top-full mt-2 w-full bg-tertiary rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                        {isSearching ? (
                            <div className="p-4 text-center text-secondary/50">
                                Searching...
                            </div>
                        ) : searchResults.length > 0 ? (
                            searchResults.map((result) => (
                                <Link
                                    key={result.id}
                                    href={`/profile/${result.id}`}
                                    onClick={() => handleResultClick(result.id)}
                                >
                                    <div className="flex items-center gap-2 p-4 hover:bg-secondary/10 transition-all duration-300">
                                        <CircleUserRound className="w-8 h-8" />
                                        <div>
                                            <p className="font-bold">{result.username}</p>
                                            <p className="text-sm text-secondary/50">{result.description || "No description"}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="p-4 text-center text-secondary/50">
                                No results found
                            </div>
                        )}
                    </div>
                )}
            </form>
        </div>
    );
} 