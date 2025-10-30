import React from "react";
// import { Navbar } from "./components";
import { Route, Router, Routes } from "react-router-dom";
import {
	Contact,
	Dashboard,
	Deposit,
	Landing,
	Personal,
	Signin,
	Signup,
	Transaction,
	Verifymail,
	Verifyotp,
	Wallet,
	Withdraw,
} from "./pages";
import { getAccessToken } from "./constants";
import { ScrollToTop } from "./components";

const App = () => {
	const token = getAccessToken();
	return (
		<div>
			{/* <Navbar /> */}

			<ScrollToTop />

			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/signin" element={<Signin />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/personal" element={<Personal />} />
				<Route path="/verifyemail" element={<Verifymail />} />
				<Route path="/twofa" element={<Verifyotp />} />
				<Route
					path="/dashboard"
					element={!token ? <Signin /> : <Dashboard />}
				/>
				<Route path="/wallet" element={!token ? <Signin /> : <Wallet />} />
				<Route
					path="/transaction"
					element={!token ? <Signin /> : <Transaction />}
				/>
				<Route path="/deposit" element={!token ? <Signin /> : <Deposit />} />
				<Route path="/withdraw" element={!token ? <Signin /> : <Withdraw />} />
			</Routes>
		</div>
	);
};

export default App;
