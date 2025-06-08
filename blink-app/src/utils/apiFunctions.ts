export const getPosts = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}v1/posts`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

export const login = async (email: string, password: string) => {
    try {
        const body = { email, password };
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}v1/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            console.error('Login failed:', response.status);
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error logging in:', error);
        return null;
    }
}

export const register = async (username: string, email: string, password: string) => {
    try {
        const body = { username, email, password };
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}v1/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            return await login(email, password);
        }

        return null;
    } catch (error) {
        console.error('Error registering:', error);
        return null;
    }
}

export const verifyToken = async (token: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}v1/auth/verify-token`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.status === 200;
    } catch (error) {
        console.error('Error verifying token:', error);
        return false;
    }
}

export const getUser = async (id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}v1/users/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

export const getUsers = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}v1/users`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
}

export const getUserPosts = async (id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}v1/users/${id}/posts`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user posts:', error);
        return null;
    }
}

export const modifyUser = async (id: string, username: string, email: string, description: string, token: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}v1/users/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, description })
        });
        return response.json();
    } catch (error) {
        console.error('Error modifying user:', error);
        return null;
    }
}

export const deleteUser = async (id: string, token: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}v1/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.status === 200;
    } catch (error) {
        console.error('Error deleting user:', error);
        return false;
    }
}

export const createPost = async (content: string, token: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}v1/posts`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        });
        return response.json();
    } catch (error) {
        console.error('Error creating post:', error);
        return null;
    }
}

export const modifyPost = async (id: string, content: string, token: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}v1/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        });
        return response.json();
    } catch (error) {
        console.error('Error modifying post:', error);
        return null;
    }
}

export const deletePost = async (id: string, token: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}v1/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.status === 200;
    } catch (error) {
        console.error('Error deleting post:', error);
        return false;
    }
}

export const searchUsers = async (username: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}v1/users/search?username=${encodeURIComponent(username)}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching users:', error);
        return [];
    }
}