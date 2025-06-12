"use client";
import React, {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import axios from "axios";

export default function LoginPage() {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const router = useRouter();
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [loading, setLoading] = useState(false);

	const onLogin = async () => {
		try {
			setLoading(true);
			const response = await axios.post("/api/users/login", user);
			console.log("Response from login:", response.data);
			toast.success("Login successful!");
			router.push("/profile"); // Redirect to profile page after successful login
		} catch (error: unknown) {
			let errorMessage = "Failed to log in";
			if (axios.isAxiosError(error) && error.response?.data?.error) {
				errorMessage = error.response.data.error;
			} else if (error instanceof Error) {
				errorMessage = error.message;
			}
			console.error("Error during login:", error); // Log the original error for more details
			toast.error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user.email.length > 0 && user.password.length > 0) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [user]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">
			{" "}
			<div className="relative w-full max-w-md space-y-8 p-8 rounded-3xl shadow-2xl bg-gray-900/90 backdrop-filter backdrop-blur-lg border border-opacity-10 border-white">
				<div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 filter blur-3xl"></div>
				<div className="relative">
					<div className="text-center">
						<div className="mb-4">
							<div className="mx-auto h-12 w-12 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
								<svg
									className="h-6 w-6 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
									></path>
								</svg>
							</div>
						</div>
						<h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
							{loading ? "Logging in..." : "Welcome Back"}
						</h1>
						<p className="mt-2 text-sm text-gray-400">
							Please enter your details to sign in.
						</p>
					</div>

					<div className="mt-8 space-y-6">
						<div className="space-y-4">
							{" "}
							<input
								className="w-full px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white/20 transition-all duration-200"
								id="email"
								type="email"
								value={user.email}
								onChange={(e) => setUser({...user, email: e.target.value})}
								placeholder="Email"
							/>
							<input
								className="w-full px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white/20 transition-all duration-200"
								id="password"
								type="password"
								value={user.password}
								onChange={(e) => setUser({...user, password: e.target.value})}
								placeholder="Password"
							/>
							<button
								onClick={onLogin}
								disabled={buttonDisabled || loading}
								className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-semibold transition duration-200 
								${
									buttonDisabled || loading
										? "bg-gray-600 bg-opacity-50 cursor-not-allowed"
										: "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
								}`}
							>
								{loading ? (
									<span className="flex items-center">
										<svg
											className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
										Please wait...
									</span>
								) : buttonDisabled ? (
									"Enter email and password"
								) : (
									"Login"
								)}
							</button>
						</div>
					</div>

					<div className="text-center mt-6 text-sm text-gray-400">
						Don&apos;t have an account?{" "}
						<span
							onClick={() => router.push("/signup")}
							className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-300 hover:to-purple-300 cursor-pointer font-medium"
						>
							Sign Up
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
