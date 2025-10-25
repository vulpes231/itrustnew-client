import { api } from "../features/interceptors";

export async function getCountries() {
	try {
		const response = await api.get("/location/countries");
		return response.data.data;
	} catch (error) {
		console.log("Error in getCountries:", error);
		console.log("Error response:", error.response);

		const errMsg =
			error.response?.data?.message ||
			error.response?.data?.error ||
			error.message ||
			"Failed to get countries. Please try again.";

		throw new Error(errMsg);
	}
}

export async function getStates() {
	try {
		const response = await api.get("/location/states");
		return response.data.data;
	} catch (error) {
		const errMsg =
			error.response?.data?.message ||
			error.response?.data?.error ||
			error.message ||
			"Failed to get states. Please try again.";

		throw new Error(errMsg);
	}
}

export async function getFilteredStates(countryId) {
	try {
		const response = await api.get(`/location/state/${countryId}`);
		return response.data.data;
	} catch (error) {
		const errMsg =
			error.response?.data?.message ||
			error.response?.data?.error ||
			error.message ||
			"Failed to get states. Please try again.";

		throw new Error(errMsg);
	}
}

export async function getNationalities() {
	try {
		const response = await api.get("/location/nationalities");
		return response.data.data;
	} catch (error) {
		const errMsg =
			error.response?.data?.message ||
			error.response?.data?.error ||
			error.message ||
			"Failed to get nations. Please try again.";

		throw new Error(errMsg);
	}
}
export async function getCurrencies() {
	try {
		const response = await api.get("/currency");
		return response.data.data;
	} catch (error) {
		const errMsg =
			error.response?.data?.message ||
			error.response?.data?.error ||
			error.message ||
			"Failed to get currencies. Please try again.";

		throw new Error(errMsg);
	}
}
