import React from "react";
import { pallete } from "../constants";
import { Link } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { Navbar } from "../components";

const Landing = () => {
	return (
		<section className="mt-[65px] p-1 z-10">
			<Navbar />
			{/* relative z-10 */}
			<div className="bg-overlay-pattern absolute w-full h-screen top-0 right-0 left-0 bottom-0 z-0" />
			<div className="flex flex-col gap-6 items-center justify-center py-16 lg:py-28 relative z-1">
				<h3
					className={`text-3xl lg:text-4xl font-bold ${pallete.colors.darkText} text-center lg:max-w-xl lg:mx-auto leading-10 lg:leading-14`}
				>
					The better way to manage your portfolio with
					<span className={`text-[#D69E2E]`}> Itrust</span>
				</h3>
				<h6
					className={`${pallete.colors.greyText} text-center w-full max-w-3xl mx-auto`}
				>
					Itrust is a fully responsive, premium investment app designed to
					empower users to grow, manage, and track their wealth effortlessly.
					Built with modern frameworks, iTrust combines powerful financial
					tools, real-time insights, and an intuitive interface to deliver a
					seamless investment experience across all devices.
				</h6>
				<span className="flex items-center gap-4">
					<Link
						to={"/signup"}
						className={`flex items-center justify-center gap-2 capitalize h-[43px] ${pallete.colors.mainBg} text-[#fff] w-[138px] rounded-sm hover:opacity-90 active:scale-95 transition-all`} // Added hover and active states
					>
						get started <MdArrowForward />
					</Link>
					<Link
						to={"/plans"} // Add actual route for plans
						className={`flex items-center justify-center gap-2 capitalize h-[43px] text-[#fff] w-[138px] rounded-sm bg-red-400 hover:opacity-90 active:scale-95 transition-all`}
					>
						view plans <IoMdEye />
					</Link>
				</span>
			</div>
		</section>
	);
};

export default Landing;
