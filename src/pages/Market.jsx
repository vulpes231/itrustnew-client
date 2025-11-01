import React from "react";
import {
	Authnav,
	Marketchart,
	Marketstats,
	Pageheader,
	Pagetitle,
} from "../components";
import Tradeform from "../components/content/Tradeform";
const Market = () => {
	return (
		<section className="min-h-screen bg-slate-100">
			<Authnav />
			<Pagetitle />
			<Pageheader page={"buy & sell"} />
			<div className="p-6">
				<Marketstats />
			</div>
			<div className="p-6">
				<Marketchart />
			</div>
			<div className="p-6">
				<Tradeform />
			</div>
			{/* <div className="px-6 flex flex-col lg:flex-row gap-6">
				<div className="lg:w-2/3">
					
				</div>
				<div className="lg:w-1/3">
					
				</div>
			</div> */}
		</section>
	);
};

export default Market;
