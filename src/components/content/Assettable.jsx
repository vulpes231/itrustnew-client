import React from "react";
import { assets } from "../../constants";

const style = {
	td: "px-6 py-2 whitespace-nowrap text-center",
	th: "px-6 py-2 whitespace-nowrap",
};

const Assettable = () => {
	return (
		<div className="bg-white rounded-md shadow-sm overflow-auto">
			<div className="flex items-center justify-between w-full mb-4">
				<h3 className="font-semibold text-gray-800 p-6">Assets</h3>
			</div>
			<table className="min-w-full">
				<thead>
					<tr className="border-t border-b border-gray-300 bg-slate-100">
						<th className={style.th}>coin name</th>
						<th className={style.th}>price</th>
						<th className={style.th}>coin name</th>
						<th className={style.th}>24H change</th>

						<th className={style.th}>action</th>
					</tr>
				</thead>
				<tbody>
					{assets && assets.length > 0 ? (
						assets.map((asset) => {
							return (
								<tr key={asset.id}>
									<td className={style.td}>{asset.name}</td>
									<td className={style.td}>${asset.price.toLocaleString()}</td>
									<td className={style.td}>coin name</td>
									<td className={style.td}>{asset.percentChange}</td>

									<td className={style.td}>
										<span className="py-1 px-2 bg-[#5162be]/10 text-[#5162be] rounded-sm text-sm capitalize">
											trade
										</span>
									</td>
								</tr>
							);
						})
					) : (
						<div>
							<h3>No assets found</h3>
						</div>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default Assettable;
