import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const News = () => {
	const fetchCryptoNews = async () => {
		const response = await fetch(
			`https://newsdata.io/api/1/news?apikey=pub_04b183c5473d4e24b64a48d0da8e6536&category=business&language=en&q=crypto&size=6`
		);
		const data = await response.json();
		return data.results;
	};

	const {
		data: news = [],
		isLoading,
		isError,
	} = useQuery({
		queryFn: fetchCryptoNews,
		queryKey: ["crypto-news"],
		refetchInterval: 1000 * 60 * 60 * 24,
	});

	if (isLoading) {
		return (
			<div className="bg-white rounded-md shadow-md p-6">
				<h2 className="text-xl font-bold mb-4">Crypto News</h2>
				<div className="space-y-4">
					{[...Array(6)].map((_, i) => (
						<div key={i} className="animate-pulse">
							<div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
							<div className="h-3 bg-gray-200 rounded w-1/2"></div>
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-md shadow-md p-6">
			<h2 className="text-xl font-bold mb-4 text-gray-800">
				Trending Crypto News
			</h2>
			<div className="space-y-4">
				{news.map((item, index) => {
					// console.log(item);
					return (
						<div
							key={index}
							className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
						>
							<a
								href={item.url}
								target="_blank"
								rel="noopener noreferrer"
								className=" hover:bg-gray-50 p-2 rounded-lg transition-colors flex items-center gap-2"
							>
								<img
									src={item.source_icon}
									alt=""
									className="w-[50px] h-[50px]"
								/>
								<div>
									<h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">
										{item.title}
									</h3>
									<div className="flex items-center justify-between text-sm text-gray-500">
										{/* <span>{item.source.title}</span> */}
										<span>{new Date(item.pubDate).toLocaleDateString()}</span>
									</div>
								</div>
							</a>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default News;
