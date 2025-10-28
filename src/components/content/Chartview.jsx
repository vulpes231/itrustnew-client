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
	Filler,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

const style = {
	btn: "capitalize px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95",
	container:
		"bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden",
	header:
		"flex items-center justify-between px-6 py-4 border-b border-gray-100",
	title: "font-bold text-xl text-gray-900",
	chartContainer: "p-6 h-80 lg:h-96",
};

const supportedViews = [
	{
		id: "1h",
		name: "1H",
	},
	{
		id: "7d",
		name: "7D",
	},
	{
		id: "1m",
		name: "1M",
	},
	{
		id: "1y",
		name: "1Y",
	},
	{
		id: "all",
		name: "All",
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

	// Calculate current value and percentage change
	const currentValue = data[data.length - 1];
	const previousValue = data[0];
	const percentageChange = (
		((currentValue - previousValue) / previousValue) *
		100
	).toFixed(2);

	const chartData = {
		labels,
		datasets: [
			{
				label: "Portfolio Value",
				data: data,
				borderColor: "#5126be",
				backgroundColor: (context) => {
					const ctx = context.chart.ctx;
					const gradient = ctx.createLinearGradient(0, 0, 0, 400);
					gradient.addColorStop(0, "rgba(81, 38, 190, 0.3)");
					gradient.addColorStop(1, "rgba(81, 38, 190, 0.05)");
					return gradient;
				},
				borderWidth: 3,
				fill: true,
				tension: 0.4,
				pointBackgroundColor: "#5126be",
				pointBorderColor: "#ffffff",
				pointBorderWidth: 3,
				pointRadius: 0,
				pointHoverRadius: 6,
				pointHoverBackgroundColor: "#5126be",
				pointHoverBorderColor: "#ffffff",
				pointHoverBorderWidth: 3,
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
				backgroundColor: "rgba(255, 255, 255, 0.95)",
				titleColor: "#5126be",
				bodyColor: "#374151",
				borderColor: "#e5e7eb",
				borderWidth: 1,
				boxPadding: 8,
				cornerRadius: 8,
				displayColors: false,
				callbacks: {
					label: function (context) {
						return `$${context.parsed.y.toLocaleString()}`;
					},
					title: function (tooltipItems) {
						return tooltipItems[0].label;
					},
				},
				titleFont: {
					size: 12,
					weight: "bold",
				},
				bodyFont: {
					size: 14,
					weight: "bold",
				},
			},
		},
		scales: {
			y: {
				beginAtZero: false,
				max: 100000,
				grid: {
					color: "rgba(0, 0, 0, 0.05)",
					drawBorder: false,
				},
				ticks: {
					stepSize: 25000,
					callback: function (value) {
						return value === 0 ? "$0" : `$${value / 1000}k`;
					},
					font: {
						size: 11,
					},
					color: "#6b7280",
				},
			},
			x: {
				grid: {
					display: false,
				},
				ticks: {
					color: "#6b7280",
					font: {
						size: 11,
					},
				},
			},
		},
		interaction: {
			mode: "index",
			intersect: false,
		},
		animations: {
			tension: {
				duration: 1000,
				easing: "linear",
			},
		},
	};

	return (
		<div className={style.container}>
			<div className={style.header}>
				<div className="flex flex-col gap-1">
					<h3 className={style.title}>Portfolio Growth</h3>
					<div className="flex items-center gap-3">
						<span className="text-2xl font-bold text-gray-900">
							${currentValue.toLocaleString()}
						</span>
						<span
							className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-semibold ${
								percentageChange >= 0
									? "bg-green-50 text-green-700 border border-green-200"
									: "bg-red-50 text-red-700 border border-red-200"
							}`}
						>
							{percentageChange >= 0 ? "↗" : "↘"} {Math.abs(percentageChange)}%
						</span>
					</div>
				</div>
				<span className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
					{supportedViews.map((btn) => {
						return (
							<button
								onClick={() => setView(btn.id)}
								key={btn.id}
								className={`${style.btn} ${
									btn.id === view
										? "bg-[#5126be] text-white shadow-lg shadow-[#5126be]/25"
										: "text-gray-600 hover:text-gray-800 hover:bg-white"
								}`}
								type="button"
							>
								{btn.name}
							</button>
						);
					})}
				</span>
			</div>
			<div className={style.chartContainer}>
				<Line data={chartData} options={chartOptions} />
			</div>
		</div>
	);
};

export default Chartview;
