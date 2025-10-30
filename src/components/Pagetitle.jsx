import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Pagetitle = () => {
	const { pathname } = useLocation();
	useEffect(() => {
		document.title = `Itrust Investments - ${pathname.slice(1).toUpperCase()}`;
	}, [pathname]);
	return null;
};

export default Pagetitle;
