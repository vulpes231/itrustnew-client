export const navLinks = [
	// {
	// 	id: "home",
	// 	name: "home",
	// },
	{
		id: "services",
		name: "services",
	},
	{
		id: "features",
		name: "features",
	},
	{
		id: "plans",
		name: "plans",
	},
	{
		id: "reviews",
		name: "reviews",
	},
	{
		id: "team",
		name: "team",
	},
	{
		id: "contact",
		name: "contact",
	},
];

export const pallete = {
	colors: {
		darkText: "text-[#212529]",
		mainBg: "bg-[#5162be]",
		greyText: "text-[#878a99]",
	},
	borders: {
		light: "border-[#e9ebec]",
	},
};

export function handleFormChange(e, form, setForm) {
	const { name, value } = e.target;
	setForm({ ...form, [name]: value });
}

export function getAccessToken() {
	return sessionStorage.getItem("token") || null;
}

export function getAccountSettings() {
	return JSON.parse(sessionStorage.getItem("user")) || null;
}

export const devUrl = "http://localhost:5000";
export const liveUrl = "https://trustcloud.server";

export const formatEmail = (email) => {
	if (!email || typeof email !== "string") return "";

	const parts = email.split("@");
	if (parts.length !== 2) return email; // Not a valid email format

	const [username, domain] = parts;

	// Show first 2 characters, then ***, then the domain
	return `${username.slice(0, 2)}***@${domain}`;
};
