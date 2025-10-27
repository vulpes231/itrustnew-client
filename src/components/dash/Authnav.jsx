import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import {
	MdArrowForward,
	MdOutlineNotifications,
	MdSearch,
	MdMenu,
} from "react-icons/md";
import Dropdown from "./Dropdown";
import { usa } from "../../assets";
import Mobilesidebar from "./Mobilesidebar";
import { motion, AnimatePresence } from "framer-motion";

const Authnav = () => {
	const [user, setUser] = useState(null);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		try {
			const userData = sessionStorage.getItem("user");
			if (userData) {
				setUser(JSON.parse(userData));
			}
		} catch (error) {
			console.error("Error loading user data:", error);
		}
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.pageYOffset;
			setIsScrolled(scrollTop > 10);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
	const closeDropdown = () => setIsDropdownOpen(false);

	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
	const closeSidebar = () => setIsSidebarOpen(false);

	useEffect(() => {
		if (isSidebarOpen) {
			closeDropdown();
		}
	}, [isSidebarOpen]);

	useEffect(() => {
		if (isDropdownOpen) {
			closeSidebar();
		}
	}, [isDropdownOpen]);

	const navVariants = {
		hidden: { y: -100, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.3,
				ease: "easeOut",
			},
		},
	};

	const iconVariants = {
		hover: { scale: 1.1, color: "#5162be" },
		tap: { scale: 0.95 },
	};

	return (
		<motion.header
			className={`fixed top-0 left-0 w-full bg-white text-gray-600 flex items-center justify-center z-40 transition-all duration-300 ${
				isScrolled ? "shadow-lg" : "shadow-sm"
			}`}
			initial="hidden"
			animate="visible"
			variants={navVariants}
		>
			<nav className="flex items-center justify-between py-4 px-5 md:px-8 w-full max-w-8xl">
				{/* Left Section - Menu and Search */}
				<div className="flex items-center gap-3 md:gap-4">
					<motion.button
						onClick={toggleSidebar}
						className="p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
						variants={iconVariants}
						whileHover="hover"
						whileTap="tap"
					>
						<MdMenu className="w-6 h-6 text-gray-600" />
					</motion.button>

					<div className="relative hidden md:flex">
						<MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
						<input
							type="text"
							placeholder="Search..."
							className="w-64 lg:w-80 outline-none rounded-lg bg-gray-100 pl-10 pr-4 py-2 h-[40px] text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
						/>
					</div>
				</div>

				{/* Right Section - Icons and User Info */}
				<div className="flex items-center gap-3 md:gap-4">
					{/* Search Icon - Mobile Only */}
					<motion.button
						className="p-1 rounded-lg hover:bg-gray-100 md:hidden"
						variants={iconVariants}
						whileHover="hover"
						whileTap="tap"
					>
						<MdSearch className="w-6 h-6 text-gray-600" />
					</motion.button>

					{/* Country Flag */}
					<motion.figure
						className="p-1 rounded-lg hover:bg-gray-100 cursor-pointer"
						variants={iconVariants}
						whileHover="hover"
						whileTap="tap"
					>
						<img
							src={usa}
							alt="USA flag"
							className="w-5 h-5 rounded-full object-cover"
						/>
					</motion.figure>

					{/* Notifications */}
					<motion.button
						className="relative p-1 rounded-lg hover:bg-gray-100"
						variants={iconVariants}
						whileHover="hover"
						whileTap="tap"
					>
						<MdOutlineNotifications className="w-6 h-6 text-gray-600" />
						<span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
					</motion.button>

					{/* User Profile */}
					<motion.div
						className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-lg p-2 cursor-pointer transition-colors duration-200"
						onClick={toggleDropdown}
						whileHover={{ backgroundColor: "rgba(229, 231, 235, 1)" }}
						whileTap={{ scale: 0.95 }}
					>
						<FaUserCircle className="w-7 h-7 lg:w-8 lg:h-8 text-gray-500" />

						<div className="hidden lg:flex flex-col gap-0.5">
							<h3 className="font-medium text-sm capitalize">
								{user?.credentials?.username || "Guest"}
							</h3>
							<h6 className="font-light text-xs text-gray-500 capitalize">
								{user?.role || "Member"}
							</h6>
						</div>
					</motion.div>
				</div>
			</nav>

			{/* Dropdown and Sidebar Components */}
			<Dropdown isOpen={isDropdownOpen} onClose={closeDropdown} />
			<Mobilesidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
		</motion.header>
	);
};

export default Authnav;
