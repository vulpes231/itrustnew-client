import React from "react";

const style = {
	td: "px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-center text-sm md:text-base font-medium text-gray-700 border-b border-gray-100",
	th: "px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-center text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider bg-gray-50/80",
	tableContainer:
		"bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden",
	header:
		"flex items-center justify-between w-full px-4 md:px-6 py-4 border-b border-gray-100",
	title: "font-bold text-lg md:text-xl text-gray-900",
	tradeBtn:
		"py-2 px-3 md:px-4 bg-[#5126be]/10 hover:bg-[#5126be] text-[#5126be] hover:text-white rounded-md text-xs md:text-sm font-medium capitalize transition-all duration-200 cursor-pointer transform hover:scale-105",
	positiveChange:
		"inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200",
	negativeChange:
		"inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200",
};

const Recentactivity = () => {
	return (
		<div className="bg-white rounded-md shadow-md">
			<div className={style.header}>
				<h3 className={style.title}>Recent Activity</h3>
				<div className="flex items-center gap-2">
					<label htmlFor="">sort by:</label>
					<select name="">
						<option value="">today</option>
						<option value="">last week</option>
						<option value="">last month</option>
						<option value="">current year</option>
					</select>
				</div>
			</div>
		</div>
	);
};

export default Recentactivity;
