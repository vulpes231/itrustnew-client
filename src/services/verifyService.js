export async function verifyMailCode(formData) {
	try {
		const response = await api.post("code/mail", formData);
		return response.data;
	} catch (error) {
		const errMsg =
			error.response?.data?.message ||
			error.response?.data?.error ||
			error.message ||
			"Email verification failed. Please try again.";

		throw new Error(errMsg);
	}
}

export async function verifyTwoFaCode(formData) {
	try {
		const response = await api.post("code/otp", formData);
		return response.data;
	} catch (error) {
		const errMsg =
			error.response?.data?.message ||
			error.response?.data?.error ||
			error.message ||
			"Email verification failed. Please try again.";

		throw new Error(errMsg);
	}
}
