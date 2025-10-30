import React from "react";
import { LuPiggyBank } from "react-icons/lu";
import { IoBriefcaseOutline } from "react-icons/io5";
import { GrMoney } from "react-icons/gr";
import { motion } from "framer-motion";
import numeral from "numeral";

const stats = [
	{
		id: "total",
		name: "total balance",
		balance: 4000,
		color: "bg-[#5162be]",
		textColor: "text-[#5162be]",
		bgColor: "bg-[#5162be]/10",
		icon: <IoBriefcaseOutline className="w-8 h-8 md:w-10 md:h-10" />,
	},
	{
		id: "deposit",
		name: "total deposit",
		balance: 2500,
		color: "bg-green-500",
		textColor: "text-green-600",
		bgColor: "bg-green-50",
		icon: <LuPiggyBank className="w-8 h-8 md:w-10 md:h-10" />,
	},
	{
		id: "withdraw",
		name: "total withdrawal",
		balance: 1500,
		color: "bg-red-500",
		textColor: "text-red-600",
		bgColor: "bg-red-50",
		icon: <GrMoney className="w-8 h-8 md:w-10 md:h-10" />,
	},
];

const Stats = () => {
	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const cardVariants = {
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
				duration: 0.4,
				ease: "easeOut",
			},
		},
	};

	const buttonVariants = {
		hover: {
			scale: 1.05,
			transition: {
				duration: 0.2,
				ease: "easeInOut",
			},
		},
		tap: {
			scale: 0.95,
		},
	};

	return (
		<div className="flex flex-col gap-6">
			{/* Stats Cards Grid */}
			<motion.div
				className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				{stats.map((stat, index) => (
					<motion.div
						key={stat.id}
						className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100"
						variants={cardVariants}
						whileHover={{
							y: -5,
							transition: { duration: 0.2 },
						}}
					>
						<div className="flex items-center justify-between">
							{/* Icon with colored background */}
							<motion.div
								className={`p-3 rounded-xl ${stat.bgColor} ${stat.textColor}`}
								whileHover={{ rotate: 5, scale: 1.1 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								{stat.icon}
							</motion.div>

							{/* Optional percentage badge */}
							<motion.span
								className={`text-xs font-medium px-2 py-1 rounded-full ${stat.bgColor} ${stat.textColor}`}
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.5 + index * 0.1 }}
							>
								+2.5%
							</motion.span>
						</div>

						{/* Balance and Name */}
						<div className="mt-4">
							<motion.h3
								className={`text-2xl md:text-3xl font-bold ${stat.textColor}`}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.3 + index * 0.1 }}
							>
								{numeral(stat.balance).format("$0,0.00")}
							</motion.h3>
							<motion.small
								className="text-gray-500 capitalize font-medium text-sm"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.4 + index * 0.1 }}
							>
								{stat.name}
							</motion.small>
						</div>

						{/* Progress bar (optional) */}
						<motion.div
							className="w-full bg-gray-200 rounded-full h-2 mt-3"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.6 }}
						>
							<div
								className={`h-2 rounded-full ${stat.color} transition-all duration-1000 ease-out`}
								style={{
									width: `${(stat.balance / stats[0].balance) * 100}%`,
								}}
							/>
						</motion.div>
					</motion.div>
				))}
			</motion.div>

			{/* Controls Section */}
			<motion.div
				className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between p-4 md:p-6"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.5, duration: 0.4 }}
			>
				{/* Sort Filter */}
				<div className="flex items-center gap-3">
					<label htmlFor="sort" className="text-gray-700 font-medium text-sm">
						Sort by
					</label>
					<select
						id="sort"
						className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
					>
						<option value="all">All Time</option>
						<option value="week">This Week</option>
						<option value="month">This Month</option>
						<option value="year">This Year</option>
					</select>
				</div>

				{/* Action Buttons */}
				<div className="flex items-center gap-3">
					<motion.button
						className="text-sm font-medium bg-[#5162be] text-white rounded-lg h-[44px] px-6 py-2 capitalize shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center gap-2"
						variants={buttonVariants}
						whileHover="hover"
						whileTap="tap"
					>
						<LuPiggyBank className="w-4 h-4" />
						Deposit
					</motion.button>

					<motion.button
						className="text-sm font-medium bg-red-500 text-white rounded-lg h-[44px] px-6 py-2 capitalize shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center gap-2"
						variants={buttonVariants}
						whileHover="hover"
						whileTap="tap"
					>
						<GrMoney className="w-4 h-4" />
						Withdraw
					</motion.button>
				</div>
			</motion.div>
		</div>
	);
};

export default Stats;
