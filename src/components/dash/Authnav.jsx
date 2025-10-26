import React from "react";
import { FaUserCircle } from "react-icons/fa";
import {
	MdArrowForward,
	MdArrowForwardIos,
	MdNotifications,
	MdOutlineNotifications,
	MdOutlineSavedSearch,
	MdSearch,
} from "react-icons/md";
import { useLocation } from "react-router-dom";

const Authnav = () => {
	const location = useLocation();

	return (
		<header className="fixed top-0 left-0 w-full bg-white shadow-sm text-gray-600">
			<nav className="border-b border-gray-200 flex items-center justify-between py-5 px-5 md:px-8">
				<div className="flex items-center gap-2">
					<MdArrowForward className="w-6 h-6 text-gray-400" />
					<input
						type="text"
						className="hidden md:flex outline-none rounded-sm bg-gray-300 p-2 h-[40px]"
					/>
				</div>
				<div className="flex items-center gap-2">
					<MdSearch className="w-6 h-6 md:hidden" />
					<figure>
						<img src={null} alt="flag" />
					</figure>
					<MdOutlineNotifications className="w-6 h-6 " />
					<span className="flex items-start md:bg-slate-500/10 mb-0 rounded-full lg:rounded-none">
						<FaUserCircle className="rounded-full w-6 h-6 text-gray-400" />

						<span className="hidden lg:flex flex-col gap-0.5">
							<h3>username</h3>
							<h6>member</h6>
						</span>
					</span>
				</div>
			</nav>
			<div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between py-3 px-5 md:px-8">
				<h3 className="font-normal uppercase text-md text-gray-600">
					Portfolio
				</h3>
				<span className="flex items-center capitalize gap-2">
					<h3 className="text-md text-gray-600">
						{location.pathname.slice(1)}
					</h3>
					<MdArrowForwardIos className="text-gray-400 text-xs" />
					<h6 className="text-sm text-gray-400">Portfolio</h6>
				</span>
			</div>
		</header>
	);
};

export default Authnav;
