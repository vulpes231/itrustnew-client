import React, { useState } from "react";
import { CgDollar } from "react-icons/cg";
import { MdSavings, MdWallet } from "react-icons/md";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const wallets = [
	{ id: "cash", name: "cash", balance: 5030 },
	{ id: "auto", name: "auto", balance: 2250 },
	{ id: "brokerage", name: "brokerage", balance: 6400 },
];

const Balancechart = () => {
	const [defaultWallet, setDefaultWallet] = useState("cash");

	const handleChange = (e) => {
		setDefaultWallet(e.target.value);
	};

	const getIcon = (name) => {
		const iconClass = "text-lg";
		switch (name) {
			case "cash":
				return <MdWallet className={iconClass} />;
			case "auto":
				return <CgDollar className={iconClass} />;
			case "brokerage":
				return <MdSavings className={iconClass} />;
			default:
				return null;
		}
	};

	// Calculate total balance
	const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);

	// Chart data
	const chartData = {
		labels: wallets.map(
			(wallet) => wallet.name.charAt(0).toUpperCase() + wallet.name.slice(1)
		),
		datasets: [
			{
				data: wallets.map((wallet) => wallet.balance),
				backgroundColor: [
					"#22c55e", // cash - green
					"#eab308", // auto - yellow
					"#5126be", // brokerage - blue (updated to match your brand)
				],
				borderColor: "#ffffff",
				borderWidth: 3,
				hoverBackgroundColor: [
					"#16a34a", // darker green
					"#ca8a04", // darker yellow
					"#401d95", // darker blue
				],
				hoverBorderColor: "#ffffff",
				hoverBorderWidth: 3,
				hoverOffset: 12,
			},
		],
	};

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		cutout: "68%",
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				callbacks: {
					label: function (context) {
						const value = context.parsed;
						const percentage = ((value / totalBalance) * 100).toFixed(1);
						return `${
							context.label
						}: $${value.toLocaleString()} (${percentage}%)`;
					},
				},
				backgroundColor: "rgba(255, 255, 255, 0.95)",
				titleColor: "#5126be",
				bodyColor: "#374151",
				borderColor: "#e5e7eb",
				borderWidth: 1,
				boxPadding: 10,
				cornerRadius: 8,
				titleFont: {
					size: 12,
					weight: "bold",
				},
				bodyFont: {
					size: 13,
					weight: "600",
				},
				padding: 12,
			},
		},
		animation: {
			animateScale: true,
			animateRotate: true,
		},
	};

	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
			{/* Header */}
			<div className="flex items-center justify-between w-full mb-6">
				<h3 className="font-bold text-xl text-gray-900">Balances</h3>
				<select
					name="defaultWallet"
					className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5126be] focus:border-[#5126be] transition-all duration-200 bg-white"
					onChange={(e) => handleChange(e)}
					value={defaultWallet}
				>
					{wallets.map((wallet) => {
						return (
							<option key={wallet.id} value={wallet.id}>
								{wallet.name.charAt(0).toUpperCase() + wallet.name.slice(1)}
							</option>
						);
					})}
				</select>
			</div>

			{/* Doughnut chart */}
			<div className="relative w-56 h-56 mx-auto mb-8">
				<Doughnut data={chartData} options={chartOptions} />
				<div className="absolute inset-0 flex flex-col items-center justify-center">
					<span className="text-3xl font-bold text-gray-900">
						${totalBalance.toLocaleString()}
					</span>
					<span className="text-sm text-gray-500 font-medium">
						Total Balance
					</span>
				</div>
			</div>

			{/* Wallet list */}
			<div className="space-y-4">
				{wallets.map((wallet) => {
					const percentage = ((wallet.balance / totalBalance) * 100).toFixed(1);
					const getColorClass = (id) => {
						switch (id) {
							case "cash":
								return "text-green-600";
							case "auto":
								return "text-yellow-600";
							case "brokerage":
								return "text-[#5126be]";
							default:
								return "text-gray-600";
						}
					};

					return (
						<div
							className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-all duration-200 group cursor-pointer border border-transparent hover:border-gray-200"
							key={wallet.id}
						>
							<span className="flex items-center gap-3">
								<div
									className={`p-2 rounded-xl bg-gray-100 group-hover:scale-110 transition-transform duration-200 ${getColorClass(
										wallet.id
									).replace("text", "bg")}/10`}
								>
									<div className={getColorClass(wallet.id)}>
										{getIcon(wallet.id)}
									</div>
								</div>
								<div className="flex flex-col">
									<span className="font-semibold text-gray-900 capitalize">
										{wallet.name}
									</span>
									<span className="text-sm text-gray-500">
										{percentage}% of portfolio
									</span>
								</div>
							</span>
							<div className="text-right">
								<span className="block font-bold text-gray-900 text-lg">
									${wallet.balance.toLocaleString()}
								</span>
								<span
									className={`text-xs font-medium px-2 py-1 rounded-full ${getColorClass(
										wallet.id
									).replace("text", "bg")}/10 ${getColorClass(wallet.id)}`}
								>
									{percentage}%
								</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Balancechart;
