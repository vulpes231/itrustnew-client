import { api } from "../features/interceptors";

export async function depositFunds(formData) {
	try {
		const response = await api.post("/deposit", formData);
		// console.log(response.data);
		return response.data.data;
	} catch (error) {
		const errMsg =
			error.response?.data?.message ||
			error.response?.data?.error ||
			error.message ||
			"Deposit failed. Please try again.";

		throw new Error(errMsg);
	}
}
