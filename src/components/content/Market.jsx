import React from "react";
import Slider from "./Slider";
import Assettable from "./Assettable";
import Tradeform from "./Tradeform";

const Market = () => {
	return (
		<div className="flex flex-col gap-6 w-full px-6">
			<Slider />
			<div className="flex flex-col gap-6 lg:flex-row">
				<div className="lg:w-2/3 w-full">
					<Assettable />
				</div>
				<div className="lg:w-1/3 w-full">
					<Tradeform />
				</div>
			</div>
		</div>
	);
};

export default Market;
