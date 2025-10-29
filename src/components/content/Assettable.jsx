import React from "react";
import { assets } from "../../constants";
import { getAssets } from "../../services/assetService";
import { useQuery } from "@tanstack/react-query";

const style = {
	td: "px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-center text-sm md:text-base font-medium text-gray-700 border-b border-gray-100",
	th: "px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-center text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider bg-gray-50/80",
	tableContainer:
		"bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden",
	header:
		"flex items-center justify-between w-full px-4 md:px-6 py-4 border-b border-gray-100",
	title: "font-bold text-lg md:text-xl text-gray-900",
	tradeBtn:
		"py-2 px-3 md:px-4 bg-[#5126be]/10 hover:bg-[#5126be] text-[#5126be] hover:text-white rounded-md text-xs md:text-sm font-medium capitalize transition-all duration-200 cursor-pointer transform hover:scale-105",
	positiveChange:
		"inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200",
	negativeChange:
		"inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200",
};

const Assettable = () => {
	const queryData = {
		limit: 10,
		sortBy: "priceData.volume",
	};
	const {
		data: assets = [],
		isLoading,
		isError,
	} = useQuery({
		queryFn: () => getAssets(queryData),
		queryKey: ["assets", "popular"],
	});
	return (
		<div className={style.tableContainer}>
			<div className={style.header}>
				<h3 className={style.title}>Assets</h3>
				<div className="flex items-center gap-2">
					<span className="text-xs md:text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
						{assets?.length || 0} assets
					</span>
				</div>
			</div>

			<div className="overflow-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead>
						<tr className="bg-gray-50/50">
							<th className={`${style.th} text-left`}>Asset</th>
							<th className={style.th}>Price</th>
							<th className={style.th}>Symbol</th>
							<th className={style.th}>24H Change</th>
							<th className={style.th}>Action</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{assets && assets.length > 0 ? (
							assets.map((asset) => {
								const isPositive = asset?.priceData?.changePercent > 0;
								return (
									<tr
										key={asset.id}
										className="hover:bg-[#5126be]/3 transition-colors duration-150 group"
									>
										<td className={`${style.td} text-left`}>
											<div className="flex items-center gap-3">
												<div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#5126be]/20 to-[#5126be]/10 rounded-full flex items-center justify-center">
													<img
														src={asset?.imageUrl}
														alt=""
														className="w-[40px]"
													/>
												</div>
												<div className="flex flex-col">
													<span className="font-semibold text-gray-900 text-sm md:text-base">
														{`${
															asset?.name.length > 13
																? `${asset?.name.slice(0, 16)}...`
																: asset?.name
														}`}
													</span>
													<span className="text-xs text-gray-500 uppercase">
														{asset?.symbol}
													</span>
												</div>
											</div>
										</td>
										<td className={`${style.td} font-mono`}>
											${asset.priceData?.current?.toLocaleString()}
										</td>
										<td
											className={`${style.td} font-mono text-gray-600 uppercase`}
										>
											{asset?.symbol}
										</td>
										<td className={style.td}>
											<span
												className={
													isPositive
														? style.positiveChange
														: style.negativeChange
												}
											>
												{isPositive ? "↗" : "↘"}{" "}
												{parseFloat(asset?.priceData?.changePercent).toFixed(2)}
												%
											</span>
										</td>
										<td className={style.td}>
											<button className={style.tradeBtn}>Trade</button>
										</td>
									</tr>
								);
							})
						) : (
							<tr>
								<td colSpan="5" className="px-6 py-12 text-center">
									<div className="flex flex-col items-center justify-center text-gray-500">
										<svg
											className="w-12 h-12 mb-3 text-gray-300"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={1}
												d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
											/>
										</svg>
										<h3 className="text-lg font-medium text-gray-900 mb-1">
											No assets found
										</h3>
										<p className="text-sm">
											Start by adding your first asset to track
										</p>
									</div>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Assettable;
