import { api } from "../features/interceptors";

export async function openPosition(formData) {
	try {
		const response = await api.post("/trade", formData);
		// console.log(response.data);
		return response.data.data;
	} catch (error) {
		const errMsg =
			error.response?.data?.message ||
			error.response?.data?.error ||
			error.message ||
			"Open position failed. Please try again.";

		throw new Error(errMsg);
	}
}
