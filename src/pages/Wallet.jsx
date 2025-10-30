import React from "react";
import { Authnav, Pageheader } from "../components";

const Wallet = () => {
	return (
		<section className="bg-slate-100 min-h-screen">
			<Authnav />
			<Pageheader page={"Wallets"} />
		</section>
	);
};

export default Wallet;
