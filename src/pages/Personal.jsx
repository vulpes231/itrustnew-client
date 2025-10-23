import React, { useState } from "react";
import { Custominput, Customselect, Logo } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { handleFormChange } from "../constants";

const styles = {
	span: "flex flex-col lg:flex-row w-full gap-2 ",
};

const Personal = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		dob: "",
		currency: "",
		experience: "",
		employment: "",
		nationality: "",
		referral: "",
	});

	const contactForm = JSON.parse(sessionStorage.getItem("contactForm"));
	const userForm = JSON.parse(sessionStorage.getItem("userForm"));

	const [error, setError] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		const formData = { ...contactForm, ...userForm, ...form };
		console.log(formData);
	}

	function handlePrev() {
		navigate("/contact");
	}

	return (
		<section className="p-3 bg-slate-50 relative">
			<div className="bg-[#5162be]/90 absolute w-full h-[350px] top-0 right-0 left-0 bottom-0 z-0 backdrop-blur-sm" />
			<div className="flex flex-col items-center justify-center gap-10 z-1 relative ">
				<span className="pt-10 flex items-center flex-col justify-center gap-3">
					<Logo customClass={"w-[130px]"} />
					<h6 className={`text-[#fff]`}>Grow your portfolio with confidence</h6>
				</span>
				<form
					onSubmit={handleSubmit}
					className="bg-white shadow-sm py-6 px-8 flex flex-col gap-6 w-full max-w-xl mx-auto rounded-sm lg:rounded-md"
				>
					<span className="flex flex-col items-center gap-3 pt-4">
						<h3 className="text-xl text-[#5162be] capitalize font-semibold">
							personal information
						</h3>
						<h6 className="text-[#939393] font-light text-sm">
							complete your profile.
						</h6>
					</span>
					<span className={styles.span}>
						<Custominput
							label={"dob"}
							onChange={(e) => handleFormChange(e, form, setForm)}
							value={form.dob}
							name={"dob"}
							error={error.dob}
							type="date"
						/>
						<Customselect
							label={"currency"}
							onChange={(e) => handleFormChange(e, form, setForm)}
							value={form.currency}
							name={"currency"}
							error={error.currency}
							options={[
								{ id: "usd", title: "usd" },
								{ id: "eur", title: "eur" },
								{ id: "cad", title: "cad" },
								{ id: "gbp", title: "gbp" },
							]}
						/>
					</span>
					<span className={styles.span}>
						<Customselect
							label={"experience"}
							onChange={(e) => handleFormChange(e, form, setForm)}
							value={form.experience}
							name={"experience"}
							error={error.experience}
							options={[
								{ id: "beginner", title: "beginner" },
								{ id: "intermediate", title: "intermediate" },
								{ id: "expert", title: "expert" },
							]}
						/>
						<Customselect
							label={"employment"}
							onChange={(e) => handleFormChange(e, form, setForm)}
							value={form.employment}
							name={"employment"}
							error={error.employment}
							options={[
								{ id: "employed", title: "employed" },
								{ id: "unemployed", title: "unemployed" },
								{ id: "student", title: "student" },
								{ id: "retired", title: "retired" },
							]}
						/>
					</span>

					<div className={styles.span}>
						<Custominput
							label={"nationality"}
							onChange={(e) => handleFormChange(e, form, setForm)}
							value={form.nationality}
							name={"nationality"}
							error={error.nationality}
						/>
						<Custominput
							label={"referral code(optional)"}
							onChange={(e) => handleFormChange(e, form, setForm)}
							value={form.referral}
							name={"referral"}
							error={error.referral}
							optional={true}
						/>
					</div>

					<div className="flex items-center gap-4">
						<button
							type="submit"
							className="bg-[#5162be] text-white h-[40px] capitalize font-semibold mb-4 rounded-sm w-full"
						>
							submit
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
						{" "}
						&copy; {new Date().getFullYear()} Itrust. All Rights Reserved
					</h6>
				</div>
			</div>
		</section>
	);
};

export default Personal;
