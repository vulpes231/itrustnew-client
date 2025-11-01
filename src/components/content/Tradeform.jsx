import React, { useState, useEffect, useCallback } from "react";
import Customselect from "../Customselect";
import { handleFormChange } from "../../constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAssetInfo, searchAssets } from "../../services/assetService";
import { motion, AnimatePresence } from "framer-motion";
import numeral from "numeral";
import { getUserWallets } from "../../services/walletService";
import { openPosition } from "../../services/tradeService";
import Loadingmodal from "../Loadingmodal";
import Errortoast from "../toast/Errortoast";
import Successtoast from "../toast/Successtoast";

const tradeBtns = [
	{ id: "buy", name: "buy" },
	{ id: "sell", name: "sell" },
];

const style = {
	label:
		"bg-gray-100 py-3 px-4 capitalize text-gray-700 text-sm font-medium flex items-center justify-center min-w-[80px] border-r border-gray-200",
	input:
		"border w-full p-3 border-gray-300 outline-none focus:border-[#5126be] focus:ring-2 focus:ring-[#5126be]/20 transition-all duration-200 font-medium",
	container:
		"bg-white shadow-lg rounded-xl border border-gray-100 overflow-hidden",
	sectionTitle: "font-bold text-xl text-gray-900",
	actionBtn: (isActive, action) =>
		`capitalize px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
			isActive
				? action === "buy"
					? "bg-green-500 text-white shadow-lg shadow-green-500/25"
					: "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
				: "text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200"
		}`,
	submitBtn: (action) =>
		`mb-4 p-3 h-[48px] w-full font-bold capitalize rounded-lg transition-all duration-200 ${
			action === "buy"
				? "bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40"
				: "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
		} transform hover:scale-[1.02] active:scale-[0.98]`,
	infoSection: (action) =>
		`flex items-center justify-between w-full px-6 py-4 ${
			action === "buy"
				? "bg-green-50 border-b border-green-100"
				: "bg-orange-50 border-b border-orange-100"
		}`,
	infoText: (action) =>
		`font-semibold capitalize ${
			action === "buy" ? "text-green-800" : "text-orange-800"
		}`,
	balanceText: "text-gray-600 font-medium text-sm",
	formRow: "flex flex-col gap-2",
	inputGroup:
		"flex rounded-lg overflow-hidden border border-gray-300 focus-within:border-[#5126be] focus-within:ring-2 focus-within:ring-[#5126be]/20 transition-all duration-200",
	infoItem:
		"flex items-center justify-between py-2.5 px-1 border-b border-gray-100 last:border-b-0",
	infoLabel: "text-gray-600 font-medium text-sm capitalize",
	infoValue: "text-gray-900 font-semibold text-sm",
};

const Tradeform = () => {
	const [selectedAction, setSelectedAction] = useState("buy");
	const [searchQuery, setSearchQuery] = useState("");
	const [showResults, setShowResults] = useState(false);
	const [selectedAsset, setSelectedAsset] = useState(null);
	const [debouncedQuery, setDebouncedQuery] = useState("");
	const [selectedWallet, setSelectedWallet] = useState("");
	const [error, setError] = useState("");

	const [form, setForm] = useState({
		assetId: "",
		orderType: "",
		amount: "",
		walletId: "",
	});

	// Debounce search query
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedQuery(searchQuery);
		}, 300);

		return () => clearTimeout(timer);
	}, [searchQuery]);

	const { data: searchResults, isLoading: searchLoading } = useQuery({
		queryFn: () => searchAssets(debouncedQuery),
		queryKey: ["assets", "search", debouncedQuery],
		enabled: debouncedQuery.length > 0 && showResults,
		staleTime: 1000 * 60 * 5,
	});

	const { data: selectedAssetData } = useQuery({
		queryFn: () => getAssetInfo(form.assetId),
		queryKey: ["asset", form.assetId],
		enabled: !!form.assetId,
	});

	const { data: wallets, isLoading: getWalletsLoading } = useQuery({
		queryFn: getUserWallets,
		queryKey: ["wallets"],
	});

	const handleWalletChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));

		// Find the selected wallet object from the wallets array
		const selected = wallets?.find((wallet) => wallet._id === value);
		setSelectedWallet(selected);
	};

	const calculateCoinAmount = () => {
		if (!form.amount || !selectedAssetData?.priceData?.current) return 0;
		const usdAmount = parseFloat(form.amount);
		const coinPrice = selectedAssetData.priceData.current;
		return usdAmount / coinPrice;
	};

	// Calculate total (same as amount since it's USD)
	const calculateTotal = () => {
		return form.amount ? parseFloat(form.amount) : 0;
	};

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
		setShowResults(true);
	};

	const handleAssetSelect = (asset) => {
		setSelectedAsset(asset);
		setForm((prev) => ({ ...prev, assetId: asset._id }));
		setSearchQuery(asset.name || asset.symbol);
		setShowResults(false);
	};

	const handleInputFocus = () => {
		if (searchQuery) {
			setShowResults(true);
		}
	};

	const handleInputBlur = (e) => {
		// Delay hiding to allow for click on results
		setTimeout(() => {
			setShowResults(false);
		}, 200);
	};

	const mutation = useMutation({
		mutationFn: openPosition,
		onError: (err) => {
			setError(err.message);
		},
	});

	const handleFormSubmit = (e) => {
		e.preventDefault();

		form.orderType = selectedAction;
		console.log("Trade form submitted:", {
			...form,
		});
		mutation.mutate(form);
		// Add your trade submission logic here
	};

	const handleAmountChange = (e) => {
		const { name, value } = e.target;
		// Allow only numbers and decimal point
		if (value === "" || /^\d*\.?\d*$/.test(value)) {
			setForm((prev) => ({ ...prev, [name]: value }));
		}
	};

	// Animation variants
	const dropdownVariants = {
		hidden: {
			opacity: 0,
			y: -10,
			scale: 0.95,
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.2,
				ease: "easeOut",
			},
		},
		exit: {
			opacity: 0,
			y: -10,
			scale: 0.95,
			transition: {
				duration: 0.15,
				ease: "easeIn",
			},
		},
	};

	const coinAmount = calculateCoinAmount();
	const totalAmount = calculateTotal();

	useEffect(() => {
		if (error) {
			const timeout = setTimeout(() => setError(""), 5000);
			return () => clearTimeout(timeout);
		}
	}, [error]);

	useEffect(() => {
		if (mutation.isSuccess) {
			const timeout = setTimeout(() => {
				mutation.reset();
				window.location.reload();
			}, 5000);
			return () => clearTimeout(timeout);
		}
	}, [mutation.isSuccess]);

	return (
		<div className={style.container}>
			{/* Header Section */}
			<div className="px-6 pt-6 pb-4 border-b border-gray-100">
				<div className="flex items-center justify-between w-full mb-4">
					<h3 className={style.sectionTitle}>Trading</h3>
					<span className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
						{tradeBtns.map((btn) => {
							return (
								<button
									type="button"
									className={style.actionBtn(selectedAction === btn.id, btn.id)}
									onClick={() => setSelectedAction(btn.id)}
									key={btn.id}
								>
									{btn.name}
								</button>
							);
						})}
					</span>
				</div>

				{/* Info Banner */}
				<div className={style.infoSection(selectedAction)}>
					<h3 className={style.infoText(selectedAction)}>
						{selectedAction} asset
					</h3>
					<h6 className={style.balanceText}>
						Balance: $
						{numeral(selectedWallet?.availableBalance).format("0,0.00")}
					</h6>
				</div>
			</div>

			{/* Form Section */}
			<form
				className="flex flex-col gap-5 px-6 py-4"
				onSubmit={handleFormSubmit}
			>
				{/* Select Inputs */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* Asset Search Input */}
					<div className={style.formRow}>
						<label className="text-sm font-medium text-gray-700 mb-1">
							Search Asset
						</label>
						<div className="relative">
							<input
								type="text"
								value={searchQuery}
								onChange={handleSearchChange}
								onFocus={handleInputFocus}
								onBlur={handleInputBlur}
								placeholder="Search for assets..."
								className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-[#5126be] focus:ring-2 focus:ring-[#5126be]/20 transition-all duration-200 font-medium"
							/>

							{searchLoading && (
								<div className="absolute right-3 top-1/2 transform -translate-y-1/2">
									<div className="w-4 h-4 border-2 border-[#5126be] border-t-transparent rounded-full animate-spin"></div>
								</div>
							)}

							{/* Search Results Dropdown */}
							<AnimatePresence>
								{showResults && searchResults && (
									<motion.div
										className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto z-50"
										variants={dropdownVariants}
										initial="hidden"
										animate="visible"
										exit="exit"
									>
										{searchResults.length > 0 ? (
											searchResults.map((asset) => (
												<div
													key={asset._id}
													className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 border-b border-gray-100 last:border-b-0"
													onClick={() => handleAssetSelect(asset)}
												>
													{asset.imageUrl && (
														<img
															src={asset.imageUrl}
															alt={asset.name}
															className="w-6 h-6 rounded-full"
														/>
													)}
													<div className="flex-1">
														<p className="font-medium text-gray-900 text-sm">
															{asset.name}
														</p>
														<p className="text-gray-500 text-xs">
															{asset.symbol}
														</p>
													</div>
													{asset.priceData && (
														<p className="font-semibold text-gray-900 text-sm">
															$
															{numeral(asset.priceData.current).format(
																"0,0.00"
															)}
														</p>
													)}
												</div>
											))
										) : (
											<div className="p-4 text-center text-gray-500 text-sm">
												No assets found
											</div>
										)}
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>

					{/* Method Select */}
					<div className={style.formRow}>
						<Customselect
							name={"walletId"}
							onChange={handleWalletChange}
							label={"Select wallet"}
							value={form.walletId}
							options={
								wallets?.map((wallet) => ({
									id: wallet._id,
									name: wallet.name,
									value: wallet._id,
								})) || []
							}
						/>
					</div>
				</div>

				{/* Selected Asset Info */}
				{selectedAssetData && (
					<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								{selectedAssetData.imageUrl && (
									<img
										src={selectedAssetData.imageUrl}
										alt={selectedAssetData.name}
										className="w-8 h-8 rounded-full"
									/>
								)}
								<div>
									<p className="font-semibold text-gray-900">
										{selectedAssetData.name}
									</p>
									<p className="text-sm text-gray-600">
										{selectedAssetData.symbol}
									</p>
								</div>
							</div>
							{selectedAssetData.priceData && (
								<div className="text-right">
									<p className="font-bold text-gray-900 text-lg">
										$
										{numeral(selectedAssetData.priceData.current).format(
											"0,0.00"
										)}
									</p>
									<p
										className={`text-sm ${
											selectedAssetData.priceData.current -
												selectedAssetData.priceData.previousClose >=
											0
												? "text-green-600"
												: "text-red-600"
										}`}
									>
										{(
											((selectedAssetData.priceData.current -
												selectedAssetData.priceData.previousClose) /
												selectedAssetData.priceData.previousClose) *
											100
										).toFixed(2)}
										%
									</p>
								</div>
							)}
						</div>
					</div>
				)}

				{/* Amount Input (USD) */}
				<div className={style.formRow}>
					<label className="text-sm font-medium text-gray-700 mb-1">
						Amount (USD)
					</label>
					<div className={style.inputGroup}>
						<label className={style.label}>USD</label>
						<input
							type="text"
							placeholder="0.00"
							className={`${style.input} border-0 rounded-none`}
							value={form.amount}
							onChange={handleAmountChange}
							name="amount"
						/>
					</div>
					{form.amount && selectedAssetData?.priceData?.current && (
						<p className="text-sm text-gray-600 mt-1">
							≈ {coinAmount.toFixed(6)}{" "}
							{selectedAssetData.symbol?.replace("USD", "")}
						</p>
					)}
				</div>

				{/* Price Input (Read-only) */}
				<div className={style.formRow}>
					<label className="text-sm font-medium text-gray-700 mb-1">
						Current Price
					</label>
					<div className={style.inputGroup}>
						<label className={style.label}>Price</label>
						<input
							type="text"
							className={`${style.input} border-0 rounded-none bg-gray-50`}
							readOnly
							placeholder="0.00"
							value={
								selectedAssetData?.priceData?.current
									? numeral(selectedAssetData.priceData.current).format(
											"0,0.00"
									  )
									: ""
							}
						/>
						<label
							className={`${style.label} border-l border-r-0 min-w-[60px]`}
						>
							USD
						</label>
					</div>
				</div>

				{/* Total Input (Read-only) */}
				{/* <div className={style.formRow}>
					<label className="text-sm font-medium text-gray-700 mb-1">
						Total Cost
					</label>
					<div className={style.inputGroup}>
						<label className={style.label}>Total</label>
						<input
							type="text"
							className={`${style.input} border-0 rounded-none bg-gray-50`}
							readOnly
							placeholder="0.00"
							value={totalAmount ? numeral(totalAmount).format("0,0.00") : ""}
						/>
						<label
							className={`${style.label} border-l border-r-0 min-w-[60px]`}
						>
							USD
						</label>
					</div>
				</div> */}

				{/* Transaction Info */}
				<div className="bg-gray-50 rounded-lg p-4 space-y-2">
					<div className={style.infoItem}>
						<label className={style.infoLabel}>You {selectedAction}</label>
						<h3 className={style.infoValue}>
							{coinAmount > 0 ? coinAmount.toFixed(6) : "0.00"}{" "}
							{selectedAssetData?.symbol?.replace("USD", "") || "---"}
						</h3>
					</div>
					<div className={style.infoItem}>
						<label className={style.infoLabel}>Transaction Fees (0.01%)</label>
						<h3 className={style.infoValue}>
							$
							{totalAmount
								? numeral(totalAmount * 0.0001).format("0,0.00")
								: "0.00"}
						</h3>
					</div>
					<div className={style.infoItem}>
						<label className={style.infoLabel}>Estimated Rate</label>
						<h3 className={style.infoValue}>
							1 {selectedAssetData?.symbol?.replace("USD", "") || "BTC"} ≈ $
							{selectedAssetData?.priceData?.current
								? numeral(selectedAssetData.priceData.current).format("0,0.00")
								: "0.00"}
						</h3>
					</div>
					<div className={`${style.infoItem} pt-2 border-t border-gray-200`}>
						<label className="text-gray-900 font-bold text-sm">
							Total Cost
						</label>
						<h3 className="text-gray-900 font-bold text-lg">
							$
							{totalAmount
								? numeral(totalAmount + totalAmount * 0.0001).format("0,0.00")
								: "0.00"}
						</h3>
					</div>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					className={style.submitBtn(selectedAction)}
					disabled={
						!form.assetId || !form.amount || parseFloat(form.amount) <= 0
					}
				>
					{selectedAction} Now
				</button>
			</form>
			{mutation.isPending && <Loadingmodal />}
			{error && (
				<Errortoast msg={error} duration={3000} onClose={() => setError("")} />
			)}
			{mutation.isSuccess && (
				<Successtoast
					msg={"Position opened successfully."}
					duration={3000}
					onClose={() => mutation.reset()}
				/>
			)}
		</div>
	);
};

export default Tradeform;
