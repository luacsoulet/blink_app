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
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error registering:', error);
        return null;
    }
}

export const verifyToken = async (token: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}v1/auth/verify`, {
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