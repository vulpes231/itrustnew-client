import { api } from "../features/interceptors";

export async function loginUser(formData) {
	try {
		const response = await api.post("/signin", formData);
		return response.data;
	} catch (error) {
		console.log("Login error:", error);

		const errMsg =
			error.response?.data?.message ||
			error.response?.data?.error ||
			error.message ||
			"Login failed. Please try again.";

		throw new Error(errMsg);
	}
}

export async function registerUser(formData) {
	try {
		const response = await api.post("/signup", formData);
		return response.data;
	} catch (error) {
		console.log("Signup error:", error);

		const errMsg =
			error.response?.data?.message ||
			error.response?.data?.error ||
			error.message ||
			"Login failed. Please try again.";

		throw new Error(errMsg);
	}
}
