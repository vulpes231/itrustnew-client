import React from "react";
import {
	Authnav,
	Pageheader,
	Pagetitle,
	Chartview,
	Slider,
	RecentActivity,
	History,
	Walletdisplay,
} from "../components";

const Wallet = () => {
	return (
		<section className="bg-slate-100 min-h-screen">
			<Authnav />
			<Pageheader page={"Wallets"} />
			<Pagetitle />
			<div className=" flex flex-col lg:flex-row w-full gap-6 p-6">
				<div className="flex flex-col gap-6 w-full lg:w-2/3">
					<Chartview />

					<Slider />

					<History />
				</div>
				<div className="flex flex-col gap-6 lg:w-1/3">
					<div className="">
						<Walletdisplay />
					</div>
					<div className="bg-white shadow-md rounded-md">
						<RecentActivity />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Wallet;
