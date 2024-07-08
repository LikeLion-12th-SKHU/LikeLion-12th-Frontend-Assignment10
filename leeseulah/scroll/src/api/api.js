import axios from "axios";

export const fetchPosts = async ({ start = 0, end = 6 }) => {
  try {
    const response = await axios.get(
      `https://hj-devlog.vercel.app/api/posts?start=${start}&end=${end}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching posts");
  }
};
