import React from "react";
import { Authnav, Marketstats, Pageheader, Pagetitle } from "../components";
const Market = () => {
	return (
		<section className="min-h-screen bg-slate-100">
			<Authnav />
			<Pagetitle />
			<Pageheader page={"buy & sell"} />
			<div className="p-6">
				<Marketstats />
			</div>
		</section>
	);
};

export default Market;
