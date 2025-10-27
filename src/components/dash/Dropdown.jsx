import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CgSupport } from "react-icons/cg";
import { FaCog, FaUserCircle } from "react-icons/fa";
import { MdLogout, MdMessage, MdWallet } from "react-icons/md";
import { Link } from "react-router-dom";

const dropDownLinks = [
	{ id: "profile", name: "profile", path: "/profile" },
	{ id: "messages", name: "messages", path: "/messages" },
	{ id: "support", name: "support", path: "/support" },
	{ id: "settings", name: "settings", path: "/settings" },
];

const Dropdown = ({ isOpen, onClose }) => {
	const menuRef = useRef();

	const user = JSON.parse(sessionStorage.getItem("user"));

	const dropdownVariants = {
		closed: {
			opacity: 0,
			scale: 0.95,
			y: -10,
			transition: {
				duration: 0.15,
				ease: "easeInOut",
			},
		},
		open: {
			opacity: 1,
			scale: 1,
			y: 0,
			transition: {
				duration: 0.2,
				ease: "easeOut",
			},
		},
	};

	const itemVariants = {
		closed: { opacity: 0, x: -10 },
		open: (i) => ({
			opacity: 1,
			x: 0,
			transition: {
				delay: i * 0.05,
				duration: 0.2,
			},
		}),
	};

	const getIcon = (name) => {
		switch (name) {
			case "profile":
				return <FaUserCircle className="text-gray-500 w-4 h-4 " />;
			case "messages":
				return <MdMessage className="text-gray-500 w-4 h-4 " />;
			case "support":
				return <CgSupport className="text-gray-500 w-4 h-4 " />;
			case "settings":
				return <FaCog className="text-gray-500 w-4 h-4 " />;
			default:
				return null;
		}
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			document.addEventListener("touchstart", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("touchstart", handleClickOutside);
		};
	}, [isOpen, onClose]);

	useEffect(() => {
		const handleEscapeKey = (event) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscapeKey);
		}

		return () => {
			document.removeEventListener("keydown", handleEscapeKey);
		};
	}, [isOpen, onClose]);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					ref={menuRef}
					className="bg-white shadow-lg absolute top-[65px] w-full md:w-[220px] md:right-8 text-gray-600 flex flex-col gap-2 z-50 border border-gray-200"
					initial="closed"
					animate="open"
					exit="closed"
					variants={dropdownVariants}
				>
					<motion.span
						className="flex flex-col gap-3 text-md capitalize p-6 border-b border-gray-200"
						initial="closed"
						animate="open"
					>
						<motion.h6
							className="text-gray-400 text-xs font-medium"
							variants={itemVariants}
							custom={0}
						>
							Welcome {user?.credentials?.username}!
						</motion.h6>
						{dropDownLinks.map((link, index) => (
							<motion.div
								key={link.id}
								variants={itemVariants}
								custom={index + 1}
								whileHover={{ x: 4 }}
								whileTap={{ scale: 0.98 }}
							>
								<Link
									to={link.path}
									className="flex items-center gap-3 text-gray-700 font-medium text-sm hover:text-[#5162be] transition-colors duration-200"
									onClick={onClose}
								>
									{getIcon(link.name)}
									{link.name}
								</Link>
							</motion.div>
						))}
					</motion.span>

					<motion.span
						className="flex flex-col gap-3 text-md capitalize px-6 py-4"
						initial="closed"
						animate="open"
					>
						<motion.h6
							className="flex items-center gap-3 text-gray-700 font-medium text-sm"
							variants={itemVariants}
							custom={dropDownLinks.length + 1}
						>
							<MdWallet className="text-gray-500 w-4 h-4" />
							balance : $1020.34
						</motion.h6>

						<motion.button
							type="button"
							className="flex items-center gap-3 text-gray-700 font-medium text-sm capitalize hover:text-red-600 transition-colors duration-200"
							variants={itemVariants}
							custom={dropDownLinks.length + 2}
							whileHover={{ x: 4 }}
							whileTap={{ scale: 0.98 }}
							onClick={onClose}
						>
							<MdLogout className="w-4 h-4" />
							logout
						</motion.button>
					</motion.span>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Dropdown;
