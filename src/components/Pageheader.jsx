import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Pageheader = ({ page, description }) => {
	const location = useLocation();

	// Format pathname for display
	const formatPathname = (path) => {
		return path
			.slice(1)
			.split("/")
			.map((part) => part.replace(/-/g, " "))
			.join(" / ");
	};

	// Generate breadcrumbs from pathname
	const generateBreadcrumbs = () => {
		const pathnames = location.pathname.split("/").filter((x) => x);

		return pathnames.map((name, index) => {
			const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
			const isLast = index === pathnames.length - 1;
			const formattedName = name.replace(/-/g, " ");

			return {
				name: formattedName,
				path: routeTo,
				isLast,
			};
		});
	};

	const breadcrumbs = generateBreadcrumbs();

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0, y: -20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.4,
				ease: "easeOut",
				when: "beforeChildren",
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, x: -10 },
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.3,
				ease: "easeOut",
			},
		},
	};

	const breadcrumbVariants = {
		hidden: { opacity: 0, scale: 0.8 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.2,
				ease: "easeOut",
			},
		},
	};

	return (
		<motion.div
			className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between py-4 px-5 md:px-8 mt-[78px] md:mt-[75px] lg:mt-[85px] shadow-sm bg-white border-b border-gray-100"
			initial="hidden"
			animate="visible"
			variants={containerVariants}
		>
			{/* Left Section - Page Title */}
			<div className="flex flex-col gap-1">
				<motion.h3
					className="font-bold capitalize text-lg md:text-xl text-gray-800"
					variants={itemVariants}
				>
					{page}
				</motion.h3>
				{description && (
					<motion.p
						className="text-sm text-gray-500 font-normal max-w-2xl"
						variants={itemVariants}
					>
						{description}
					</motion.p>
				)}
			</div>

			{/* Right Section - Breadcrumb */}
			<motion.div
				className="flex items-center gap-2 text-sm"
				variants={itemVariants}
			>
				<AnimatePresence mode="wait">
					<motion.span
						key="home"
						className="flex items-center gap-2"
						variants={breadcrumbVariants}
					>
						<motion.span
							className="text-gray-500 hover:text-gray-700 cursor-pointer transition-colors duration-200"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							Home
						</motion.span>
						<MdArrowForwardIos className="text-gray-400 w-3 h-3 flex-shrink-0" />
					</motion.span>

					{breadcrumbs.map((breadcrumb, index) => (
						<motion.span
							key={breadcrumb.path}
							className="flex items-center gap-2"
							initial="hidden"
							animate="visible"
							variants={breadcrumbVariants}
							transition={{ delay: index * 0.05 }}
						>
							{breadcrumb.isLast ? (
								<motion.span
									className="text-gray-400 capitalize font-medium"
									whileHover={{ color: "#374151" }}
								>
									{breadcrumb.name}
								</motion.span>
							) : (
								<>
									<motion.span
										className="text-gray-600 hover:text-gray-800 cursor-pointer capitalize transition-colors duration-200"
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										{breadcrumb.name}
									</motion.span>
									<MdArrowForwardIos className="text-gray-400 w-3 h-3 flex-shrink-0" />
								</>
							)}
						</motion.span>
					))}
				</AnimatePresence>
			</motion.div>

			{/* Alternative Simple Breadcrumb (backup) */}
			{/* <motion.div
				className="flex items-center gap-2 text-sm lg:hidden"
				variants={itemVariants}
			>
				<span className="text-gray-500">Home</span>
				<MdArrowForwardIos className="text-gray-400 w-3 h-3" />
				<span className="text-gray-600 capitalize">
					{formatPathname(location.pathname)}
				</span>
			</motion.div> */}
		</motion.div>
	);
};

export default Pageheader;
