import React from "react";
import { CgArrowUp, CgDollar } from "react-icons/cg";
import Chartview from "./Chartview";
import { BsArrowDown } from "react-icons/bs";
import numeral from "numeral";
import Balancechart from "./Balancechart";

const stats = [
	{
		id: "tv",
		name: "total invested",
		balance: 1000,
		percent: 2.24,
	},
	{
		id: "tc",
		name: "total change",
		balance: 10000,
		percent: 6.24,
	},
	{
		id: "dc",
		name: "day change",
		balance: 4000,
		percent: -2.24,
	},
];

const Portfolio = () => {
	const getIcon = (id) => {
		switch (id) {
			case "tv":
				return <CgDollar className="text-white text-lg" />;
			case "tc":
				return <CgArrowUp className="text-white text-lg" />;
			case "dc":
				return <BsArrowDown className="text-white text-lg" />;
			default:
				return null;
		}
	};

	return (
		<div className="flex flex-col gap-6 lg:flex-row">
			{/* Balancechart on left for desktop - comes last on mobile */}
			<div className="w-full lg:w-1/3 lg:order-1">
				<Balancechart />
			</div>

			{/* Stats and Chartview section - comes first on mobile, right on desktop */}
			<div className="flex flex-col gap-6 w-full lg:w-2/3 lg:order-2">
				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
					{stats.map((stat) => {
						const isPositive = stat.percent > 0;
						return (
							<div
								key={stat.id}
								className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200 group"
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-4">
										<div className="p-3 bg-gradient-to-br from-[#5126be]/10 to-[#5126be]/5 rounded-2xl group-hover:scale-110 transition-transform duration-300">
											<div className="bg-gradient-to-br from-[#5126be] to-[#5126be]/80 rounded-xl p-2 shadow-lg">
												{getIcon(stat.id)}
											</div>
										</div>
										<div className="flex flex-col gap-1">
											<h3 className="font-semibold text-xs uppercase tracking-wide text-gray-500">
												{stat.name}
											</h3>
											<h3 className="text-2xl lg:text-3xl font-bold text-gray-800">
												${numeral(stat.balance).format("0,0.00")}
											</h3>
										</div>
									</div>
								</div>
								<div className="flex justify-end mt-4">
									<span
										className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
											isPositive
												? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
												: "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
										}`}
									>
										{isPositive ? (
											<CgArrowUp className="text-green-600" />
										) : (
											<BsArrowDown className="text-red-600" />
										)}
										<span>
											{isPositive ? "+" : ""}
											{stat.percent}%
										</span>
									</span>
								</div>
							</div>
						);
					})}
				</div>

				{/* Chart View */}
				<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
					<Chartview />
				</div>
			</div>
		</div>
	);
};

export default Portfolio;
