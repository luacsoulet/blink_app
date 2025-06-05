export interface PostType {
    id: number;
    user_id: number;
    content: string;
    username: string;
    created_at: string;
}

export interface User {
    id: number;
    email: string;
    username: string;
    description?: string;
    is_admin: boolean;
    created_at: string;
}

export interface AuthStoreType {
    user: User | null;
    token: string | null;
}