import React, { useEffect, useState } from "react";
import { Custominput, Logo } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { handleFormChange } from "../constants";

const styles = {
	span: "flex flex-col lg:flex-row w-full gap-2",
};

const Signup = () => {
	let savedUserForm = null;
	try {
		savedUserForm = JSON.parse(sessionStorage.getItem("userForm"));
	} catch (err) {
		console.error("Failed to parse saved user form:", err);
	}

	const [form, setForm] = useState({
		firstname: savedUserForm?.firstname || "",
		lastname: savedUserForm?.lastname || "",
		email: savedUserForm?.email || "",
		username: savedUserForm?.username || "",
		password: savedUserForm?.password || "",
		confirmPassword: savedUserForm?.confirmPassword || "",
	});

	const [error, setError] = useState({});

	const navigate = useNavigate();

	function handleNext(e) {
		e.preventDefault();

		const newErrors = {};
		for (const key in form) {
			if (!form[key]) newErrors[key] = `${key} is required!`;
		}

		if (form.password !== form.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match!";
		}

		if (Object.keys(newErrors).length > 0) {
			setError(newErrors);
			return;
		}

		sessionStorage.setItem("userForm", JSON.stringify(form));
		navigate("/contact");
	}

	useEffect(() => {
		if (Object.keys(error).length > 0) {
			const timeout = setTimeout(() => setError({}), 3000);
			return () => clearTimeout(timeout);
		}
	}, [error]);

	return (
		<section className="p-3 bg-slate-50 relative">
			<div className="bg-[#5162be]/90 absolute w-full h-[350px] left-0 top-0 z-0 backdrop-blur-sm" />
			<div className="flex flex-col items-center justify-center gap-10 z-1 relative">
				<span className="pt-10 flex items-center flex-col gap-3">
					<Logo customClass="w-[130px]" />
					<h6 className="text-white">Grow your portfolio with confidence</h6>
				</span>

				<form
					onSubmit={handleNext}
					className="bg-white shadow-sm py-6 px-8 flex flex-col gap-6 w-full max-w-xl mx-auto rounded-sm lg:rounded-md"
				>
					<span className="flex flex-col items-center gap-3 pt-4">
						<h3 className="text-xl text-[#5162be] capitalize font-semibold">
							Create new account
						</h3>
						<h6 className="text-[#939393] font-light text-sm">
							Sign up to get started with Itrust
						</h6>
					</span>

					<span className={styles.span}>
						<Custominput
							label="firstname"
							value={form.firstname}
							onChange={(e) => handleFormChange(e, form, setForm)}
							name="firstname"
							error={error.firstname}
						/>
						<Custominput
							label="lastname"
							value={form.lastname}
							onChange={(e) => handleFormChange(e, form, setForm)}
							name="lastname"
							error={error.lastname}
						/>
					</span>

					<span className={styles.span}>
						<Custominput
							label="email"
							value={form.email}
							onChange={(e) => handleFormChange(e, form, setForm)}
							name="email"
							error={error.email}
						/>
						<Custominput
							label="username"
							value={form.username}
							onChange={(e) => handleFormChange(e, form, setForm)}
							name="username"
							error={error.username}
						/>
					</span>

					<span className={styles.span}>
						<Custominput
							label="password"
							type="password"
							value={form.password}
							onChange={(e) => handleFormChange(e, form, setForm)}
							name="password"
							error={error.password}
						/>
						<Custominput
							label="confirm password"
							type="password"
							value={form.confirmPassword}
							onChange={(e) => handleFormChange(e, form, setForm)}
							name="confirmPassword"
							error={error.confirmPassword}
						/>
					</span>

					<small className=" text-[#939393] font-light text-sm whitespace-nowrap">
						By registering you agree to the Itrust{" "}
						<Link className="underline text-[#5162be] font-semibold">
							Terms of Use
						</Link>
					</small>

					<button
						type="submit"
						className="bg-[#5162be] text-white h-[40px] capitalize font-semibold mb-4 rounded-sm"
					>
						Next
					</button>
				</form>

				<div className="flex flex-col items-center gap-3">
					<small className="text-[#212529] font-light text-sm">
						Already have an account?{" "}
						<Link
							to="/signin"
							className="underline text-[#5162be] font-semibold"
						>
							Sign in
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

export default Signup;
