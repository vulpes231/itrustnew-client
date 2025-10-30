import { useQuery } from "@tanstack/react-query";
import React, { useState, useMemo } from "react";
import { getUserTransactions } from "../../services/transactionService";
import { MdArrowDownward, MdArrowUpward, MdMoreHoriz } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { format, isToday, isThisWeek, isThisMonth, isThisYear } from "date-fns";
import numeral from "numeral";

const style = {
	tableContainer: "",
	header:
		"flex flex-col sm:flex-row sm:items-center justify-between w-full px-4 md:px-6 py-4 border-b border-gray-100 gap-3",
	title: "font-bold text-lg md:text-xl text-gray-900",
	tradeBtn:
		"py-2 px-3 md:px-4 bg-[#5126be]/10 hover:bg-[#5126be] text-[#5126be] hover:text-white rounded-md text-xs md:text-sm font-medium capitalize transition-all duration-200 cursor-pointer transform hover:scale-105",
	positiveChange:
		"inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200",
	negativeChange:
		"inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200",
	activityItem:
		"flex items-center justify-between p-4 md:p-6 border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50 transition-colors duration-200",
};

const RecentActivity = () => {
	const [timeFilter, setTimeFilter] = useState("all");

	const { data: transactions, isLoading: getTransactionsLoading } = useQuery({
		queryFn: getUserTransactions,
		queryKey: ["transactions"],
	});

	// Filter transactions based on time filter
	const filteredTransactions = useMemo(() => {
		if (!transactions) return [];

		const now = new Date();

		return transactions
			.filter((transaction) => {
				const transactionDate = new Date(transaction.createdAt);

				switch (timeFilter) {
					case "today":
						return isToday(transactionDate);
					case "week":
						return isThisWeek(transactionDate);
					case "month":
						return isThisMonth(transactionDate);
					case "year":
						return isThisYear(transactionDate);
					default:
						return true;
				}
			})
			.slice(0, 6); // Show only last 6 transactions
	}, [transactions, timeFilter]);

	const getTransactionIcon = (type) => {
		const iconProps = {
			className: "rounded-full w-8 h-8 p-1.5 flex-shrink-0",
		};

		if (type === "deposit") {
			return (
				<MdArrowUpward
					{...iconProps}
					className={`${iconProps.className} bg-green-50 text-green-500`}
				/>
			);
		} else if (type === "withdraw") {
			return (
				<MdArrowDownward
					{...iconProps}
					className={`${iconProps.className} bg-red-50 text-red-500`}
				/>
			);
		} else {
			return (
				<MdMoreHoriz
					{...iconProps}
					className={`${iconProps.className} bg-blue-50 text-blue-500`}
				/>
			);
		}
	};

	const getTransactionColor = (type) => {
		return type === "deposit"
			? "text-green-600"
			: type === "withdraw"
			? "text-red-600"
			: "text-blue-600";
	};

	const getAmountPrefix = (type) => {
		return type === "deposit" ? "+" : type === "withdraw" ? "-" : "";
	};

	const getTransactionDescription = (transaction) => {
		const type = transaction.type?.toLowerCase();
		const method = transaction.method?.mode?.toLowerCase();

		if (type === "deposit") {
			return `Deposit via ${method}`;
		} else if (type === "withdraw") {
			return `Withdrawal via ${method}`;
		} else {
			return `Transaction via ${method}`;
		}
	};

	const getStatusBadge = (status) => {
		const statusConfig = {
			completed: { color: "bg-green-100 text-green-800", label: "Completed" },
			pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
			failed: { color: "bg-red-100 text-red-800", label: "Failed" },
			processing: { color: "bg-blue-100 text-blue-800", label: "Processing" },
		};

		const config = statusConfig[status] || {
			color: "bg-gray-100 text-gray-800",
			label: status,
		};

		return (
			<span
				className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
			>
				{config.label}
			</span>
		);
	};

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

	const itemVariants = {
		hidden: { opacity: 0, x: -20 },
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.4,
				ease: "easeOut",
			},
		},
	};

	if (getTransactionsLoading) {
		return (
			<div className={style.tableContainer}>
				<div className={style.header}>
					<h3 className={style.title}>Recent Activity</h3>
					<div className="flex items-center gap-2">
						<label htmlFor="sort" className="text-sm text-gray-600">
							Sort by:
						</label>
						<select
							id="sort"
							className="border border-gray-300 rounded px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							disabled
						>
							<option value="today">Today</option>
							<option value="week">Last Week</option>
							<option value="month">Last Month</option>
							<option value="year">This Year</option>
							<option value="all">All Time</option>
						</select>
					</div>
				</div>
				<div className="p-8 flex items-center justify-center">
					<div className="flex flex-col items-center gap-3">
						<div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
						<p className="text-gray-500 text-sm">Loading activities...</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<motion.div
			className={style.tableContainer}
			initial="hidden"
			animate="visible"
			variants={containerVariants}
		>
			{/* Header */}
			<div className={style.header}>
				<motion.h3 className={style.title} variants={itemVariants}>
					Recent Activity
				</motion.h3>
				<motion.div className="flex items-center gap-2" variants={itemVariants}>
					<label
						htmlFor="sort"
						className="text-sm text-gray-600 whitespace-nowrap"
					>
						Filter by:
					</label>
					<select
						id="sort"
						value={timeFilter}
						onChange={(e) => setTimeFilter(e.target.value)}
						className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
					>
						<option value="all">All Time</option>
						<option value="today">Today</option>
						<option value="week">This Week</option>
						<option value="month">This Month</option>
						<option value="year">This Year</option>
					</select>
				</motion.div>
			</div>

			{/* Activity List */}
			<div className="divide-y divide-gray-50">
				<AnimatePresence>
					{filteredTransactions.length > 0 ? (
						filteredTransactions.map((transaction, index) => (
							<motion.div
								key={transaction._id}
								className={style.activityItem}
								variants={itemVariants}
								initial="hidden"
								animate="visible"
								exit="hidden"
								transition={{ delay: index * 0.05 }}
								whileHover={{ x: 4 }}
							>
								<div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
									{getTransactionIcon(transaction.type)}

									<div className="flex-1 min-w-0">
										<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
											<p className="text-sm font-medium text-gray-900 truncate">
												{getTransactionDescription(transaction)}
											</p>
											<span className="text-xs text-gray-500 whitespace-nowrap">
												{format(
													new Date(transaction.createdAt),
													"MMM dd, h:mm a"
												)}
											</span>
										</div>

										<div className="flex items-center gap-2 mt-1">
											{getStatusBadge(transaction.status)}
											<span className="text-xs text-gray-500 capitalize">
												{transaction.account}
											</span>
										</div>
									</div>
								</div>

								<div className="flex flex-col items-end gap-1 ml-4">
									<span
										className={`text-sm font-semibold ${getTransactionColor(
											transaction.type
										)}`}
									>
										{getAmountPrefix(transaction.type)}
										{numeral(transaction.amount).format("$0,0.00")}
									</span>
									<span className="text-xs text-gray-500">USD</span>
								</div>
							</motion.div>
						))
					) : (
						<motion.div className="p-8 text-center" variants={itemVariants}>
							<div className="flex flex-col items-center gap-3 text-gray-500">
								<MdMoreHoriz className="w-12 h-12 text-gray-300" />
								<p className="font-medium">No recent activity</p>
								<p className="text-sm">Transactions will appear here</p>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* View All Button */}
			{filteredTransactions.length > 0 && (
				<motion.div
					className="p-4 border-t border-gray-100 bg-gray-50/50"
					variants={itemVariants}
				>
					<button className={style.tradeBtn}>View All Activities</button>
				</motion.div>
			)}
		</motion.div>
	);
};

export default RecentActivity;
