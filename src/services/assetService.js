import { api } from "../features/interceptors";

export async function getAssets(queryData) {
	const { page, filterBy, limit, sortBy } = queryData;
	try {
		const response = await api.get(
			`/asset/?page=${page}&filterBy=${filterBy}&limit=${limit}&sortBy=${sortBy}`
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

export async function searchAssets(query) {
	try {
		const response = await api.get(`/asset/search/?query=${query}`);
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
export async function getAssetInfo(assetId) {
	try {
		const response = await api.get(`/asset/${assetId}`);
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
