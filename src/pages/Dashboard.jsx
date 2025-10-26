import React from "react";
import { getAccountSettings } from "../constants";

const Dashboard = () => {
	const savedUserSettings = getAccountSettings();
	// console.log(savedUserSettings);
	return <section>Dashboard</section>;
};

export default Dashboard;
