import React from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { MdClose } from "react-icons/md";

const Errortoast = ({ msg, onClose }) => {
	return (
		<div className="flex items-start gap-2 absolute top-[10px] right-[10px] bg-red-100 px-6 py-3 rounded-tr-md rounded-br-md border-l-2 border-red-500">
			<IoMdCloseCircle className="w-5 h-5 text-red-500" />
			<span className="flex flex-col gap-1">
				<span className="flex items-center justify-between">
					<h3 className="font-medium">Error</h3>
					<button type="button" onClick={onClose}>
						<MdClose />
					</button>
				</span>
				<h6 className="font-thin">{msg}</h6>
			</span>
		</div>
	);
};

export default Errortoast;
