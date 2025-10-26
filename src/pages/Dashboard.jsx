import React from "react";
import { getAccountSettings } from "../constants";
import { Authnav } from "../components";

const Dashboard = () => {
	const savedUserSettings = getAccountSettings();

	return (
		<section className="bg-slate-50 min-h-screen">
			<Authnav />
		</section>
	);
};

export default Dashboard;
