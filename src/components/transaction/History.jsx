import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState, useMemo } from "react";
import { getUserTransactions } from "../../services/transactionService";
import {
	MdAccountBalance,
	MdArrowDownward,
	MdArrowUpward,
	MdSearch,
	MdFilterList,
} from "react-icons/md";

import { SiBitcoin, SiEthereum, SiTether } from "react-icons/si";
import { CgDollar } from "react-icons/cg";
import { MdSavings, MdWallet } from "react-icons/md";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import numeral from "numeral";

const headers = [
	"Timestamp",
	"Method",
	"From",
	"To",
	"Memo",
	"Type",
	"Amount",
	"Status",
];

const History = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [typeFilter, setTypeFilter] = useState("all");
	const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

	const { data: transactions, isLoading: getTransactionsLoading } = useQuery({
		queryFn: getUserTransactions,
		queryKey: ["transactions"],
	});

	// Filter and sort transactions
	const filteredTransactions = useMemo(() => {
		if (!transactions) return [];

		let filtered = transactions.filter((transaction) => {
			const matchesSearch =
				transaction.method?.mode
					?.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				transaction.account?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				transaction.memo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				transaction.amount?.toString().includes(searchTerm);

			const matchesStatus =
				statusFilter === "all" || transaction.status === statusFilter;
			const matchesType =
				typeFilter === "all" || transaction.type === typeFilter;

			return matchesSearch && matchesStatus && matchesType;
		});

		// Sorting
		if (sortConfig.key) {
			filtered.sort((a, b) => {
				if (a[sortConfig.key] < b[sortConfig.key]) {
					return sortConfig.direction === "asc" ? -1 : 1;
				}
				if (a[sortConfig.key] > b[sortConfig.key]) {
					return sortConfig.direction === "asc" ? 1 : -1;
				}
				return 0;
			});
		}

		return filtered;
	}, [transactions, searchTerm, statusFilter, typeFilter, sortConfig]);

	const handleSort = (key) => {
		setSortConfig((current) => ({
			key,
			direction:
				current.key === key && current.direction === "asc" ? "desc" : "asc",
		}));
	};

	const getMethodIcon = (name) => {
		switch (name) {
			case "btc":
				return <SiBitcoin className="w-4 h-4 text-orange-500" />;
			case "usdt":
				return <SiTether className="w-4 h-4 text-green-500" />;
			case "bank":
				return <MdAccountBalance className="w-4 h-4 text-blue-500" />;
			case "eth":
				return <SiEthereum className="w-4 h-4 text-purple-500" />;
			default:
				return <MdWallet className="w-4 h-4 text-gray-500" />;
		}
	};

	const getWalletIcon = (name) => {
		switch (name) {
			case "cash":
				return <MdWallet className="w-4 h-4 text-blue-500" />;
			case "automated investment":
				return <CgDollar className="w-4 h-4 text-green-500" />;
			case "brokerage":
				return <MdSavings className="w-4 h-4 text-purple-500" />;
			default:
				return <MdWallet className="w-4 h-4 text-gray-500" />;
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

	const getTypeColor = (type) => {
		return type === "deposit" ? "text-green-600" : "text-red-600";
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
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.4,
				ease: "easeOut",
			},
		},
	};

	if (getTransactionsLoading) {
		return (
			<div className="bg-white rounded-lg p-6 flex items-center justify-center min-h-[400px]">
				<div className="flex flex-col items-center gap-3">
					<div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
					<p className="text-gray-500">Loading transactions...</p>
				</div>
			</div>
		);
	}

	return (
		<motion.div
			className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
			initial="hidden"
			animate="visible"
			variants={containerVariants}
		>
			{/* Header */}
			<div className="p-6 border-b border-gray-200">
				<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
					<motion.h3
						className="text-xl font-bold text-gray-800"
						variants={itemVariants}
					>
						Transaction History
					</motion.h3>

					<motion.div
						className="flex flex-col gap-3 md:flex-row md:items-center"
						variants={itemVariants}
					>
						{/* Search */}
						<div className="relative">
							<MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
							<input
								type="text"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
								placeholder="Search transactions..."
							/>
						</div>

						{/* Filters */}
						<div className="flex gap-2">
							<select
								value={statusFilter}
								onChange={(e) => setStatusFilter(e.target.value)}
								className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
							>
								<option value="all">All Status</option>
								<option value="completed">Completed</option>
								<option value="pending">Pending</option>
								<option value="failed">Failed</option>
								<option value="processing">Processing</option>
							</select>

							<select
								value={typeFilter}
								onChange={(e) => setTypeFilter(e.target.value)}
								className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
							>
								<option value="all">All Types</option>
								<option value="deposit">Deposit</option>
								<option value="withdraw">Withdraw</option>
								<option value="transfer">Transfer</option>
							</select>
						</div>
					</motion.div>
				</div>
			</div>

			{/* Table */}
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							{headers.map((head, index) => {
								const key = head.toLowerCase().replace(" ", "");
								return (
									<th
										key={index}
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
										onClick={() => handleSort(key)}
									>
										<div className="flex items-center gap-1">
											{head}
											{sortConfig.key === key && (
												<motion.span
													initial={{ scale: 0 }}
													animate={{ scale: 1 }}
													className="text-blue-500"
												>
													{sortConfig.direction === "asc" ? "↑" : "↓"}
												</motion.span>
											)}
										</div>
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						<AnimatePresence>
							{filteredTransactions.length > 0 ? (
								filteredTransactions.map((trnx, index) => (
									<motion.tr
										key={trnx._id}
										variants={itemVariants}
										initial="hidden"
										animate="visible"
										exit="hidden"
										transition={{ delay: index * 0.05 }}
										className="hover:bg-gray-50 transition-colors duration-200"
									>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center gap-3">
												<span>
													{trnx.type === "deposit" ? (
														<MdArrowUpward className="bg-green-50 text-green-500 rounded-full w-6 h-6 p-1" />
													) : trnx.type === "withdraw" ? (
														<MdArrowDownward className="bg-red-50 text-red-500 rounded-full w-6 h-6 p-1" />
													) : null}
												</span>
												<div className="flex flex-col">
													<span className="text-sm font-medium text-gray-900">
														{format(new Date(trnx.createdAt), "dd MMM, yyyy")}
													</span>
													<span className="text-xs text-gray-500">
														{format(new Date(trnx.createdAt), "hh:mm a")}
													</span>
												</div>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center gap-2">
												{getMethodIcon(trnx.method?.mode)}
												<span className="text-sm font-medium text-gray-900 capitalize">
													{trnx.method?.mode}
												</span>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
											{trnx.method?.mode}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center gap-2">
												{getWalletIcon(trnx.account)}
												<span className="text-sm text-gray-900 capitalize">
													{trnx.account}
												</span>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-[200px] truncate">
											{trnx.memo || "-"}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span
												className={`text-sm font-medium capitalize ${getTypeColor(
													trnx.type
												)}`}
											>
												{trnx.type}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
											{numeral(trnx.amount).format("$0,0.00")}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											{getStatusBadge(trnx.status)}
										</td>
									</motion.tr>
								))
							) : (
								<tr>
									<td
										colSpan={headers.length}
										className="px-6 py-12 text-center"
									>
										<div className="flex flex-col items-center gap-2 text-gray-500">
											<MdFilterList className="w-12 h-12 text-gray-300" />
											<p className="text-lg font-medium">
												No transactions found
											</p>
											<p className="text-sm">
												Try adjusting your search or filters
											</p>
										</div>
									</td>
								</tr>
							)}
						</AnimatePresence>
					</tbody>
				</table>
			</div>

			{/* Pagination/Summary */}
			{filteredTransactions.length > 0 && (
				<motion.div
					className="px-6 py-4 border-t border-gray-200 bg-gray-50"
					variants={itemVariants}
				>
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
						<p className="text-sm text-gray-700">
							Showing{" "}
							<span className="font-medium">{filteredTransactions.length}</span>{" "}
							transactions
						</p>
						<div className="flex items-center gap-2 mt-2 sm:mt-0">
							<button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors duration-200">
								Previous
							</button>
							<button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors duration-200">
								Next
							</button>
						</div>
					</div>
				</motion.div>
			)}
		</motion.div>
	);
};

export default History;
