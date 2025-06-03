
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