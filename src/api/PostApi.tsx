import axios from "axios";
import type { PostWithoutId, Post } from "../type";
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

//get method
export const getPost = () => {
  return api.get<Post[]>("/posts");
};

export const deletePost = (id: number) => {
  return api.delete(`/posts/${id}`);
};

export const postData = (post: PostWithoutId) => {
  return api.post("/posts", post);
};

export const updateData = (id: number, post: PostWithoutId) => {
  return api.put(`/posts/${id}`, post);
};
