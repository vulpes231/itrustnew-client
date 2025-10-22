import React from "react";
import { pallete } from "../constants";

const Custominput = ({
	optional,
	type,
	value,
	onChange,
	name,
	label,
	placeHolder,
}) => {
	return (
		<div className="w-full">
			<label
				htmlFor=""
				className="flex items-center whitespace-nowrap capitalize"
			>
				{label}
				<span className={optional ? "text-red-500 " : "hidden"}>*</span>
			</label>
			<input
				type={type}
				className={`${pallete.borders.light} border h-[38px] p-2 w-full focus:outline-[#5162be] outline-none rounded-sm`}
				value={value}
				onChange={onChange}
				name={name}
				placeholder={placeHolder}
			/>
		</div>
	);
};

export default Custominput;
