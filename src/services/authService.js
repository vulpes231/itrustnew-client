import { api } from "../features/interceptors";

export async function loginUser(formData) {
	try {
		const response = await api.post("/signin", formData);
		// console.log(response.data);
		return { user: response.data.data, token: response.data.token };
	} catch (error) {
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
		// console.log(error);
		const errMsg =
			error.response?.data?.message ||
			error.response?.data?.error ||
			error.message ||
			"Login failed. Please try again.";

		throw new Error(errMsg);
	}
}

export async function sendEmailCode(email) {
	try {
		const response = await api.post("/mail/emailotp", { email });
		return response.data;
	} catch (error) {
		const errMsg =
			error.response?.data?.message ||
			error.response?.data?.error ||
			error.message ||
			"Login failed. Please try again.";

		throw new Error(errMsg);
	}
}
