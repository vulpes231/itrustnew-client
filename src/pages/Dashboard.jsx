import React from "react";
import { getAccountSettings } from "../constants";
import { Authnav, Pageheader } from "../components";

const Dashboard = () => {
	const savedUserSettings = getAccountSettings();

	return (
		<section className="bg-slate-50 min-h-screen ">
			<Authnav />
			<Pageheader page={"portfolio"} />
		</section>
	);
};

export default Dashboard;
