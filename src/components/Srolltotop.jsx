import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		// Scroll to top instantly
		window.scrollTo(0, 0);

		// Optional: Smooth scroll
		// window.scrollTo({
		//   top: 0,
		//   behavior: 'smooth'
		// });
	}, [pathname]);

	return null;
};

export default ScrollToTop;
