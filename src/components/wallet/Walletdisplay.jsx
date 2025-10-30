import React from "react";
import { getUserWallets } from "../../services/walletService";
import { useQuery } from "@tanstack/react-query";

const Walletdisplay = () => {
	const { data: wallets, isLoading: getWalletsLoading } = useQuery({
		queryKey: ["wallets"],
		queryFn: getUserWallets,
	});
	return (
		<div className="w-full">
			<div className="flex flex-col gap-6 bg-white shadow-md rounded-md">
				{wallets &&
					wallets.length > 0 &&
					wallets.map((wallet) => {
						return (
							<div key={wallet._id}>
								<h3>{wallet.name}</h3>
								<h3>{wallet.totalBalance}</h3>
								<h3>{wallet.availableBalance}</h3>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default Walletdisplay;
