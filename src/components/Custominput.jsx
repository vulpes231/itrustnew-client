import React from "react";
import { pallete } from "../constants";

const Custominput = ({
	optional = false,
	type = "text",
	value = "",
	onChange,
	name,
	label,
	placeHolder = "",
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

			<input
				id={name}
				type={type}
				className={`border h-[38px] p-2 w-full rounded-sm placeholder:font-light focus:outline-[#5162be] outline-none 
					${pallete?.borders?.light || "border-gray-300"} 
					${error ? "border-red-500" : ""}`}
				value={value}
				onChange={onChange}
				name={name}
				placeholder={placeHolder || `Enter ${label}`}
			/>

			{error && (
				<small className="text-red-500 font-light text-sm mt-1 block">
					{error}
				</small>
			)}
		</div>
	);
};

export default Custominput;
