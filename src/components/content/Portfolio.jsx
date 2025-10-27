import React from "react";
import { CgArrowUp, CgDollar } from "react-icons/cg";
import Chartview from "./Chartview";
import { BsArrowDown } from "react-icons/bs";
import numeral from "numeral";

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
				return <CgDollar className="text-white" />;
			case "tc":
				return <CgArrowUp className="text-white" />;
			case "dc":
				return <BsArrowDown className="text-white" />;

			default:
				return null;
		}
	};
	return (
		<div className="flex flex-col gap-6">
			{stats.map((stat) => {
				return (
					<div
						key={stat.id}
						className="flex items-center justify-between bg-white shadow-md p-4 rounded-sm"
					>
						<div className="flex items-center gap-4">
							<div className="p-4 bg-[#5162be]/10 rounded-full">
								<div className=" bg-[#5162be]/80 rounded-full p-1">
									{getIcon(stat.id)}
								</div>
							</div>
							<span className="flex flex-col gap-1">
								<h3 className="font-bold text-sm uppercase text-gray-400">
									{stat.name}
								</h3>
								<h3 className="text-2xl font-medium text-gray-600">
									${numeral(stat.balance).format("0,0.00")}
								</h3>
							</span>
						</div>
						<span className={` flex flex-col text-xs p-1  font-medium`}>
							<span className="h-8"></span>
							<span
								className={`flex items-center gap-1 p-1 rounded-md ${
									stat.percent > 0
										? "bg-green-600/10 text-green-500"
										: "bg-red-600/10 text-red-500"
								}`}
							>
								<CgArrowUp />
								<small>{stat.percent}</small>%
							</span>
						</span>
					</div>
				);
			})}

			<Chartview />
		</div>
	);
};

export default Portfolio;
