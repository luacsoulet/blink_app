"use client";

import dynamic from 'next/dynamic';
import { SearchResultsSkeleton } from "@/components/skeletons/SearchResultsSkeleton";

const ResultsContent = dynamic(() => import('@/components/ResultsContent'), {
    loading: () => <SearchResultsSkeleton />,
    ssr: false
});

export default function ResultsPage() {
    return (
        <div className="flex flex-col items-center min-h-screen py-40">
            <ResultsContent />
        </div>
    );
} 