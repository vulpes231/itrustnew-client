import React from "react";
import { Custominput, Logo } from "../components";
import { Link } from "react-router-dom";
import { pallete } from "../constants";

const Signin = () => {
	return (
		<section className="p-3 bg-slate-50 relative h-screen">
			<div className="bg-[#5162be]/90 absolute w-full h-[350px] top-0 right-0 left-0 bottom-0 z-0 backdrop-blur-sm" />
			<div className="flex flex-col items-center justify-center gap-10 z-1 relative ">
				<span className="pt-10 flex items-center flex-col justify-center gap-3">
					<Logo customClass={"w-[130px]"} />
					<h6 className={`text-[#fff]`}>Grow your portfolio with confidence</h6>
				</span>
				<div className="bg-white shadow-sm py-6 px-8 flex flex-col gap-6 w-full max-w-md mx-auto rounded-sm lg:rounded-md">
					<span className="flex flex-col items-center gap-3 pt-4">
						<h3 className="text-xl text-[#5162be] capitalize font-semibold">
							welcome back!
						</h3>
						<h6 className="text-[#939393] font-light text-sm">
							Sign in to continue with itrust{" "}
						</h6>
					</span>

					<Custominput
						// optional={true}
						label={"email"}
						placeHolder={"Enter email"}
					/>

					<Custominput
						// optional={true}
						label={"password"}
						placeHolder={"Enter password"}
					/>

					<div className="flex items-center justify-between">
						<span className="flex items-center gap-1">
							<input type="checkbox" className={`${pallete.borders.light}`} />
							<small>remember me</small>
						</span>
						<Link>Forgot password</Link>
					</div>

					<button className="bg-[#5162be] text-white h-[40px] capitalize font-semibold mb-4 rounded-sm">
						sign in
					</button>
				</div>
				<div className="flex flex-col items-center gap-3">
					<small className="text-[#212529] font-light text-sm flex items-center gap-1">
						Don't have an account?
						<Link
							to={"/signup"}
							className="underline text-[#5162be] font-semibold"
						>
							Signup
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
