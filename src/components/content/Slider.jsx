import React from "react";
import { FaEllipsis } from "react-icons/fa6";
import { MdTrendingDown, MdTrendingUp } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { assets } from "../../constants";

const Slider = () => {
	return (
		<div className="w-full">
			<Swiper
				modules={[Autoplay]}
				spaceBetween={24}
				slidesPerView={1}
				autoplay={{
					delay: 4000,
					disableOnInteraction: false,
				}}
				loop={true}
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
					<SwiperSlide key={asset.id}>
						<div className="bg-white shadow-md p-6 rounded-sm h-full">
							<div className="flex items-center justify-between mb-4">
								<span className="flex items-center gap-3">
									<div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
										<span className="text-xs font-bold text-gray-600">
											{asset.symbol.toUpperCase()}
										</span>
									</div>
									<h3 className="font-semibold text-gray-800 capitalize">
										{asset.name}
									</h3>
								</span>
								<FaEllipsis className="text-gray-400 cursor-pointer" />
							</div>
							<div className="flex items-center justify-between">
								<span>
									<h3 className="text-2xl font-bold text-gray-800">
										${asset.price.toLocaleString()}
									</h3>
									<span className="flex items-center gap-2 mt-1">
										<span
											className={`flex items-center gap-1 text-sm ${
												asset.percentChange >= 0
													? "text-green-500"
													: "text-red-500"
											}`}
										>
											{asset.percentChange >= 0 ? (
												<MdTrendingUp />
											) : (
												<MdTrendingDown />
											)}
											<small>{asset.percentChange}%</small>
										</span>
										<small className="text-gray-500 text-xs">
											{asset.symbol.toUpperCase()}
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
