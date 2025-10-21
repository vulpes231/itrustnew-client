import React from "react";
// import { Navbar } from "./components";
import { Route, Routes } from "react-router-dom";
import { Landing, Signin, Signup } from "./pages";

const App = () => {
	return (
		<div>
			{/* <Navbar /> */}
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/signin" element={<Signin />} />
			</Routes>
		</div>
	);
};

export default App;
