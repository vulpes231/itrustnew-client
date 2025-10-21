import React from "react";

const Custominput = ({ optional, type, value, onChange, name, label }) => {
	return (
		<div>
			<label htmlFor="" className="flex items-center whitespace-nowrap">
				{label}
				<span className={optional ? "text-red-500 " : "hidden"}>*</span>
			</label>
			<input
				type={type}
				className="border h-[43px] p-2"
				value={value}
				onChange={onChange}
				name={name}
			/>
		</div>
	);
};

export default Custominput;
