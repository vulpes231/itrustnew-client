import axios from "axios";
import { devUrl, getAccessToken, liveUrl } from "../constants";

export const api = axios.create({
	baseURL: liveUrl,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use(
	(config) => {
		const token = getAccessToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			window.location.href = "/signin";
		}
		return Promise.reject(error);
	}
);
