import React from "react";
import { pallete } from "../constants";

const Customselect = ({
	name,
	label,
	optional = false,
	options,
	value,
	onChange,
	error,
	disabled = false,
	className = "",
}) => {
	return (
		<div className={`w-full ${className}`}>
			{label && (
				<label
					htmlFor={name}
					className="flex items-center whitespace-nowrap capitalize mb-2 text-sm font-medium text-gray-700"
				>
					{label}
					{!optional && <span className="text-red-500 ml-1">*</span>}
				</label>
			)}
			<div className="relative">
				<select
					name={name}
					value={value}
					onChange={onChange}
					disabled={disabled}
					className={`
						w-full px-4 py-3 rounded-lg border transition-all duration-200
						focus:outline-none focus:ring-2 focus:ring-[#5126be] focus:border-[#5126be]
						${pallete?.borders?.light || "border-gray-300"} 
						${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}
						${
							disabled
								? "bg-gray-100 text-gray-500 cursor-not-allowed"
								: "bg-white text-gray-900"
						}
						appearance-none cursor-pointer
						hover:border-gray-400
						font-medium
					`}
				>
					<option value="" className="text-gray-500">
						Select {label?.toLowerCase() || "option"}
					</option>
					{options &&
						options.length > 0 &&
						options.map((opt) => {
							const optionValue = opt._id || opt.id || opt;
							const optionLabel = opt.title || opt.name || opt;
							return (
								<option
									key={optionValue}
									value={optionValue}
									className="capitalize py-2"
								>
									{optionLabel}
								</option>
							);
						})}
				</select>

				{/* Custom dropdown arrow */}
				<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
					<svg
						className={`w-5 h-5 transition-transform duration-200 ${
							disabled ? "text-gray-400" : "text-gray-500"
						}`}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</div>
			</div>

			{/* Error message */}
			{error && (
				<p className="mt-1 text-sm text-red-600 font-medium flex items-center gap-1">
					<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
							clipRule="evenodd"
						/>
					</svg>
					{error}
				</p>
			)}
		</div>
	);
};

export default Customselect;
