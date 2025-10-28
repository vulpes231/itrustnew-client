import { api } from "../features/interceptors";

export async function getAsset(queryData) {
	const { page, filterBy, limit } = queryData;
	try {
		const response = await api.get(
			`/asset/?page=${page}&filterBy=${filterBy}&limit=${limit}`
		);
		return response.data.data;
	} catch (error) {
		const errMsg =
			error.response?.data?.message ||
			error.response?.data?.error ||
			error.message ||
			"Fetch assets failed. Please try again.";

		throw new Error(errMsg);
	}
}
