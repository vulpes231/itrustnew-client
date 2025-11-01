import React from "react";
import { getUserWallets } from "../../services/walletService";
import { useQuery } from "@tanstack/react-query";
import { CgDollar } from "react-icons/cg";
import { MdSavings, MdWallet } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import numeral from "numeral";

const Walletdisplay = () => {
	const { data: wallets, isLoading: getWalletsLoading } = useQuery({
		queryKey: ["wallets"],
		queryFn: getUserWallets,
	});

	const getIcon = (name) => {
		const iconClass = "w-6 h-6";
		switch (name) {
			case "cash":
				return <MdWallet className={iconClass} />;
			case "automated investing":
				return <CgDollar className={iconClass} />;
			case "brokerage":
				return <MdSavings className={iconClass} />;
			default:
				return null;
		}
	};

	const getWalletColor = (name) => {
		switch (name) {
			case "cash":
				return "from-green-500 to-green-600";
			case "automated investing":
				return "from-yellow-500 to-yellow-600";
			case "brokerage":
				return "from-purple-500 to-purple-600";
			default:
				return "from-gray-500 to-gray-600";
		}
	};

	const getIconBgColor = (name) => {
		switch (name) {
			case "cash":
				return "bg-green-100 text-green-600";
			case "automated investing":
				return "bg-yellow-100 text-yellow-600";
			case "brokerage":
				return "bg-purple-100 text-purple-600";
			default:
				return "bg-gray-100 text-gray-600";
		}
	};

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15,
			},
		},
	};

	const itemVariants = {
		hidden: {
			opacity: 0,
			y: 20,
			scale: 0.95,
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.5,
				ease: "easeOut",
			},
		},
	};

	const hoverVariants = {
		hover: {
			y: -4,
			scale: 1.02,
			transition: {
				duration: 0.2,
				ease: "easeInOut",
			},
		},
	};

	if (getWalletsLoading) {
		return (
			<div className="w-full">
				<div className="flex flex-col gap-4">
					{[1, 2, 3].map((item) => (
						<div
							key={item}
							className="bg-white shadow-lg rounded-xl p-6 h-24 animate-pulse"
						>
							<div className="flex items-center justify-between">
								<div className="space-y-2">
									<div className="h-4 bg-gray-200 rounded w-24"></div>
									<div className="h-6 bg-gray-200 rounded w-32"></div>
								</div>
								<div className="w-10 h-10 bg-gray-200 rounded-full"></div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="w-full">
			<motion.div
				className="flex flex-col gap-4"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				<AnimatePresence>
					{wallets &&
						wallets.length > 0 &&
						wallets.map((wallet, index) => (
							<motion.div
								key={wallet._id}
								className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
								variants={itemVariants}
								whileHover="hover"
								custom={index}
							>
								<motion.div
									className="flex items-center justify-between"
									variants={hoverVariants}
								>
									<div className="flex-1">
										<motion.h3
											className="font-semibold text-gray-600 capitalize mb-3 text-sm tracking-wide"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ delay: index * 0.1 + 0.2 }}
										>
											{wallet.name}
										</motion.h3>
										<div className="space-y-2">
											<motion.h3
												className="text-2xl md:text-3xl font-bold text-gray-900"
												initial={{ opacity: 0, scale: 0.8 }}
												animate={{ opacity: 1, scale: 1 }}
												transition={{ delay: index * 0.1 + 0.3 }}
											>
												{numeral(wallet.totalBalance).format("$0,0.00")}
											</motion.h3>
											<motion.div
												className="flex items-center gap-3"
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ delay: index * 0.1 + 0.4 }}
											>
												<span className="text-sm text-gray-500 font-medium">
													Available:{" "}
													{numeral(wallet.availableBalance).format("$0,0.00")}
												</span>
												<motion.small
													className={`text-xs font-semibold px-2 py-1 rounded-full ${
														parseFloat(wallet.dailyProfitPercent) >= 0
															? "bg-green-100 text-green-800"
															: "bg-red-100 text-red-800"
													}`}
													whileHover={{ scale: 1.1 }}
													whileTap={{ scale: 0.95 }}
												>
													{parseFloat(wallet.dailyProfitPercent) >= 0
														? "+"
														: ""}
													{wallet.dailyProfitPercent}%
												</motion.small>
											</motion.div>
										</div>
									</div>
									<motion.span
										className={`p-3 rounded-xl ${getIconBgColor(wallet.name)}`}
										whileHover={{
											rotate: [0, -5, 5, 0],
											transition: { duration: 0.5 },
										}}
										initial={{ opacity: 0, scale: 0 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{
											delay: index * 0.1 + 0.5,
											type: "spring",
											stiffness: 200,
										}}
									>
										{getIcon(wallet.name)}
									</motion.span>
								</motion.div>

								{/* Progress bar for available balance */}
								{/* <motion.div
									className="w-full bg-gray-200 rounded-full h-2 mt-4"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: index * 0.1 + 0.6 }}
								>
									<motion.div
										className={`h-2 rounded-full bg-gradient-to-r ${getWalletColor(
											wallet.name
										)}`}
										initial={{ width: 0 }}
										animate={{
											width: `${
												(wallet.availableBalance / wallet.totalBalance) * 100
											}%`,
										}}
										transition={{
											delay: index * 0.1 + 0.8,
											duration: 1,
											ease: "easeOut",
										}}
									/>
								</motion.div> */}
							</motion.div>
						))}
				</AnimatePresence>
			</motion.div>
		</div>
	);
};

export default Walletdisplay;
