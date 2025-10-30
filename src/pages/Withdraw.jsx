import React from "react";
import { Authnav, Pageheader } from "../components";

const Withdraw = () => {
	return (
		<section className="bg-slate-100 min-h-screen text-slate-600">
			<Authnav />
			<Pageheader page={"Withdrawal"} />
		</section>
	);
};

export default Withdraw;
