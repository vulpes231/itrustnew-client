import { configureStore } from "@reduxjs/toolkit";
import navReducer from "../features/navSlice";

const store = configureStore({
	reducer: {
		nav: navReducer,
	},
});

export default store;
