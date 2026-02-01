import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: import.meta.env.VITE_APP_GITHUB_API_KEY
      ? `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
      : "",
  },
});

export const fetchUserData = async (username) => {
  const response = await api.get(`/users/${username}`);
  return response.data;
};

export const advancedSearch = async (query, page = 1) => {
  const response = await api.get(`/search/users?q=${query}&page=${page}`);
  return response.data;
};
