import React, { useEffect, useState } from "react";
import { Custominput, Logo } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { handleFormChange } from "../constants";

const styles = {
	span: "flex flex-col lg:flex-row w-full gap-2 ",
};

const Contact = () => {
	const navigate = useNavigate();
	let savedContactForm = null;
	try {
		savedContactForm = JSON.parse(sessionStorage.getItem("contactForm"));
	} catch (err) {
		console.error("Failed to parse saved contact form:", err);
	}

	const [form, setForm] = useState({
		country: savedContactForm?.country || "",
		phone: savedContactForm?.phone || "",
		street: savedContactForm?.street || "",
		city: savedContactForm?.city || "",
		state: savedContactForm?.state || "",
		zipcode: savedContactForm?.zipcode || "",
	});

	const [error, setError] = useState({});

	function handleNext(e) {
		e.preventDefault();

		const newErrors = {};
		for (const key in form) {
			if (!form[key]) newErrors[key] = `${key} is required!`;
		}

		if (Object.keys(newErrors).length > 0) {
			setError(newErrors);
			return;
		}

		sessionStorage.setItem("contactForm", JSON.stringify(form));
		navigate("/personal");
	}

	function handlePrev() {
		navigate("/signup");
	}

	useEffect(() => {
		let timeout;
		if (error) {
			timeout = setTimeout(() => {
				setError({});
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [error]);

	return (
		<section className="p-3 bg-slate-50 relative">
			<div className="bg-[#5162be]/90 absolute w-full h-[350px] top-0 right-0 left-0 bottom-0 z-0 backdrop-blur-sm" />
			<div className="flex flex-col items-center justify-center gap-10 z-1 relative ">
				<span className="pt-10 flex items-center flex-col justify-center gap-3">
					<Logo customClass={"w-[130px]"} />
					<h6 className={`text-[#fff]`}>Grow your portfolio with confidence</h6>
				</span>
				<form
					onSubmit={handleNext}
					className="bg-white shadow-sm py-6 px-8 flex flex-col gap-6 w-full max-w-xl mx-auto rounded-sm lg:rounded-md"
				>
					<span className="flex flex-col items-center gap-3 pt-4">
						<h3 className="text-xl text-[#5162be] capitalize font-semibold">
							contact information
						</h3>
						<h6 className="text-[#939393] font-light text-sm">
							Let us get to know you.
						</h6>
					</span>
					<span className={styles.span}>
						<Custominput
							label={"Country"}
							onChange={(e) => handleFormChange(e, form, setForm)}
							value={form.country}
							name={"country"}
							error={error.country}
						/>
						<Custominput
							label={"Phone"}
							onChange={(e) => handleFormChange(e, form, setForm)}
							value={form.phone}
							name={"phone"}
							error={error.phone}
						/>
					</span>
					<span className={styles.span}>
						<Custominput
							label={"street"}
							onChange={(e) => handleFormChange(e, form, setForm)}
							value={form.street}
							name={"street"}
							error={error.street}
						/>
						<Custominput
							label={"state"}
							onChange={(e) => handleFormChange(e, form, setForm)}
							value={form.state}
							name={"state"}
							error={error.state}
						/>
					</span>

					<div className={styles.span}>
						<Custominput
							label={"city"}
							onChange={(e) => handleFormChange(e, form, setForm)}
							value={form.city}
							name={"city"}
							error={error.city}
						/>
						<Custominput
							label={"zipcode"}
							onChange={(e) => handleFormChange(e, form, setForm)}
							value={form.zipcode}
							name={"zipcode"}
							error={error.zipcode}
						/>
					</div>

					<div className="flex items-center gap-4">
						<button
							type="submit"
							className="bg-[#5162be] text-white h-[40px] capitalize font-semibold mb-4 rounded-sm w-full"
						>
							next
						</button>
						<button
							type="button"
							onClick={handlePrev}
							className="bg-[#5162be] text-white h-[40px] capitalize font-semibold mb-4 rounded-sm w-full"
						>
							previous
						</button>
					</div>
				</form>
				<div className="flex flex-col items-center gap-3">
					<small className="text-[#212529] font-light text-sm">
						Already have an account?{" "}
						<Link
							to={"/signin"}
							className="underline text-[#5162be] font-semibold"
						>
							Signin
						</Link>
					</small>
					<h6 className="text-[#939393] text-md font-normal">
						&copy; {new Date().getFullYear()} Itrust. All Rights Reserved
					</h6>
				</div>
			</div>
		</section>
	);
};

export default Contact;
