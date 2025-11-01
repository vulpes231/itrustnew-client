import React from "react";
import {
	MdArrowOutward,
	MdOutlineTrendingUp,
	MdOutlineShoppingBag,
} from "react-icons/md";
import { LuArrowDownLeft } from "react-icons/lu";
import { motion } from "framer-motion";
import numeral from "numeral";

const marketStat = [
	{
		id: "totalbuy",
		name: "Total Buy",
		balance: 243.1,
		icon: <MdOutlineShoppingBag className="w-5 h-5 text-green-500" />,
	},
	{
		id: "totalsell",
		name: "Total Sell",
		balance: 658.0,
		icon: <MdOutlineTrendingUp className="w-5 h-5 text-blue-500" />,
	},
	{
		id: "todaybuy",
		name: "Today's Buy",
		balance: 104.05,
		icon: <MdArrowOutward className="w-5 h-5 text-yellow-500" />,
	},
	{
		id: "todaysell",
		name: "Today's Sell",
		balance: 87.25,
		icon: <LuArrowDownLeft className="w-5 h-5 text-red-500" />,
	},
];

const Marketstats = () => {
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
			y: 10,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.3,
				ease: "easeOut",
			},
		},
	};

	return (
		<motion.div
			className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-4"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			{marketStat.map((stat, index) => (
				<motion.div
					key={stat.id}
					className="flex items-center justify-between bg-white rounded-sm shadow-sm p-6"
					variants={cardVariants}
				>
					<div className="flex-1">
						<p className="text-sm text-gray-600 mb-2 font-medium">
							{stat.name}
						</p>
						<h3 className="text-2xl font-bold text-gray-600">
							{numeral(stat.balance).format("$0,0.00")}k
						</h3>
					</div>
					<div
						className={`${
							stat.id === "totalbuy"
								? "bg-green-100"
								: stat.id === "totalsell"
								? "bg-blue-100"
								: stat.id === "todaybuy"
								? "bg-yellow-100"
								: stat.id === "todaysell"
								? "bg-red-100"
								: null
						} rounded-full p-3`}
					>
						{stat.icon}
					</div>
				</motion.div>
			))}
		</motion.div>
	);
};

export default Marketstats;
