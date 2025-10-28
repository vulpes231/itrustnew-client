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
		switch (name) {
			case "cash":
				return <MdWallet className="mr-2" />;
			case "auto":
				return <CgDollar className="mr-2" />;
			case "brokerage":
				return <MdSavings className="mr-2" />;
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
					"#5162be", // brokerage - blue
				],
				borderColor: ["#22c55e", "#eab308", "#5162be"],
				hoverBackgroundColor: [
					"#16a34a", // darker green
					"#ca8a04", // darker yellow
					"#3a4a9e", // darker blue
				],

				borderWidth: 2,

				hoverOffset: 8,
			},
		],
	};

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		cutout: "65%",
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
				backgroundColor: "rgba(0, 0, 0, 0.7)",
				titleColor: "#fff",
				bodyColor: "#fff",
				borderColor: "#5162be",
				borderWidth: 1,
			},
		},
	};

	return (
		<div className="flex flex-col items-center justify-between bg-white shadow-md p-6 rounded-sm text-gray-600">
			<div className="flex items-center justify-between w-full mb-4">
				<h3 className="font-semibold text-gray-800">Balances</h3>
				<select
					name="defaultWallet"
					className="border p-1 border-gray-300 rounded-sm text-sm"
					onChange={(e) => handleChange(e)}
					value={defaultWallet}
				>
					{wallets.map((wallet) => {
						return (
							<option key={wallet.id} value={wallet.id}>
								{wallet.name}
							</option>
						);
					})}
				</select>
			</div>

			{/* Doughnut chart */}
			<div className="relative w-48 h-48 mb-6">
				<Doughnut data={chartData} options={chartOptions} />
				<div className="absolute inset-0 flex flex-col items-center justify-center">
					<span className="text-2xl font-bold text-gray-800">
						${totalBalance.toLocaleString()}
					</span>
					<span className="text-sm text-gray-500">Total</span>
				</div>
			</div>

			<div className="flex flex-col gap-3 w-full">
				{wallets.map((wallet) => {
					const percentage = ((wallet.balance / totalBalance) * 100).toFixed(1);
					return (
						<div
							className="flex items-center justify-between py-2 border-b border-gray-200"
							key={wallet.id}
						>
							<span className="flex items-center text-sm font-medium">
								{getIcon(wallet.id)}
								<span className="capitalize">{wallet.name}</span>
							</span>
							<div className="text-right">
								<span className="block text-sm font-semibold">
									${wallet.balance.toLocaleString()}
								</span>
								<span className="block text-xs text-gray-500">
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
