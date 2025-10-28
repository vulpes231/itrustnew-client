import React, { useState } from "react";
import Customselect from "../Customselect";
import { handleFormChange } from "../../constants";

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
	const [form, setForm] = useState({
		assetId: "",
		type: "",
		amount: "",
		action: "",
		method: "",
	});

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
					<h6 className={style.balanceText}>Balance: $1,000.00</h6>
				</div>
			</div>

			{/* Form Section */}
			<form className="flex flex-col gap-5 px-6 py-4">
				{/* Select Inputs */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className={style.formRow}>
						<Customselect
							name={"assetId"}
							onChange={(e) => handleFormChange(e, form, setForm)}
							label={"Select asset"}
						/>
					</div>
					<div className={style.formRow}>
						<Customselect
							name={"method"}
							onChange={(e) => handleFormChange(e, form, setForm)}
							label={"Select method"}
						/>
					</div>
				</div>

				{/* Amount Input */}
				<div className={style.formRow}>
					<label className="text-sm font-medium text-gray-700 mb-1">
						Amount
					</label>
					<div className={style.inputGroup}>
						<label className={style.label}>Amount</label>
						<input
							type="text"
							placeholder="0.00"
							className={`${style.input} border-0 rounded-none`}
						/>
					</div>
				</div>

				{/* Price Input */}
				<div className={style.formRow}>
					<label className="text-sm font-medium text-gray-700 mb-1">
						Price
					</label>
					<div className={style.inputGroup}>
						<label className={style.label}>Price</label>
						<input
							type="text"
							className={`${style.input} border-0 rounded-none`}
							readOnly
							placeholder="0.00"
						/>
						<label
							className={`${style.label} border-l border-r-0 min-w-[60px]`}
						>
							USD
						</label>
					</div>
				</div>

				{/* Total Input */}
				<div className={style.formRow}>
					<label className="text-sm font-medium text-gray-700 mb-1">
						Total
					</label>
					<div className={style.inputGroup}>
						<label className={style.label}>Total</label>
						<input
							type="text"
							className={`${style.input} border-0 rounded-none`}
							readOnly
							placeholder="0.00"
						/>
					</div>
				</div>

				{/* Transaction Info */}
				<div className="bg-gray-50 rounded-lg p-4 space-y-2">
					<div className={style.infoItem}>
						<label className={style.infoLabel}>Transaction Fees (0.01%)</label>
						<h3 className={style.infoValue}>$0.00</h3>
					</div>
					<div className={style.infoItem}>
						<label className={style.infoLabel}>Estimated Rate</label>
						<h3 className={style.infoValue}>1 BTC ≈ $114,114.00</h3>
					</div>
					{/* <div className={`${style.infoItem} pt-2 border-t border-gray-200`}>
						<label className="text-gray-900 font-bold text-sm">
							Total Cost
						</label>
						<h3 className="text-gray-900 font-bold text-lg">$0.00</h3>
					</div> */}
				</div>

				{/* Submit Button */}
				<button type="submit" className={style.submitBtn(selectedAction)}>
					{selectedAction} Now
				</button>
			</form>
		</div>
	);
};

export default Tradeform;
