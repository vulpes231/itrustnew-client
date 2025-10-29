import React from "react";
import { getAccountSettings } from "../constants";
import {
	Authnav,
	Dashfoot,
	Market,
	Pageheader,
	Portfolio,
} from "../components";

const Dashboard = () => {
	const savedUserSettings = getAccountSettings();

	return (
		<section className="bg-slate-100 min-h-screen ">
			<Authnav />
			<Pageheader page={"portfolio"} />
			<div className="p-6">
				<Portfolio />
			</div>
			<div className="">
				<Market />
			</div>
			<div className="pb-5">
				<Dashfoot />
			</div>
		</section>
	);
};

export default Dashboard;
