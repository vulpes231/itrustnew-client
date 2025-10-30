import { api } from "../features/interceptors";

export async function depositFunds(formData) {
	try {
		const response = await api.post("/transaction/deposit", formData);
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

export async function withdrawFunds(formData) {
	try {
		const response = await api.post("/transaction/withdraw", formData);
		// console.log(response.data);
		return response.data.data;
	} catch (error) {
		const errMsg =
			error.response?.data?.message ||
			error.response?.data?.error ||
			error.message ||
			"Withdrawal failed. Please try again.";

		throw new Error(errMsg);
	}
}

export async function getUserTransactions() {
	try {
		const response = await api.get("/transaction");

		return response.data.data;
	} catch (error) {
		const errMsg =
			error.response?.data?.message ||
			error.response?.data?.error ||
			error.message ||
			"Failed to get user transactions. Please try again.";

		throw new Error(errMsg);
	}
}
