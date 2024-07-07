import instance from "../utils/axiosClient";

export const fetchPosts = async ({ pageParam = 0 }) => {
  const start = pageParam * 6;
  const end = start + 6;
  const response = await instance.get(`/posts?start=${start}&end=${end}`);
  return response.data;
};
