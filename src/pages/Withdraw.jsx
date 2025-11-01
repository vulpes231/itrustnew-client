import React, { useEffect, useState } from "react";
import {
	Authnav,
	Custominput,
	Customselect,
	Errortoast,
	Loadingmodal,
	Pageheader,
	Pagetitle,
	Successtoast,
} from "../components";
import { MdWallet, MdAccountBalance, MdPayment } from "react-icons/md";
import { SiBitcoin, SiEthereum, SiTether } from "react-icons/si";
import { useMutation, useQuery } from "@tanstack/react-query";
import { depositFunds } from "../services/transactionService";
import { motion, AnimatePresence } from "framer-motion";
import numeral from "numeral";
import { getUserWallets } from "../services/walletService";

const paymentMethods = [
	{
		id: "bank",
		network: ["wire-transfer", "instant-transfer"],
		name: "Bank Transfer",
		icon: <MdAccountBalance className="w-5 h-5" />,
		color: "text-blue-600",
		bgColor: "bg-blue-50",
	},
	{
		id: "usdt",
		network: ["erc20", "trc20", "bep20"],
		name: "USDT",
		icon: <SiTether className="w-5 h-5" />,
		color: "text-green-600",
		bgColor: "bg-green-50",
	},
	{
		id: "btc",
		network: ["bitcoin"],
		name: "Bitcoin",
		icon: <SiBitcoin className="w-5 h-5" />,
		color: "text-orange-600",
		bgColor: "bg-orange-50",
	},
	{
		id: "eth",
		network: ["erc20", "bep20"],
		name: "Ethereum",
		icon: <SiEthereum className="w-5 h-5" />,
		color: "text-purple-600",
		bgColor: "bg-purple-50",
	},
];

const Withdraw = () => {
	const [form, setForm] = useState({
		method: "",
		network: "",
		amount: "",
		account: "",
	});
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	// Fetch wallet balance
	const { data: wallets, isLoading: getWalletsLoading } = useQuery({
		queryKey: ["wallets"],
		queryFn: getUserWallets,
	});

	const mutation = useMutation({
		mutationFn: () => depositFunds(form),
		onSuccess: (data) => {
			setSuccess("Withdrawal request submitted successfully!");
			setForm({ method: "", type: "deposit", network: "", amount: "" });
		},
		onError: (err) =>
			setError(err.message || "Withdrawal failed. Please try again."),
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => {
			// Reset network when method changes
			if (name === "method") {
				return { ...prev, method: value, network: "" };
			}
			return { ...prev, [name]: value };
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Validation
		if (!form.method) {
			setError("Please select a payment method");
			return;
		}
		if (!form.network) {
			setError("Please select a network");
			return;
		}
		if (!form.amount || parseFloat(form.amount) <= 0) {
			setError("Please enter a valid amount");
			return;
		}
		if (parseFloat(form.amount) > 100000) {
			setError("Maximum withdrawal amount is $100,000");
			return;
		}
		form.account = cashWallet?.name;
		mutation.mutate();
	};

	useEffect(() => {
		if (error) {
			const timeout = setTimeout(() => {
				setError("");
				mutation.reset();
			}, 5000);
			return () => clearTimeout(timeout);
		}
	}, [error]);

	useEffect(() => {
		if (success) {
			const timeout = setTimeout(() => {
				setSuccess("");
				mutation.reset();
				window.location.href = "/transaction";
			}, 3000);
			return () => clearTimeout(timeout);
		}
	}, [success]);

	const selectedMethod = paymentMethods.find(
		(method) => method.id === form.method
	);
	const cashWallet =
		wallets && wallets.find((wallet) => wallet.name === "cash");

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

	const buttonVariants = {
		hover: { scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" },
		tap: { scale: 0.98 },
	};

	return (
		<section className="bg-slate-100 min-h-screen text-slate-600">
			<Authnav />
			<Pagetitle />
			<Pageheader
				page={"Withdraw"}
				// description="Add funds to your account using various payment methods"
			/>

			<div className="p-6 max-w-4xl mx-auto">
				<motion.form
					onSubmit={handleSubmit}
					className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
					initial="hidden"
					animate="visible"
					variants={containerVariants}
				>
					{/* Balance Card */}
					<motion.div className="p-6" variants={itemVariants}>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="p-2 bg-white/20 rounded-lg">
									<MdWallet className="w-6 h-6" />
								</div>
								<div>
									<p className="text-sm capitalize">
										{`${cashWallet?.name} Account` || "available balance"}
									</p>
									<h3 className="text-2xl font-bold">
										{getWalletsLoading
											? "Loading..."
											: numeral(cashWallet?.totalBalance).format("$0,0.00")}
									</h3>
								</div>
							</div>
							<motion.div
								className="text-right"
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.3 }}
							>
								<p className="text-sm">Minimum Withdrawal</p>
								<p className="font-semibold">$10.00</p>
							</motion.div>
						</div>
					</motion.div>

					{/* Form Content */}
					<div className="p-6 space-y-6">
						{/* Payment Method */}
						<motion.div variants={itemVariants}>
							<label className="block text-sm font-medium text-gray-700 mb-3">
								Payment Method
							</label>
							<div className="grid grid-cols-2 gap-3">
								{paymentMethods.map((method) => (
									<motion.button
										key={method.id}
										type="button"
										className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ${
											form.method === method.id
												? `border-[#5162be] ${method.bgColor}`
												: "border-gray-200 hover:border-gray-300"
										}`}
										onClick={() =>
											handleChange({
												target: { name: "method", value: method.id },
											})
										}
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
									>
										<div className="flex items-center gap-3">
											<div
												className={`p-2 rounded-lg ${method.bgColor} ${method.color}`}
											>
												{method.icon}
											</div>
											<span className="font-medium text-sm">{method.name}</span>
										</div>
									</motion.button>
								))}
							</div>
						</motion.div>

						{/* Network Selection */}
						<AnimatePresence>
							{form.method && (
								<motion.div
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: "auto" }}
									exit={{ opacity: 0, height: 0 }}
									transition={{ duration: 0.3 }}
									variants={itemVariants}
								>
									<Customselect
										label={"Network"}
										options={
											selectedMethod?.network.map((network) => ({
												id: network,
												name: network.toUpperCase(),
											})) || []
										}
										onChange={handleChange}
										name={"network"}
										value={form.network}
										placeholder="Select network"
									/>
								</motion.div>
							)}
						</AnimatePresence>

						{/* Amount Input */}
						<motion.div variants={itemVariants}>
							<Custominput
								label={"Amount (USD)"}
								value={form.amount}
								onChange={handleChange}
								name={"amount"}
								type="number"
								placeholder="0.00"
								min="10"
								max="100000"
								step="0.01"
							/>
							<div className="flex justify-between mt-2">
								<span className="text-xs text-gray-500">Min: $10.00</span>
								<span className="text-xs text-gray-500">Max: $100,000.00</span>
							</div>
						</motion.div>

						{/* Submit Button */}
						<motion.button
							type="submit"
							disabled={mutation.isPending}
							className="w-full bg-[#5162be] text-white py-4 px-6 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
							variants={buttonVariants}
							whileHover={mutation.isPending ? {} : "hover"}
							whileTap={mutation.isPending ? {} : "tap"}
						>
							{mutation.isPending ? (
								<div className="flex items-center justify-center gap-2">
									<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
									Processing...
								</div>
							) : (
								<div className="flex items-center justify-center gap-2">
									<MdPayment className="w-5 h-5" />
									Withdraw Funds
								</div>
							)}
						</motion.button>

						{/* Quick Amount Buttons */}
						<motion.div
							className="flex gap-2 justify-center"
							variants={itemVariants}
						>
							{[100, 500, 1000, 5000].map((amount) => (
								<motion.button
									key={amount}
									type="button"
									className="px-3 py-2 text-xs border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
									onClick={() =>
										handleChange({
											target: { name: "amount", value: amount.toString() },
										})
									}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									${amount}
								</motion.button>
							))}
						</motion.div>
					</div>
				</motion.form>

				{/* Info Section */}
				<motion.div
					className="mt-8 bg-[#5162be]/10 border border-[#5162be]/40 rounded-lg p-6 max-w-xl mx-auto"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5 }}
				>
					<h4 className="font-semibold text-[#5162be] mb-2 flex items-center gap-2">
						<MdAccountBalance className="w-4 h-4" />
						Withdrawal Information
					</h4>
					<ul className="text-sm text-[#5162be]/80 space-y-1">
						<li>• Withdrawals are processed within 1-24 hours</li>
						<li>• Minimum withdrawal amount: $10.00</li>
						<li>• No withdrawal fees for most methods</li>
						<li>• Contact support for any issues</li>
					</ul>
				</motion.div>
			</div>

			{/* Toast Notifications */}
			<AnimatePresence>
				{error && (
					<Errortoast
						msg={error}
						onClose={() => setError("")}
						duration={5000}
					/>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{success && (
					<Successtoast
						msg={success}
						onClose={() => setSuccess("")}
						duration={5000}
					/>
				)}
			</AnimatePresence>

			{mutation.isPending && <Loadingmodal />}
		</section>
	);
};

export default Withdraw;
