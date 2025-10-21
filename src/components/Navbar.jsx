import React, { useState } from "react";
import Logo from "./Logo";
import { navLinks, pallete } from "../constants";
import { Link as ScrollLink } from "react-scroll";
import { MdClose, MdMenu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectNavSlice, setToggle } from "../features/navSlice";
import { Link } from "react-router-dom";
import Mobilemenu from "./nav/Mobilemenu";

const Navbar = () => {
	const dispatch = useDispatch();
	const [activeLink, setActiveLink] = useState("home");

	const { toggle } = useSelector(selectNavSlice);

	const handleSetActive = (linkId) => {
		setActiveLink(linkId);
	};

	return (
		<header className="fixed top-0 w-full flex items-center justify-center p-3 bg-[#fff] shadow-sm lg:bg-transparent lg:shadow-none z-10">
			<nav className="max-w-6xl mx-auto w-full flex items-center justify-between">
				<Logo />
				<span className="hidden lg:flex items-center gap-6">
					<Link
						to={"/"}
						onClick={() => {
							handleSetActive("home");
						}}
						className={`${
							activeLink === "home"
								? "text-[#D69E2E]"
								: `${pallete.colors.darkText}`
						} font-semibold text-sm capitalize cursor-pointer`}
					>
						Home
					</Link>
					{navLinks.map((link) => {
						return (
							<ScrollLink
								key={link.id}
								activeClass={activeLink}
								to={link.id}
								spy={true}
								smooth={true}
								offset={50}
								duration={500}
								onClick={() => handleSetActive(link.id)}
								className={`${
									activeLink === link.id
										? "text-[#D69E2E]"
										: `${pallete.colors.darkText}`
								} font-semibold text-sm capitalize cursor-pointer`}
							>
								{link.name}
							</ScrollLink>
						);
					})}
				</span>
				<span className="hidden lg:flex items-center gap-2">
					<Link
						to={"/signin"}
						className={`h-[43px] w-[89px] font-medium text-sm rounded-md ${pallete.colors.darkText} flex items-center justify-center`}
					>
						Sign in
					</Link>
					<Link
						to={"/signup"}
						className={`${pallete.colors.mainBg} h-[43px] w-[89px] font-medium text-sm text-[#fff] rounded-md flex items-center justify-center`}
					>
						Sign Up
					</Link>
				</span>
				<span className="lg:hidden">
					<button
						onClick={() => dispatch(setToggle())}
						className={`border ${
							pallete.borders.light
						} py-0.5 px-2 rounded-sm ${toggle ? "border-2 border-black" : ""}`}
					>
						<MdMenu className="w-7 h-7" />
					</button>
				</span>
			</nav>
			{toggle && <Mobilemenu onClose={() => dispatch(setToggle())} />}
		</header>
	);
};

export default Navbar;
