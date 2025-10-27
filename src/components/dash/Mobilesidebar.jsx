import React, { useEffect, useRef } from "react";
import Logo from "../Logo";
import { IoWalletOutline } from "react-icons/io5";
import { LiaSellsy } from "react-icons/lia";
import { GoHistory } from "react-icons/go";
import { HiOutlineArchive } from "react-icons/hi";
import { BsSave2 } from "react-icons/bs";
import { BsPiggyBank } from "react-icons/bs";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { RxDashboard } from "react-icons/rx";

const sidebarLinks = [
	{ id: "dashboard", name: "dashboard", path: "/dashboard" },
	{ id: "wallet", name: "wallet", path: "/wallet" },
	{ id: "market", name: "market", path: "/market" },
	{ id: "transactions", name: "transactions", path: "/transactions" },
	{ id: "positions", name: "positions", path: "/positions" },
	{ id: "savings", name: "savings", path: "/savings" },
	{ id: "investments", name: "investments", path: "/investments" },
];

const Mobilesidebar = ({ onClose, isOpen }) => {
	const sidebarRef = useRef();

	const getIcon = (name) => {
		switch (name) {
			case "dashboard":
				return <RxDashboard className="text-gray-500 w-5 h-5" />;
			case "wallet":
				return <IoWalletOutline className="text-gray-500 w-5 h-5" />;
			case "market":
				return <LiaSellsy className="text-gray-500 w-5 h-5" />;
			case "transactions":
				return <GoHistory className="text-gray-500 w-5 h-5" />;
			case "positions":
				return <HiOutlineArchive className="text-gray-500 w-5 h-5" />;
			case "savings":
				return <BsPiggyBank className="text-gray-500 w-5 h-5" />;
			case "investments":
				return <BsSave2 className="text-gray-500 w-5 h-5" />;
			default:
				return null;
		}
	};

	// Handle click outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
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

	// Handle escape key
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

	// Prevent body scroll when sidebar is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	// Animation variants
	const overlayVariants = {
		closed: {
			opacity: 0,
			transition: {
				duration: 0.2,
				ease: "easeOut",
			},
		},
		open: {
			opacity: 1,
			transition: {
				duration: 0.3,
				ease: "easeOut",
			},
		},
	};

	const sidebarVariants = {
		closed: {
			x: "-100%",
			transition: {
				duration: 0.3,
				ease: "easeInOut",
			},
		},
		open: {
			x: 0,
			transition: {
				duration: 0.4,
				ease: "easeOut",
			},
		},
	};

	const linkVariants = {
		closed: { opacity: 0, x: -20 },
		open: (i) => ({
			opacity: 1,
			x: 0,
			transition: {
				delay: 0.1 + i * 0.05,
				duration: 0.3,
				ease: "easeOut",
			},
		}),
	};

	const logoVariants = {
		closed: { opacity: 0, y: -10 },
		open: {
			opacity: 1,
			y: 0,
			transition: {
				delay: 0.1,
				duration: 0.4,
				ease: "easeOut",
			},
		},
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 z-50"
					initial="closed"
					animate="open"
					exit="closed"
				>
					{/* Backdrop Overlay */}
					<motion.div
						className="absolute inset-0 bg-black/50 backdrop-blur-sm"
						variants={overlayVariants}
						onClick={onClose}
					/>

					{/* Sidebar */}
					<motion.aside
						ref={sidebarRef}
						className="relative bg-white h-full w-[280px] max-w-[80vw] flex flex-col gap-8 p-6 shadow-xl"
						variants={sidebarVariants}
					>
						{/* Logo */}
						<motion.div variants={logoVariants}>
							<Logo customClass="w-[140px] h-[45px]" />
						</motion.div>

						{/* Navigation Links */}
						<nav className="flex flex-col gap-1">
							{sidebarLinks.map((link, index) => (
								<motion.div
									key={link.id}
									variants={linkVariants}
									custom={index}
									whileHover={{ x: 5 }}
									whileTap={{ scale: 0.98 }}
								>
									<Link
										to={link.path}
										className="flex items-center gap-3 capitalize p-3 rounded-lg text-gray-700 font-medium text-base hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
										onClick={onClose}
									>
										{getIcon(link.name)}
										<span className="flex-1">{link.name}</span>
									</Link>
								</motion.div>
							))}
						</nav>

						{/* Close button for mobile */}
						<motion.button
							className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 md:hidden"
							onClick={onClose}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							variants={logoVariants}
						>
							<svg
								className="w-6 h-6 text-gray-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</motion.button>
					</motion.aside>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Mobilesidebar;
