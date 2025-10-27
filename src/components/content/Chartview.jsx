import React, { useState } from "react";

const style = {
	btn: "capitalize bg-[#5162be]/20 h-[30px] w-[30px] text-center rounded-sm text-[#5162be] text-sm md:text-md hover:bg-[#5162be]/50 hover:text-white",
};

const supportedViews = [
	{
		id: "1h",
		name: "1h",
	},
	{
		id: "7d",
		name: "7d",
	},
	{
		id: "1m",
		name: "1m",
	},
	{
		id: "1y",
		name: "1y",
	},
	{
		id: "all",
		name: "all",
	},
];

const Chartview = () => {
	const [view, setView] = useState("all");
	return (
		<div className="bg-white shadow-sm p-2 rounded-sm">
			<span className="flex items-center justify-between p-3">
				<h3>Portfolio Growth</h3>
				<span className="flex items-center gap-2 capitalize">
					{supportedViews.map((btn) => {
						return (
							<button
								onClick={() => setView(btn.id)}
								key={btn.id}
								className={`${style.btn} ${
									btn.id === view ? "bg-[#5162be]/80 text-white" : ""
								}`}
								type="button"
							>
								{btn.name}
							</button>
						);
					})}
				</span>
			</span>
		</div>
	);
};

export default Chartview;
