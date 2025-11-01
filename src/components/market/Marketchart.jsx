import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { getAssets } from "../../services/assetService";
import numeral from "numeral";

const style = {
	tableContainer: "w-full flex-1",
	header:
		"flex flex-col sm:flex-row sm:items-center justify-between w-full px-4 md:px-6 py-4 border-b border-gray-100 gap-3",
	title: "font-bold text-lg md:text-xl text-gray-900 capitalize",
	tradeBtn:
		"py-2 px-3 md:px-4 bg-[#5126be]/10 hover:bg-[#5126be] text-[#5126be] hover:text-white rounded-md text-xs md:text-sm font-medium capitalize transition-all duration-200 cursor-pointer transform hover:scale-105",
	positiveChange:
		"inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200",
	negativeChange:
		"inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200",
	activityItem:
		"flex items-center justify-between p-4 md:p-6 border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50 transition-colors duration-200",
	timeButton:
		"px-3 py-1 text-xs font-medium rounded-lg transition-all duration-200",
	activeTimeButton: "bg-[#5126be] text-white",
	inactiveTimeButton: "bg-gray-100 text-gray-600 hover:bg-gray-200",
};

const Marketchart = () => {
	const [timeframe, setTimeframe] = useState("1D");
	const [chartLoaded, setChartLoaded] = useState(false);
	const [selectedAsset, setSelectedAsset] = useState("BTCUSD");

	const {
		data: assets,
		isLoading: getAssetsLoading,
		isError: getAssetError,
	} = useQuery({
		queryFn: getAssets,
		queryKey: ["assets"],
	});

	const timeframes = [
		{ label: "1H", value: "1H" },
		{ label: "4H", value: "4H" },
		{ label: "1D", value: "1D" },
		{ label: "1W", value: "1W" },
		{ label: "1M", value: "1M" },
	];

	// Get selected asset data
	const selectedAssetData = assets?.find(
		(asset) => asset.symbol === selectedAsset
	);

	useEffect(() => {
		if (assets && assets.length > 0 && !selectedAsset) {
			// Set default to first asset
			setSelectedAsset(assets[0].symbol);
		}
	}, [assets, selectedAsset]);

	useEffect(() => {
		if (!selectedAsset) return;

		// Clear previous widget
		const container = document.getElementById("tradingview-container");
		if (container) {
			container.innerHTML = "";
		}

		// Load TradingView script
		const script = document.createElement("script");
		script.src =
			"https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
		script.type = "text/javascript";
		script.async = true;

		// Convert symbol format (e.g., BTCUSD -> BINANCE:BTCUSDT)
		const tradingViewSymbol = `BINANCE:${selectedAsset.replace("USD", "USDT")}`;

		script.innerHTML = JSON.stringify({
			autosize: true,
			symbol: tradingViewSymbol,
			interval: getIntervalFromTimeframe(timeframe),
			timezone: "Etc/UTC",
			theme: "light",
			style: "1",
			locale: "en",
			enable_publishing: false,
			allow_symbol_change: true, // Allow users to change symbols
			container_id: "tradingview_widget",
			studies: ["RSI@tv-basicstudies", "Volume@tv-basicstudies"],
			show_popup_button: true,
			popup_width: "1000",
			popup_height: "650",
			height: "100%",
			width: "100%",
		});

		if (container) {
			container.appendChild(script);
		}

		setChartLoaded(true);

		return () => {
			if (container) {
				container.innerHTML = "";
			}
		};
	}, [timeframe, selectedAsset]);

	const getIntervalFromTimeframe = (tf) => {
		switch (tf) {
			case "1H":
				return "60";
			case "4H":
				return "240";
			case "1D":
				return "D";
			case "1W":
				return "W";
			case "1M":
				return "M";
			default:
				return "D";
		}
	};

	const calculatePriceChange = () => {
		if (!selectedAssetData?.priceData) return { change: 0, percent: 0 };

		const current = selectedAssetData.priceData.current;
		const previousClose = selectedAssetData.priceData.previousClose;
		const change = current - previousClose;
		const percent = (change / previousClose) * 100;

		return {
			change,
			percent,
			isPositive: change >= 0,
		};
	};

	const priceInfo = calculatePriceChange();

	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
			{/* Header */}
			<div className="p-6 border-b border-gray-100">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					<h3 className={style.title}>Market Chart</h3>
					<div className="flex items-center gap-2 flex-wrap">
						{timeframes.map((tf) => (
							<button
								key={tf.value}
								className={`${style.timeButton} ${
									timeframe === tf.value
										? style.activeTimeButton
										: style.inactiveTimeButton
								}`}
								onClick={() => setTimeframe(tf.value)}
							>
								{tf.label}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Chart Container */}
			<div className="p-6 space-y-6">
				{/* Asset Selector and Info */}
				<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
					{/* Asset Selector */}
					<div className="flex items-center gap-4">
						<select
							value={selectedAsset}
							onChange={(e) => setSelectedAsset(e.target.value)}
							className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5126be] focus:border-transparent min-w-[120px]"
						>
							{assets?.map((asset) => (
								<option key={asset._id} value={asset.symbol}>
									{asset.symbol.replace("USD", "/USD")}
								</option>
							))}
						</select>
						<button className={style.tradeBtn}>Trade Now</button>
					</div>

					{/* Asset Info */}
					{selectedAssetData && (
						<div className="flex items-center gap-6">
							<div className="flex items-center gap-2">
								{selectedAssetData.imageUrl && (
									<img
										src={selectedAssetData.imageUrl}
										alt={selectedAssetData.name}
										className="w-6 h-6 rounded-full"
									/>
								)}
								<div>
									<p className="font-semibold text-gray-900">
										{selectedAssetData.name}
									</p>
									<p className="text-sm text-gray-500">
										{selectedAssetData.symbol}
									</p>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Price Info */}
				{selectedAssetData?.priceData && (
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<div className="text-center p-4 bg-gray-50 rounded-lg">
							<p className="text-sm text-gray-600">Current Price</p>
							<p className="text-lg font-bold text-gray-900">
								{numeral(selectedAssetData.priceData.current).format("$0,0.00")}
							</p>
						</div>
						<div className="text-center p-4 bg-gray-50 rounded-lg">
							<p className="text-sm text-gray-600">24h Change</p>
							<p
								className={`text-lg font-bold ${
									priceInfo.isPositive ? "text-green-600" : "text-red-600"
								}`}
							>
								{priceInfo.isPositive ? "+" : ""}
								{numeral(priceInfo.change).format("$0,0.00")} (
								{priceInfo.isPositive ? "+" : ""}
								{priceInfo.percent.toFixed(2)}%)
							</p>
						</div>
						<div className="text-center p-4 bg-gray-50 rounded-lg">
							<p className="text-sm text-gray-600">24h High</p>
							<p className="text-lg font-bold text-gray-900">
								{numeral(
									selectedAssetData.historical?.yearHigh ||
										selectedAssetData.priceData.current
								).format("$0,0.00")}
							</p>
						</div>
						<div className="text-center p-4 bg-gray-50 rounded-lg">
							<p className="text-sm text-gray-600">24h Low</p>
							<p className="text-lg font-bold text-gray-900">
								{numeral(
									selectedAssetData.historical?.yearLow ||
										selectedAssetData.priceData.current
								).format("$0,0.00")}
							</p>
						</div>
					</div>
				)}

				{/* TradingView Widget - Full size */}
				<div className="w-full" style={{ height: "600px" }}>
					<div
						id="tradingview-container"
						className="tradingview-widget-container rounded-lg overflow-hidden w-full h-full"
					>
						<div id="tradingview_widget" className="w-full h-full" />
					</div>
				</div>
			</div>

			{/* Loading State */}
			{!chartLoaded && (
				<div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10">
					<div className="flex flex-col items-center gap-3">
						<div className="w-8 h-8 border-4 border-[#5126be] border-t-transparent rounded-full animate-spin"></div>
						<p className="text-gray-600 text-sm">Loading chart...</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default Marketchart;
