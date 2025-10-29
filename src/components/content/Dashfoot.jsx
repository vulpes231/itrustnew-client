import React from "react";
import Recentactivity from "./Recentactivity";
import Topperformer from "./Topperformer";
import News from "./News";

const Dashfoot = () => {
	return (
		<div className="p-6 flex flex-col gap-6">
			<div className="flex flex-col gap-6 lg:flex-row">
				<div className="w-full">
					<Recentactivity />
				</div>
				<div className="w-full">
					<Topperformer />
				</div>
			</div>
			<div className="w-full">
				<News />
			</div>
		</div>
	);
};

export default Dashfoot;
