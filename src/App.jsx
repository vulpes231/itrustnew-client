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
	Verifymail,
	Verifyotp,
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
			</Routes>
		</div>
	);
};

export default App;
