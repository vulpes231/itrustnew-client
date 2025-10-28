import React, { useState } from "react";
import Customselect from "../Customselect";
import { handleFormChange } from "../../constants";

const tradeBtns = [
	{ id: "buy", name: "buy" },
	{ id: "sell", name: "sell" },
];

const style = {
	label:
		"bg-slate-700/20 py-2 px-4 capitalize text-slate-800 text-sm flex items-center justify-center",
	input:
		"border w-full p-2 border-gray-200 outline-none focus:border-[#5162be]/40",
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
		<div className="bg-white shadow-md rounded-sm flex flex-col gap-4 text-slate-600">
			<div>
				<div className="flex items-center justify-between w-full px-6 py-1">
					<h3 className="font-semibold text-gray-800">Trading</h3>
					<span className="flex items-center gap-2">
						{tradeBtns.map((btn) => {
							return (
								<button
									type="button"
									className={`${
										selectedAction === btn.id
											? "text-[#5126be] border-b border-[#5126be]"
											: ""
									} capitalize px-6 py-1.5`}
									onClick={() => setSelectedAction(btn.id)}
									key={btn.id}
								>
									{btn.name}
								</button>
							);
						})}
					</span>
				</div>
				<div
					className={`flex items-center justify-between w-full  px-6 py-3 ${
						selectedAction === "buy" ? "bg-green-400/10" : "bg-orange-400/10"
					}`}
				>
					<h3>{selectedAction} asset</h3>
					<h6>Balance: $1,000</h6>
				</div>
			</div>
			<form className="flex flex-col gap-4 px-6 py-1">
				<div className="flex items-center gap-2">
					<Customselect
						name={"assetId"}
						onChange={(e) => handleFormChange(e, form, setForm)}
						label={"asset"}
					/>
					<Customselect
						name={"method"}
						onChange={(e) => handleFormChange(e, form, setForm)}
						label={"payment method"}
					/>
				</div>
				<div className="flex">
					<label
						htmlFor=""
						className={`${style.label} rounded-tl-sm rounded-bl-sm`}
					>
						amount
					</label>
					<input
						type="text"
						className={`${style.input} rounded-tr-sm rounded-br-sm`}
					/>
				</div>
				<div className="flex">
					<label
						htmlFor=""
						className={`${style.label} rounded-tl-sm rounded-bl-sm`}
					>
						price
					</label>
					<input type="text" className={style.input} readOnly />
					<label
						htmlFor=""
						className={`${style.label} rounded-tr-sm rounded-br-sm`}
					>
						$
					</label>
				</div>
				<div className="flex">
					<label
						htmlFor=""
						className={`${style.label} rounded-tl-sm rounded-bl-sm`}
					>
						total
					</label>
					<input
						type="text"
						className={`${style.input} rounded-tr-sm rounded-br-sm`}
						readOnly
					/>
				</div>
				<div className="flex flex-col gap-3">
					<div className="flex items-center justify-between text-slate-800 text-sm">
						<label className="capitalize font-medium" htmlFor="">
							transaction fees(0.01%)
						</label>
						<h3>$0.00</h3>
					</div>
					<div className="flex items-center justify-between text-slate-800 text-sm">
						<label className="capitalize font-medium" htmlFor="">
							estimated rate
						</label>
						<h3>1 BTC ~ $114,114.00</h3>
					</div>
				</div>
				<button className="mb-4 p-2 h-[40px] bg-[#5162be] text-white font-bold capitalize rounded-sm">
					{selectedAction}
				</button>
			</form>
		</div>
	);
};

export default Tradeform;
