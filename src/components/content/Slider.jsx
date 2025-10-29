import React, { useEffect, useRef } from "react";
import { FaEllipsis } from "react-icons/fa6";
import { MdTrendingDown, MdTrendingUp } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useQuery } from "@tanstack/react-query";
import { getAssets } from "../../services/assetService";

const Slider = () => {
	const queryData = {
		limit: 10,
		sortBy: "priceData.changePercent",
	};
	const swiperRef = useRef(null);

	const {
		data: assets = [], // Provide default empty array
		isLoading,
		isError,
	} = useQuery({
		queryFn: () => getAssets(queryData),
		queryKey: ["assets", "gainers"],
	});

	// Update Swiper when data loads
	useEffect(() => {
		if (assets.length > 0 && swiperRef.current) {
			swiperRef.current.swiper.update();
			swiperRef.current.swiper.autoplay.start();
		}
	}, [assets]);

	// Show loading state
	if (isLoading) {
		return (
			<div className="w-full">
				<div className="flex space-x-4 overflow-hidden">
					{[...Array(4)].map((_, i) => (
						<div
							key={i}
							className="bg-white shadow-md p-6 rounded-sm h-full min-w-[300px] animate-pulse"
						>
							<div className="flex items-center justify-between mb-4">
								<span className="flex items-center gap-3">
									<div className="w-10 h-10 bg-gray-200 rounded-full"></div>
									<div className="h-4 bg-gray-200 rounded w-20"></div>
								</span>
								<div className="w-4 h-4 bg-gray-200 rounded"></div>
							</div>
							<div className="h-8 bg-gray-200 rounded mb-2"></div>
							<div className="h-4 bg-gray-200 rounded w-16"></div>
						</div>
					))}
				</div>
			</div>
		);
	}

	// Show error state
	if (isError) {
		return (
			<div className="w-full text-center py-8 text-red-500">
				Error loading assets
			</div>
		);
	}

	// Show empty state
	if (!assets || assets.length === 0) {
		return (
			<div className="w-full text-center py-8 text-gray-500">
				No assets found
			</div>
		);
	}

	return (
		<div className="w-full">
			<Swiper
				ref={swiperRef}
				modules={[Autoplay]}
				spaceBetween={24}
				slidesPerView={1}
				autoplay={{
					delay: 4000,
					disableOnInteraction: false,
					pauseOnMouseEnter: true,
				}}
				loop={assets.length > 1} // Only loop if we have more than 1 item
				speed={800}
				updateOnWindowResize={true}
				observer={true}
				observeParents={true}
				breakpoints={{
					640: {
						slidesPerView: 2,
					},
					768: {
						slidesPerView: 3,
					},
					1024: {
						slidesPerView: 4,
					},
				}}
				className="mySwiper"
			>
				{assets.map((asset) => (
					<SwiperSlide key={asset._id}>
						<div className="bg-white shadow-md p-6 rounded-sm h-full min-h-[140px]">
							<div className="flex items-center justify-between mb-4">
								<span className="flex items-center gap-3">
									<div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
										<img
											src={asset?.imageUrl}
											alt={asset?.name}
											className="w-6 h-6 object-contain"
											onError={(e) => {
												e.target.style.display = "none";
											}}
										/>
									</div>
									<h3 className="font-semibold text-gray-800 capitalize truncate max-w-[120px]">
										{asset?.name}
									</h3>
								</span>
								<FaEllipsis className="text-gray-400 cursor-pointer flex-shrink-0" />
							</div>
							<div className="flex items-center justify-between">
								<span>
									<h3 className="text-2xl font-bold text-gray-800">
										${asset?.priceData?.current?.toLocaleString() || "0"}
									</h3>
									<span className="flex items-center gap-2 mt-1">
										<span
											className={`flex items-center gap-1 text-sm ${
												asset?.priceData?.changePercent >= 0
													? "text-green-500"
													: "text-red-500"
											}`}
										>
											{asset?.priceData?.changePercent >= 0 ? (
												<MdTrendingUp />
											) : (
												<MdTrendingDown />
											)}
											<small>
												{Math.abs(asset?.priceData?.changePercent || 0).toFixed(
													2
												)}
												%
											</small>
										</span>
										<small className="text-gray-500 text-xs">
											{asset?.symbol?.toUpperCase()}
										</small>
									</span>
								</span>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default Slider;
