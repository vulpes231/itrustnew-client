import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

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

	// Generate dummy data based on the selected view
	const generateData = () => {
		let labels = [];
		let data = [];

		switch (view) {
			case "1h":
				labels = ["00:00", "00:10", "00:20", "00:30", "00:40", "00:50"];
				data = [25000, 32000, 28000, 45000, 38000, 42000];
				break;
			case "7d":
				labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
				data = [15000, 35000, 28000, 65000, 52000, 78000, 85000];
				break;
			case "1m":
				labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
				data = [20000, 45000, 35000, 75000];
				break;
			case "1y":
				labels = ["Q1", "Q2", "Q3", "Q4"];
				data = [25000, 55000, 45000, 95000];
				break;
			case "all":
			default:
				labels = ["2019", "2020", "2021", "2022", "2023", "2024"];
				data = [15000, 35000, 65000, 45000, 85000, 95000];
				break;
		}

		return { labels, data };
	};

	const { labels, data } = generateData();

	const chartData = {
		labels,
		datasets: [
			{
				label: "Portfolio Value",
				data: data,
				borderColor: "#5162be",
				backgroundColor: "rgba(81, 98, 190, 0.1)",
				borderWidth: 2,
				fill: true,
				tension: 0.4,
				pointBackgroundColor: "#5162be",
				pointBorderColor: "#ffffff",
				pointBorderWidth: 2,
				pointRadius: 4,
				pointHoverRadius: 6,
			},
		],
	};

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				mode: "index",
				intersect: false,
				backgroundColor: "rgba(0, 0, 0, 0.7)",
				titleColor: "#fff",
				bodyColor: "#fff",
				borderColor: "#5162be",
				borderWidth: 1,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				max: 100000,
				ticks: {
					stepSize: 5000,
					callback: function (value) {
						return value === 0 ? "$0" : `$${value / 1000}k`;
					},
				},
				grid: {
					color: "rgba(0, 0, 0, 0.1)",
				},
			},
			x: {
				grid: {
					display: false,
				},
				ticks: {
					color: "#666",
				},
			},
		},
		interaction: {
			mode: "nearest",
			axis: "x",
			intersect: false,
		},
	};

	return (
		<div className="bg-white shadow-sm p-2 rounded-sm">
			<span className="flex items-center justify-between p-3">
				<h3 className="font-semibold text-gray-800">Portfolio Growth</h3>
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
			<div className="p-4 h-80">
				<Line data={chartData} options={chartOptions} />
			</div>
		</div>
	);
};

export default Chartview;
