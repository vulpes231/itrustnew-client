import React from "react";
import { getAccountSettings } from "../constants";
import { Authnav, Market, Pageheader, Portfolio } from "../components";

const Dashboard = () => {
	const savedUserSettings = getAccountSettings();

	return (
		<section className="bg-slate-100 min-h-screen ">
			<Authnav />
			<Pageheader page={"portfolio"} />
			<div className="p-6">
				<Portfolio />
			</div>
			<div>
				<Market />
			</div>
		</section>
	);
};

export default Dashboard;
