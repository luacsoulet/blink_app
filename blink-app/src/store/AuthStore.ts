import { create } from 'zustand';
import { User } from '@/utils/types';
import { persist } from 'zustand/middleware';

type LoginResponse = {
    token: string;
    user: User;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (response: LoginResponse) => void;
    logout: () => void;
    setLoading: (loading: boolean) => void;
    updateUser: (updatedUser: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isLoading: false,
            isAuthenticated: false,
            login: (response: LoginResponse) => {
                if (!response?.user || !response?.token) return;
                const normalizedUser = {
                    ...response.user,
                    is_admin: Boolean(response?.user?.is_admin ?? false)
                };
                set({
                    user: normalizedUser,
                    token: response.token,
                    isAuthenticated: true,
                    isLoading: false
                });
            },
            logout: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    isLoading: false
                });
            },
            setLoading: (loading: boolean) =>
                set({
                    isLoading: loading
                }),
            updateUser: (updatedUser: Partial<User>) => {
                const currentUser = get().user;
                if (!currentUser) return;

                set({
                    user: {
                        ...currentUser,
                        ...updatedUser
                    }
                });
            }
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated
            }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.setLoading(false);
                    if (state.user) {
                        state.user.is_admin = Boolean(state.user.is_admin);
                    }
                }
            }
        }
    )
); 