import React, { useEffect, useState } from "react";
import { Custominput, Errortoast, Logo, Successtoast } from "../components";
import { Link } from "react-router-dom";
import { handleFormChange, pallete } from "../constants";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/authService";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Signin = () => {
	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const [error, setError] = useState("");
	const [showPass, setShowPass] = useState(false);

	const mutation = useMutation({
		mutationFn: loginUser,
		onError: (err) => {
			setError(err);
		},
		onSuccess: (data) => {
			console.log(data);
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(form);
		// mutation.mutate(form);
	};

	useEffect(() => {
		let timeout;
		if (error) {
			timeout = setTimeout(() => {
				setError("");
				mutation.reset();
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [error]);

	return (
		<section className="p-3 bg-slate-50 relative h-screen">
			<div className="bg-[#5162be]/90 absolute w-full h-[350px] top-0 right-0 left-0 bottom-0 z-0 backdrop-blur-sm" />
			<div className="flex flex-col items-center justify-center gap-10 z-1 relative ">
				<span className="pt-10 flex items-center flex-col justify-center gap-3">
					<Logo customClass={"w-[130px]"} />
					<h6 className={`text-[#fff]`}>Grow your portfolio with confidence</h6>
				</span>
				<form
					onSubmit={handleSubmit}
					className="bg-white shadow-sm py-6 px-8 flex flex-col gap-6 w-full max-w-md mx-auto rounded-sm lg:rounded-md"
				>
					<span className="flex flex-col items-center gap-3 pt-4">
						<h3 className="text-xl text-[#5162be] capitalize font-semibold">
							welcome back!
						</h3>
						<h6 className="text-[#939393] font-light text-sm">
							Sign in to continue with itrust{" "}
						</h6>
					</span>

					<Custominput
						label={"email"}
						placeHolder={"Enter email"}
						onChange={(e) => handleFormChange(e, form, setForm)}
						value={form.email}
						name={"email"}
					/>

					<div className="relative">
						<Custominput
							label={"password"}
							placeHolder={"Enter password"}
							onChange={(e) => handleFormChange(e, form, setForm)}
							value={form.password}
							name={"password"}
							type={showPass ? "text" : "password"}
						/>
						<span
							onClick={() => setShowPass((prev) => !prev)}
							className="absolute top-[36px] right-[10px]"
						>
							{showPass ? <IoMdEye /> : <IoMdEyeOff />}
						</span>
					</div>

					<div className="flex items-center justify-between">
						<span className="flex items-center gap-1">
							<input type="checkbox" className={`${pallete.borders.light}`} />
							<small>Remember me</small>
						</span>
						<Link className="text-[#5162be] font-normal text-sm underline">
							Forgot password
						</Link>
					</div>

					<button
						type="submit"
						className="bg-[#5162be] text-white h-[40px] capitalize font-semibold mb-4 rounded-sm hover:bg-[#5162be]/80"
					>
						sign in
					</button>
				</form>
				<div className="flex flex-col items-center gap-3">
					<small className="text-[#212529] font-light text-sm flex items-center gap-1">
						Don't have an account?
						<Link
							to={"/signup"}
							className="underline text-[#5162be] font-semibold"
						>
							Signup
						</Link>
					</small>
					<h6 className="text-[#939393] text-md font-normal">
						{" "}
						&copy; {new Date().getFullYear()} Itrust. All Rights Reserved
					</h6>
				</div>
			</div>
			{error && (
				<Errortoast
					msg={error}
					onClose={() => {
						setError("");
						mutation.reset();
					}}
				/>
			)}
			{mutation.isSuccess && (
				<Successtoast
					msg={"Login success."}
					onClose={() => {
						setError("");
						mutation.reset();
					}}
				/>
			)}
		</section>
	);
};

export default Signin;
