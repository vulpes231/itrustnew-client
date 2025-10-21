import React, { useEffect, useRef } from "react";
import { navLinks, pallete } from "../../constants";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Mobilemenu = ({ onClose }) => {
	const mobileMenuRef = useRef();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				mobileMenuRef.current &&
				!mobileMenuRef.current.contains(event.target)
			) {
				onClose();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [onClose]);
	return (
		<div
			ref={mobileMenuRef}
			className="flex flex-col gap-4 fixed top-[65px] bg-white shadow-sm p-6 w-full lg:hidden"
		>
			<Link className="capitalize" to={"/"}>
				home
			</Link>
			{navLinks.map((link) => {
				return (
					<ScrollLink onClick={onClose} className="capitalize">
						{link.name}
					</ScrollLink>
				);
			})}
			<span className="flex items-center gap-2">
				<Link
					to={"/signin"}
					className={`h-[43px] w-[89px] font-medium text-sm rounded-md ${pallete.colors.darkText} flex items-center justify-center border border-[#5162be] rounded-md`}
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
		</div>
	);
};

export default Mobilemenu;
