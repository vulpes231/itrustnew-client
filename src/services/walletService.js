import { api } from "../features/interceptors";

export async function getUserWallets() {
	try {
		const response = await api.get("/wallet");
		return response.data.data;
	} catch (error) {
		const errMsg = error.response?.data?.message;
		throw new Error(errMsg);
	}
}
