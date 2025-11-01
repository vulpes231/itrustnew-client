import React, { useState, useRef, useEffect } from "react";
import { IoMdMail } from "react-icons/io";
import { Errortoast, Loadingmodal, Logo, Successtoast } from "../components";
import { useMutation } from "@tanstack/react-query";
import { sendEmailCode } from "../services/authService";
import { formatEmail } from "../constants";
import { verifyMailCode } from "../services/verifyService";

const styles = {
	input:
		"rounded-sm bg-gray-200 w-full h-[60px] p-2 outline-none text-center text-xl font-semibold",
	inputFocus:
		"rounded-sm bg-gray-200 w-full h-[60px] p-2 outline-none ring-2 ring-[#5162be] text-center text-xl font-semibold",
};

const Verifymail = () => {
	const email = sessionStorage.getItem("email");
	const [form, setForm] = useState({
		firstCode: "",
		secondCode: "",
		thirdCode: "",
		fourthCode: "",
	});
	const [error, setError] = useState("");

	const mutation = useMutation({
		mutationFn: () => sendEmailCode(email),
		onError: (err) => {
			console.log(err);
		},
		onSuccess: (data) => {
			console.log(data);
		},
	});

	const submitMutation = useMutation({
		mutationFn: verifyMailCode,
		onError: (err) => {
			console.log(err);
		},
		onSuccess: (data) => {
			console.log(data);
		},
	});

	const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

	const handleInputChange = (e, fieldName) => {
		const value = e.target.value.replace(/[^0-9]/g, "");

		if (value.length <= 1) {
			setForm((prev) => ({
				...prev,
				[fieldName]: value,
			}));

			if (value && fieldName !== "fourthCode") {
				const currentIndex = Object.keys(form).indexOf(fieldName);
				inputRefs[currentIndex + 1]?.current?.focus();
			}
		}
	};

	const handleKeyDown = (e, fieldName) => {
		if (e.key === "Backspace" && !form[fieldName]) {
			const currentIndex = Object.keys(form).indexOf(fieldName);
			if (currentIndex > 0) {
				inputRefs[currentIndex - 1]?.current?.focus();
			}
		}
	};

	const handlePaste = (e) => {
		e.preventDefault();
		const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
		const codes = pastedData.slice(0, 4).split("");

		setForm({
			firstCode: codes[0] || "",
			secondCode: codes[1] || "",
			thirdCode: codes[2] || "",
			fourthCode: codes[3] || "",
		});

		const lastFilledIndex = codes.length - 1;
		if (lastFilledIndex < 3) {
			inputRefs[lastFilledIndex + 1]?.current?.focus();
		} else {
			inputRefs[3]?.current?.focus();
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const verificationCode = Object.values(form).join("");

		if (verificationCode.length === 4) {
			console.log("Verification code:", verificationCode);
			const formData = { code: verificationCode };
			submitMutation.mutate(formData);
		} else {
			setError("Invalid OTP!");
		}
	};

	const handleResendCode = () => {
		console.log("Resending verification code...");

		setForm({
			firstCode: "",
			secondCode: "",
			thirdCode: "",
			fourthCode: "",
		});

		inputRefs[0]?.current?.focus();
	};

	// Focus first input on component mount
	useEffect(() => {
		inputRefs[0]?.current?.focus();
	}, []);

	const isFormComplete = Object.values(form).every((code) => code.length === 1);

	useEffect(() => {
		if (email) {
			mutation.mutate();
		}
	}, [email]);

	console.log(email);

	const formattedMail = formatEmail(email);

	useEffect(() => {
		if (mutation.isError) {
			setError(mutation.isError);
		} else if (submitMutation.isError) {
			setError(submitMutation.isError);
		}
	}, [mutation.isError, submitMutation.isError]);

	useEffect(() => {
		if (error) {
			const timeout = setTimeout(() => {
				mutation.reset();
				submitMutation.reset();
			}, 3000);
			return () => clearTimeout(timeout);
		}
	}, [error]);

	useEffect(() => {
		if (submitMutation.isSuccess) {
			const timeout = setTimeout(() => {
				mutation.reset();
				submitMutation.reset();
				window.location.href = "/dashboard";
			}, 3000);
			return () => clearTimeout(timeout);
		}
	}, [submitMutation.isSuccess]);

	return (
		<section className="p-3 bg-slate-100 relative min-h-screen">
			<div className="bg-[#5162be]/90 absolute w-full h-[350px] top-0 right-0 left-0 bottom-0 z-0 backdrop-blur-sm" />
			<div className="flex flex-col gap-10 z-10 relative">
				<span className="pt-10 flex items-center flex-col justify-center gap-3">
					<Logo customClass={"w-[130px]"} />
					<h6 className="text-white">Grow your portfolio with confidence</h6>
				</span>

				<form
					onSubmit={handleSubmit}
					className="bg-white p-6 flex flex-col items-center justify-center gap-4 text-center max-w-lg mx-auto w-full shadow-sm rounded-md"
				>
					<IoMdMail className="w-20 h-20 bg-gray-200 rounded-full p-4 text-[#5162be]" />
					<h3 className="font-semibold text-2xl lg:text-3xl">
						Verify your email
					</h3>
					<small className="text-[#878a99]">
						Please enter the 4 digit code sent to {formattedMail}
					</small>

					<div className="flex items-center gap-4 w-full max-w-xs">
						{Object.keys(form).map((fieldName, index) => (
							<input
								key={fieldName}
								ref={inputRefs[index]}
								type="text"
								inputMode="numeric"
								pattern="[0-9]*"
								className={form[fieldName] ? styles.inputFocus : styles.input}
								maxLength={1}
								onChange={(e) => handleInputChange(e, fieldName)}
								onKeyDown={(e) => handleKeyDown(e, fieldName)}
								onPaste={index === 0 ? handlePaste : undefined}
								value={form[fieldName]}
								autoComplete="one-time-code"
							/>
						))}
					</div>

					<button
						type="submit"
						disabled={!isFormComplete}
						className={`h-[50px] capitalize font-semibold mb-4 rounded-sm w-full transition-colors ${
							isFormComplete
								? "bg-[#5162be] text-white hover:bg-[#5162be]/80"
								: "bg-gray-300 text-gray-600 cursor-not-allowed"
						}`}
					>
						Confirm
					</button>
				</form>

				<div className="flex flex-col items-center justify-center gap-2">
					<small className="text-white">
						Didn't receive a code?{" "}
						<button
							type="button"
							onClick={handleResendCode}
							className="underline hover:text-gray-200 transition-colors"
						>
							Resend
						</button>
					</small>
					<h6 className="text-[#e0e0e0] text-md font-normal">
						&copy; {new Date().getFullYear()} Itrust. All Rights Reserved
					</h6>
				</div>
			</div>
			{submitMutation.isSuccess && (
				<Successtoast
					msg={"Email verified."}
					duration={3000}
					onClose={submitMutation.reset()}
				/>
			)}
			{error && (
				<Errortoast
					msg={error}
					duration={3000}
					onClose={() => {
						setError("");
						mutation.reset();
						submitMutation.reset();
					}}
				/>
			)}
			{submitMutation.isPending && <Loadingmodal />}
		</section>
	);
};

export default Verifymail;
