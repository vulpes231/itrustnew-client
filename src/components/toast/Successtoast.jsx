import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdClose } from "react-icons/md";

const Successtoast = ({ msg, onClose, duration = 4000 }) => {
	// Auto-close after duration
	useEffect(() => {
		if (duration) {
			const timer = setTimeout(onClose, duration);
			return () => clearTimeout(timer);
		}
	}, [duration, onClose]);

	// Toast animation variants
	const toastVariants = {
		hidden: {
			opacity: 0,
			x: 100,
			scale: 0.8,
		},
		visible: {
			opacity: 1,
			x: 0,
			scale: 1,
			transition: {
				type: "spring",
				stiffness: 300,
				damping: 25,
			},
		},
		exit: {
			opacity: 0,
			x: 100,
			scale: 0.8,
			transition: {
				duration: 0.2,
			},
		},
	};

	// Progress bar animation
	const progressVariants = {
		hidden: { scaleX: 1 },
		visible: {
			scaleX: 0,
			transition: {
				duration: duration / 1000,
				ease: "linear",
			},
		},
	};

	// Checkmark animation
	const checkmarkVariants = {
		hidden: { scale: 0, rotate: -180 },
		visible: {
			scale: 1,
			rotate: 0,
			transition: {
				type: "spring",
				stiffness: 200,
				damping: 15,
				delay: 0.1,
			},
		},
	};

	return (
		<AnimatePresence>
			<motion.div
				className="flex items-start gap-3 absolute top-[10px] right-[10px] bg-green-50 px-4 py-3 rounded-lg border-l-4 border-green-500 shadow-lg max-w-sm z-50"
				variants={toastVariants}
				initial="hidden"
				animate="visible"
				exit="exit"
				layout
			>
				{/* Progress Bar */}
				<motion.div
					className="absolute top-0 left-0 right-0 h-1 bg-green-200 origin-left"
					variants={progressVariants}
					initial="hidden"
					animate="visible"
				/>

				{/* Animated Checkmark Icon */}
				<motion.div
					variants={checkmarkVariants}
					initial="hidden"
					animate="visible"
				>
					<IoMdCheckmarkCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
				</motion.div>

				{/* Content */}
				<div className="flex-1 min-w-0">
					<div className="flex items-start justify-between gap-2">
						<motion.h3
							className="font-semibold text-green-800 text-sm"
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
						>
							Success
						</motion.h3>
						<motion.button
							type="button"
							onClick={onClose}
							className="text-green-400 hover:text-green-600 transition-colors flex-shrink-0 mt-0.5"
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.3 }}
						>
							<MdClose className="w-4 h-4" />
						</motion.button>
					</div>
					<motion.p
						className="text-green-600 text-sm mt-1 leading-relaxed"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.25 }}
					>
						{msg}
					</motion.p>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default Successtoast;
