import React from "react";
import { Custominput, Logo } from "../components";
import { Link } from "react-router-dom";

const Signin = () => {
	return (
		<section className="p-3 bg-slate-50 relative">
			<div className="bg-[#5162be]/90 absolute w-full h-[350px] top-0 right-0 left-0 bottom-0 z-0 backdrop-blur-sm" />
			<div className="flex flex-col items-center justify-center gap-10 z-1 relative ">
				<span className="pt-10 flex items-center flex-col justify-center gap-3">
					<Logo customClass={"w-[130px]"} />
					<h6 className={`text-[#fff]`}>Grow your portfolio with confidence</h6>
				</span>
				<div className="bg-white shadow-sm py-6 px-8 flex flex-col gap-6 w-full max-w-md mx-auto rounded-sm lg:rounded-md">
					<span className="flex flex-col items-center gap-3 pt-4">
						<h3 className="text-xl text-[#5162be] capitalize font-semibold">
							create new account
						</h3>
						<h6 className="text-[#939393] font-light text-sm">
							Sign up to get started with itrust{" "}
						</h6>
					</span>
					<Custominput optional={true} label={"firstname"} />
					<Custominput optional={true} label={"lastname"} />
					<Custominput optional={true} label={"email"} />
					<Custominput optional={true} label={"username"} />
					<Custominput optional={true} label={"password"} />
					<small className="flex whitespace-nowrap gap-1 text-[#939393] font-light text-sm">
						By registering you agree to the Itrust{" "}
						<Link className="underline text-blue-600">Terms of use</Link>
					</small>
					<button className="bg-[#5162be] text-white h-[40px] capitalize font-semibold mb-4 rounded-sm">
						next
					</button>
				</div>
				<div className="flex flex-col items-center gap-3">
					<small className="text-[#939393] font-light text-sm">
						Already have an account?{" "}
						<Link to={"/signin"} className="underline text-blue-600">
							Signin
						</Link>
					</small>
					<h6 className="text-[#939393] text-md font-normal">
						{" "}
						&copy; {new Date().getFullYear()} Itrust. All Rights Reserved
					</h6>
				</div>
			</div>
		</section>
	);
};

export default Signin;
