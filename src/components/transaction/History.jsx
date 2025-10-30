import React from "react";

const headers = [
	"timestamp",
	"method",
	"from",
	"to",
	"memo",
	"type",
	"amount",
	"status",
];

const History = () => {
	return (
		<div className="bg-white overflow-auto p-6 flex flex-col gap-6">
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<h3>all transactions</h3>
				<span>
					<input type="text" className="border border-gray-300" />
					<button>filter</button>
				</span>
			</div>
			<table className="min-w-full">
				<thead>
					{headers.map((head, index) => {
						return <th key={index}>{head}</th>;
					})}
				</thead>
			</table>
		</div>
	);
};

export default History;
