import instance from "./axios";

const fetchPosts = async ({ pageParam }) => {
  const start = pageParam * 6;
  const end = start + 6;
  const response = await instance.get(`/posts?start=${start}&end=${end}`);
  return response.data;
};

export default fetchPosts;
