import React from "react";
// import { Navbar } from "./components";
import { Route, Routes } from "react-router-dom";
import {
	Contact,
	Dashboard,
	Landing,
	Personal,
	Signin,
	Signup,
	Transaction,
	Verifymail,
	Verifyotp,
	Wallet,
} from "./pages";
import { getAccessToken } from "./constants";

const App = () => {
	const token = getAccessToken();
	return (
		<div>
			{/* <Navbar /> */}
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
			</Routes>
		</div>
	);
};

export default App;
