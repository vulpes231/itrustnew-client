export async function sendEmailCode(formData) {
	try {
		const response = await api.post("mail/emailotp", formData);
		return response.data;
	} catch (error) {
		const errMsg =
			error.response?.data?.message ||
			error.response?.data?.error ||
			error.message ||
			"Send code failed. Please try again.";

		throw new Error(errMsg);
	}
}

// export async function send(email) {
// 	try {
// 		const response = await api.post("mail/emailotp", formData);
// 		return response.data;
// 	} catch (error) {
// 		const errMsg =
// 			error.response?.data?.message ||
// 			error.response?.data?.error ||
// 			error.message ||
// 			"Send code failed. Please try again.";

// 		throw new Error(errMsg);
// 	}
// }
