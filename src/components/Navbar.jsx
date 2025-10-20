import React from "react";
import Logo from "./Logo";
import { navLinks } from "../constants";
import { Link as ScrollLink } from "react-scroll";

const Navbar = () => {
	return (
		<header>
			<nav>
				<Logo />
				<span>
					{navLinks.map((link) => {
						return <ScrollLink key={link.id}>{link.name}</ScrollLink>;
					})}
				</span>
			</nav>
		</header>
	);
};

export default Navbar;
