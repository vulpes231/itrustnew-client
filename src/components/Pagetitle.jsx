import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Pagetitle = () => {
	const { pathname } = useLocation();
	useEffect(() => {
		document.title = `Itrust Investments - ${pathname
			.slice(1, 2)
			.toUpperCase()}${pathname.slice(2)}`;
	}, [pathname]);
	return null;
};

export default Pagetitle;
