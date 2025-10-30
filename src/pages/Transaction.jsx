import React from "react";
import { Authnav, History, Pageheader, Stats } from "../components";

const Transaction = () => {
	return (
		<section className="bg-slate-100 min-h-screen text-slate-600">
			<Authnav />
			<Pageheader page={"Transactions"} />
			<div className="p-6">
				<Stats />
			</div>
			<div className="p-6">
				<History />
			</div>
		</section>
	);
};

export default Transaction;
