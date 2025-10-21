import React from "react";
import { Custominput, Logo } from "../components";

const Signup = () => {
	return (
		<section className="mt-[70px]">
			<div>
				<span>
					<Logo />
					<h6>Started investing smartly</h6>
				</span>
				<div className="bg-white shadow-sm p-6 flex flex-col gap-6">
					<span>
						<h3>create new account</h3>
						<h6>sign up to get started with itrust </h6>
					</span>
					<Custominput label={"email"} />
				</div>
			</div>
		</section>
	);
};

export default Signup;
