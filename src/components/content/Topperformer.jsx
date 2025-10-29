import React, { useState, useEffect } from "react";
import { getAssets } from "../../services/assetService";
import { useQuery } from "@tanstack/react-query";
import { MdTrendingUp, MdTrendingDown } from "react-icons/md";

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

const Topperformer = () => {
	const [timeFrame, setTimeFrame] = useState("1h");
	const queryData = {
		limit: 8,
		sortBy: "priceData.changePercent",
	};

	const {
		data: assetsData,
		isLoading,
		isError,
	} = useQuery({
		queryFn: () => getAssets(queryData),
		queryKey: ["assets", timeFrame, "top-performers"],
	});

	const assets = assetsData?.assets || assetsData || [];

	if (isLoading) {
		return (
			<div className="bg-white rounded-md shadow-md">
				<div className={style.header}>
					<h3 className={style.title}>Top Performer</h3>
					<div className="flex items-center gap-2">
						{["1h", "1d", "7d", "1m"].map((time) => (
							<button
								key={time}
								className="px-3 py-1 text-sm border rounded-md text-gray-500"
							>
								{time}
							</button>
						))}
					</div>
				</div>
				<div className="flex flex-col gap-4 p-6">
					{[...Array(4)].map((_, i) => (
						<div
							key={i}
							className="flex items-center justify-between border-b border-gray-300 pb-4 animate-pulse"
						>
							<div className="flex items-center gap-2">
								<div className="w-10 h-10 bg-gray-200 rounded-full"></div>
								<div>
									<div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
									<div className="h-3 bg-gray-200 rounded w-16"></div>
								</div>
							</div>
							<div>
								<div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
								<div className="h-3 bg-gray-200 rounded w-12"></div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	// Error state
	if (isError) {
		return (
			<div className="bg-white rounded-md shadow-md">
				<div className={style.header}>
					<h3 className={style.title}>Top Performer</h3>
				</div>
				<div className="p-6 text-center text-red-500">
					Error loading top performers
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-md shadow-md">
			<div className={style.header}>
				<h3 className={style.title}>Top Performer</h3>
				<div className="flex items-center gap-2">
					{["1h", "1d", "7d", "1m"].map((time) => (
						<button
							key={time}
							onClick={() => setTimeFrame(time)}
							className={`px-3 py-1 text-sm border rounded-md transition-colors ${
								timeFrame === time
									? "bg-[#5126be] text-white border-[#5126be]"
									: "text-gray-500 border-gray-300 hover:border-[#5126be] hover:text-[#5126be]"
							}`}
						>
							{time}
						</button>
					))}
				</div>
			</div>
			<div className="flex flex-col gap-4 p-6">
				{assets.length > 0 ? (
					assets.map((asset) => {
						const changePercent = asset.priceData?.changePercent || 0;
						const isPositive = changePercent >= 0;

						return (
							<div
								key={asset._id}
								className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
							>
								<div className="flex items-center gap-3">
									<img
										src={asset.imageUrl}
										alt={asset.name}
										className="w-10 h-10 rounded-full object-cover"
										onError={(e) => {
											e.target.src = "/placeholder-image.png"; // Add fallback image
										}}
									/>
									<span>
										<h3 className="font-semibold text-gray-800 capitalize">
											{asset.name}
										</h3>
										<small className="text-gray-500 text-xs">
											Vol: {asset.priceData?.volume?.toLocaleString() || "N/A"}
										</small>
									</span>
								</div>
								<div className="text-right">
									<h3 className="font-bold text-gray-800">
										${asset.priceData?.current?.toLocaleString() || "0"}
									</h3>
									<span
										className={`inline-flex items-center gap-1 text-sm ${
											isPositive ? "text-green-500" : "text-red-500"
										}`}
									>
										{isPositive ? <MdTrendingUp /> : <MdTrendingDown />}
										<small>
											{isPositive ? "+" : ""}
											{changePercent?.toFixed(2)}%
										</small>
									</span>
								</div>
							</div>
						);
					})
				) : (
					<div className="text-center text-gray-500 py-4">No assets found</div>
				)}
			</div>
		</div>
	);
};

export default Topperformer;
