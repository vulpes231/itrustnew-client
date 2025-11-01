import React, { useState, useEffect } from "react";
import {
	Authnav,
	Custominput,
	Pageheader,
	Pagetitle,
	Errortoast,
	Successtoast,
	Loadingmodal,
} from "../components";
import { FaExchangeAlt } from "react-icons/fa";
import { getUserWallets } from "../services/walletService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { transferFunds } from "../services/transactionService";
import { MdWallet, MdAccountBalance, MdSavings } from "react-icons/md";
import { SiBitcoin, SiEthereum } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import numeral from "numeral";

const Transfer = () => {
	const [form, setForm] = useState({
		fromWallet: "",
		toWallet: "",
		amount: "",
		memo: "",
	});
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const { data: wallets, isLoading: getWalletsLoading } = useQuery({
		queryKey: ["wallets"],
		queryFn: getUserWallets,
	});

	const mutation = useMutation({
		mutationFn: () => transferFunds(form),
		onSuccess: (data) => {
			setSuccess("Transfer completed successfully!");
			setForm({ fromWallet: "", toWallet: "", amount: "", memo: "" });
		},
		onError: (err) => {
			setError(err.message || "Transfer failed. Please try again.");
		},
	});

	const cashWallet = wallets?.find((wallet) => wallet.name === "cash");
	const otherWallets = wallets?.filter((wallet) => wallet.name !== "cash");

	useEffect(() => {
		// Set default from wallet to cash wallet and first other wallet as to
		if (
			cashWallet &&
			otherWallets?.length > 0 &&
			!form.fromWallet &&
			!form.toWallet
		) {
			setForm({
				fromWallet: cashWallet._id,
				toWallet: otherWallets[0]._id,
				amount: "",
				memo: "",
			});
		}
	}, [cashWallet, otherWallets, form.fromWallet, form.toWallet]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleWalletSelect = (walletId, type) => {
		setForm((prev) => ({ ...prev, [type]: walletId }));
	};

	const handleSwapWallets = () => {
		setForm((prev) => ({
			...prev,
			fromWallet: prev.toWallet,
			toWallet: prev.fromWallet,
			amount: "", // Clear amount on swap for safety
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Validation
		if (!form.fromWallet) {
			setError("Please select source wallet");
			return;
		}
		if (!form.toWallet) {
			setError("Please select destination wallet");
			return;
		}
		if (form.fromWallet === form.toWallet) {
			setError("Cannot transfer to the same wallet");
			return;
		}
		if (!form.amount || parseFloat(form.amount) <= 0) {
			setError("Please enter a valid amount");
			return;
		}

		const selectedFromWallet = wallets?.find((w) => w._id === form.fromWallet);
		// if (
		// 	selectedFromWallet &&
		// 	parseFloat(form.amount) > selectedFromWallet.availableBalance
		// ) {
		// 	setError("Insufficient balance in source wallet");
		// 	return;
		// }
		console.log(form);

		// mutation.mutate();
	};

	useEffect(() => {
		if (error) {
			const timeout = setTimeout(() => setError(""), 5000);
			return () => clearTimeout(timeout);
		}
	}, [error]);

	useEffect(() => {
		if (success) {
			const timeout = setTimeout(() => setSuccess(""), 5000);
			return () => clearTimeout(timeout);
		}
	}, [success]);

	const getWalletIcon = (walletName) => {
		const name = walletName?.toLowerCase();
		switch (name) {
			case "cash":
				return <MdWallet className="w-5 h-5 text-[#5162be]" />;
			case "automated investing":
				return <MdSavings className="w-5 h-5 text-green-500" />;
			case "brokerage":
				return <MdAccountBalance className="w-5 h-5 text-purple-500" />;
			case "bitcoin":
				return <SiBitcoin className="w-5 h-5 text-orange-500" />;
			case "ethereum":
				return <SiEthereum className="w-5 h-5 text-gray-500" />;
			default:
				return <MdWallet className="w-5 h-5 text-gray-500" />;
		}
	};

	const getWalletColor = (walletName) => {
		const name = walletName?.toLowerCase();
		switch (name) {
			case "cash":
				return "bg-blue-50 border-blue-200";
			case "savings":
				return "bg-green-50 border-green-200";
			case "investment":
				return "bg-purple-50 border-purple-200";
			case "bitcoin":
				return "bg-orange-50 border-orange-200";
			case "ethereum":
				return "bg-gray-50 border-gray-200";
			default:
				return "bg-gray-50 border-gray-200";
		}
	};

	const selectedFromWallet = wallets?.find((w) => w._id === form.fromWallet);
	const selectedToWallet = wallets?.find((w) => w._id === form.toWallet);

	// Determine which wallets to show in each section
	const showAsFromWallet = (wallet) => {
		return wallet._id === form.fromWallet;
	};

	const showAsToWallet = (wallet) => {
		return wallet._id === form.toWallet;
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

	const swapVariants = {
		hover: { scale: 1.1, rotate: 180 },
		tap: { scale: 0.9 },
	};

	if (getWalletsLoading) {
		return (
			<section className="bg-slate-50 min-h-screen text-slate-600">
				<Authnav />
				<Pageheader
					page={"Transfer"}
					description="Transfer funds between your wallets"
				/>
				<div className="p-6 max-w-4xl mx-auto">
					<div className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex items-center justify-center">
						<div className="flex flex-col items-center gap-3">
							<div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
							<p className="text-gray-500">Loading wallets...</p>
						</div>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="bg-slate-100 min-h-screen text-slate-600">
			<Authnav />
			<Pageheader
				page={"Transfer"}
				// description="Transfer funds between your wallets securely"
			/>
			<Pagetitle />

			<div className="p-6 max-w-4xl mx-auto">
				<motion.form
					onSubmit={handleSubmit}
					className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
					initial="hidden"
					animate="visible"
					variants={containerVariants}
				>
					{/* Header */}
					<motion.div
						className="bg-[#5162be] p-6 text-white"
						variants={itemVariants}
					>
						<h2 className="text-xl font-bold text-center">Transfer Funds</h2>
						<p className="text-blue-100 text-center text-sm mt-1">
							Move money between your accounts instantly
						</p>
					</motion.div>

					<div className="p-6 space-y-6">
						{/* From Wallet */}
						<motion.div variants={itemVariants}>
							<label className="block text-sm font-medium text-gray-700 mb-3">
								From Wallet
							</label>
							<div className="space-y-3">
								{/* Show selected from wallet */}
								{selectedFromWallet && (
									<motion.div
										className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 border-[#5162be] bg-blue-50`}
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
									>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-3">
												<div className="p-2 bg-[#5162be]/20 rounded-lg">
													{getWalletIcon(selectedFromWallet.name)}
												</div>
												<div>
													<h3 className="font-semibold text-gray-900 capitalize">
														{selectedFromWallet.name}
													</h3>
													<p className="text-sm text-gray-500">
														Available:{" "}
														{numeral(
															selectedFromWallet.availableBalance
														).format("$0,0.00")}
													</p>
												</div>
											</div>
											<motion.div
												initial={{ scale: 0 }}
												animate={{ scale: 1 }}
												className="w-3 h-3 bg-blue-500 rounded-full"
											/>
										</div>
									</motion.div>
								)}

								{/* Show other wallets as options for from */}
								<div className="grid gap-2">
									{wallets
										?.filter(
											(wallet) =>
												wallet._id !== form.fromWallet &&
												wallet._id !== form.toWallet
										)
										.map((wallet) => (
											<motion.div
												key={wallet._id}
												className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
												onClick={() =>
													handleWalletSelect(wallet._id, "fromWallet")
												}
												whileHover={{ scale: 1.01 }}
												whileTap={{ scale: 0.99 }}
											>
												<div className="flex items-center gap-3">
													<div
														className={`p-2 rounded-lg ${getWalletColor(
															wallet.name
														)}`}
													>
														{getWalletIcon(wallet.name)}
													</div>
													<div className="flex-1">
														<h4 className="font-medium text-gray-900 capitalize text-sm">
															{wallet.name}
														</h4>
														<p className="text-xs text-gray-500">
															{numeral(wallet.availableBalance).format(
																"$0,0.00"
															)}
														</p>
													</div>
												</div>
											</motion.div>
										))}
								</div>
							</div>
						</motion.div>

						{/* Swap Icon */}
						<motion.div className="flex justify-center" variants={itemVariants}>
							<motion.button
								type="button"
								className="p-3 bg-[#5162be]/10 hover:bg-[#5162be]/40 rounded-full text-[#5162be] transition-colors duration-200"
								variants={swapVariants}
								whileHover="hover"
								whileTap="tap"
								onClick={handleSwapWallets}
								disabled={!form.fromWallet || !form.toWallet}
							>
								<FaExchangeAlt className="w-5 h-5" />
							</motion.button>
						</motion.div>

						{/* To Wallet */}
						<motion.div variants={itemVariants}>
							<label className="block text-sm font-medium text-gray-700 mb-3">
								To Wallet
							</label>
							<div className="space-y-3">
								{/* Show selected to wallet */}
								{selectedToWallet && (
									<motion.div
										className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 border-green-500 bg-green-50`}
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
									>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-3">
												<div className="p-2 bg-green-100 rounded-lg">
													{getWalletIcon(selectedToWallet.name)}
												</div>
												<div>
													<h3 className="font-semibold text-gray-900 capitalize">
														{selectedToWallet.name}
													</h3>
													<p className="text-sm text-gray-500">
														Balance:{" "}
														{numeral(selectedToWallet.availableBalance).format(
															"$0,0.00"
														)}
													</p>
												</div>
											</div>
											<motion.div
												initial={{ scale: 0 }}
												animate={{ scale: 1 }}
												className="w-3 h-3 bg-green-500 rounded-full"
											/>
										</div>
									</motion.div>
								)}

								{/* Show other wallets as options for to */}
								<div className="grid gap-2">
									{wallets
										?.filter(
											(wallet) =>
												wallet._id !== form.toWallet &&
												wallet._id !== form.fromWallet
										)
										.map((wallet) => (
											<motion.div
												key={wallet._id}
												className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
												onClick={() =>
													handleWalletSelect(wallet._id, "toWallet")
												}
												whileHover={{ scale: 1.01 }}
												whileTap={{ scale: 0.99 }}
											>
												<div className="flex items-center gap-3">
													<div
														className={`p-2 rounded-lg ${getWalletColor(
															wallet.name
														)}`}
													>
														{getWalletIcon(wallet.name)}
													</div>
													<div className="flex-1">
														<h4 className="font-medium text-gray-900 capitalize text-sm">
															{wallet.name}
														</h4>
														<p className="text-xs text-gray-500">
															{numeral(wallet.availableBalance).format(
																"$0,0.00"
															)}
														</p>
													</div>
												</div>
											</motion.div>
										))}
								</div>
							</div>
						</motion.div>

						{/* Amount Input */}
						<motion.div variants={itemVariants}>
							<Custominput
								label={"Amount (USD)"}
								name={"amount"}
								value={form.amount}
								onChange={handleChange}
								type="number"
								placeholder="0.00"
								min="0.01"
								step="0.01"
								required
							/>
							{selectedFromWallet && (
								<div className="flex justify-between mt-2">
									<span className="text-xs text-gray-500">
										Available:{" "}
										{numeral(selectedFromWallet.availableBalance).format(
											"$0,0.00"
										)}
									</span>
									<button
										type="button"
										className="text-xs text-[#5162be] hover:text-[#5162be]/60 font-medium"
										onClick={() =>
											setForm((prev) => ({
												...prev,
												amount: selectedFromWallet.availableBalance,
											}))
										}
									>
										Use Max
									</button>
								</div>
							)}
						</motion.div>

						{/* Memo Input */}
						<motion.div variants={itemVariants}>
							<Custominput
								label={"Memo (Optional)"}
								name={"memo"}
								value={form.memo}
								onChange={handleChange}
								placeholder="Add a note for this transfer"
								optional={true}
							/>
						</motion.div>

						{/* Transfer Summary */}
						{form.amount && selectedFromWallet && selectedToWallet && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: "auto" }}
								className="bg-gray-50 border border-gray-200 rounded-lg p-4"
							>
								<h4 className="font-semibold text-gray-800 mb-2">
									Transfer Summary
								</h4>
								<div className="space-y-2 text-sm">
									<div className="flex justify-between">
										<span className="text-gray-600">From:</span>
										<span className="font-medium capitalize">
											{selectedFromWallet.name}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600">To:</span>
										<span className="font-medium capitalize">
											{selectedToWallet.name}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600">Amount:</span>
										<span className="font-semibold text-green-600">
											{numeral(form.amount).format("$0,0.00")}
										</span>
									</div>
								</div>
							</motion.div>
						)}

						{/* Submit Button */}
						<motion.button
							type="submit"
							disabled={
								mutation.isPending ||
								!form.fromWallet ||
								!form.toWallet ||
								!form.amount
							}
							className="w-full bg-[#5162be] text-white py-4 px-6 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
							variants={itemVariants}
							whileHover={mutation.isPending ? {} : { scale: 1.02 }}
							whileTap={mutation.isPending ? {} : { scale: 0.98 }}
						>
							{mutation.isPending ? (
								<div className="flex items-center justify-center gap-2">
									<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
									Processing Transfer...
								</div>
							) : (
								"Transfer Funds"
							)}
						</motion.button>
					</div>
				</motion.form>

				{/* Info Section */}
				<motion.div
					className="mt-8 bg-[#5162be]/10 border border-[#5162be]/20 rounded-lg p-6 max-w-xl mx-auto"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
				>
					<h4 className="font-semibold text-[#5162be]/80 mb-2">
						Transfer Information
					</h4>
					<ul className="text-sm text-[#5162be]/70 space-y-1">
						<li>• Transfers are processed instantly</li>
						<li>• No transfer fees between your wallets</li>
						<li>• Minimum transfer amount: $1.00</li>
						<li>• Available balance is updated immediately</li>
						<li>
							• Use the exchange button to quickly swap source and destination
						</li>
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

export default Transfer;
