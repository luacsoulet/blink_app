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

export interface LoginResponse {
    token: string;
    user: User;
}

export interface AuthStoreType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (response: LoginResponse) => void;
    logout: () => void;
    setLoading: (loading: boolean) => void;
    updateUser: (updatedUser: Partial<User>) => void;
}