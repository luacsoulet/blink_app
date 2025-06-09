"use client";

import dynamic from 'next/dynamic';
import { ProfileSkeleton } from "@/components/skeletons/ProfileSkeleton";

const ProfileContent = dynamic(() => import('@/components/ProfileContent'), {
    loading: () => <ProfileSkeleton />,
    ssr: false
});

export default function ProfilePage() {
    return (
        <div className="flex flex-col items-center min-h-screen py-40 gap-6">
            <ProfileContent />
        </div>
    );
}