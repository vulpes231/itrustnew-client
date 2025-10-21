import React from "react";
import { logo } from "../assets";
import { Link } from "react-router-dom";

const Logo = ({ customClass }) => {
	return (
		<Link to={"/"}>
			<img src={logo} alt="itrust-logo" className={`${customClass}`} />
		</Link>
	);
};

export default Logo;
