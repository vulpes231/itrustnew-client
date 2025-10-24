import React from "react";
// import { Navbar } from "./components";
import { Route, Routes } from "react-router-dom";
import {
	Contact,
	Landing,
	Personal,
	Signin,
	Signup,
	Verifymail,
	Verifyotp,
} from "./pages";

const App = () => {
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
			</Routes>
		</div>
	);
};

export default App;
