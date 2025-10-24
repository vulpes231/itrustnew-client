import React from "react";
import { motion } from "framer-motion";

const Loadingmodal = () => {
	return (
		<section className="w-full h-screen fixed top-0 left-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
			<motion.div
				className="bg-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center justify-center gap-4 border border-white/20 shadow-2xl"
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.3 }}
			>
				{/* Main Spinner */}
				<motion.div
					className="w-16 h-16 rounded-full border-4 border-[#5162be]/20 border-t-[#5162be]"
					animate={{ rotate: 360 }}
					transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
				/>

				{/* Optional: Pulsing dots */}
				<div className="flex gap-1 mt-2">
					<motion.div
						className="w-2 h-2 bg-[#5162be] rounded-full"
						animate={{ opacity: [0.3, 1, 0.3] }}
						transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
					/>
					<motion.div
						className="w-2 h-2 bg-[#5162be] rounded-full"
						animate={{ opacity: [0.3, 1, 0.3] }}
						transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
					/>
					<motion.div
						className="w-2 h-2 bg-[#5162be] rounded-full"
						animate={{ opacity: [0.3, 1, 0.3] }}
						transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
					/>
				</div>

				{/* Loading Text */}
				<motion.p
					className="text-white font-medium mt-2"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
				>
					Loading...
				</motion.p>
			</motion.div>
		</section>
	);
};

export default Loadingmodal;
