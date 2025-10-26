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
}) => {
	return (
		<div className="w-full">
			<label
				htmlFor={name}
				className="flex items-center whitespace-nowrap capitalize mb-1"
			>
				{label}
				{!optional && <span className="text-red-500 ml-1">*</span>}
			</label>
			<select
				name={name}
				value={value}
				onChange={onChange}
				className={`capitalize border h-[38px] p-2 w-full rounded-sm placeholder:font-light focus:outline-[#5162be] outline-none 
					${pallete?.borders?.light || "border-gray-300"} 
					${error ? "border-red-500" : ""}`}
			>
				<option value="">select {label}</option>
				{options &&
					options.length > 0 &&
					options.map((opt) => {
						return (
							<option
								key={opt._id || opt.id || opt}
								value={opt._id || opt.id || opt}
							>
								{opt.title || opt.name}
							</option>
						);
					})}
			</select>
		</div>
	);
};

export default Customselect;
