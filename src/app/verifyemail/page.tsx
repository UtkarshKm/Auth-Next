"use client";
import React, {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {useRouter, useSearchParams} from "next/navigation";
import axios from "axios";

export default function VerifyEmailPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [token, setToken] = useState("");
	const [verified, setVerified] = useState(false);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const urlToken = searchParams.get("token");
		if (!urlToken) {
			setError(true);
			toast.error("No verification token found in URL.");
			return;
		}
		setToken(urlToken);
	}, [searchParams]);

	const verifyEmail = async () => {
		try {
			setLoading(true);
			setError(false);
			await axios.post("/api/users/verifyemail", {token});
			setVerified(true);
			toast.success("Email verified successfully!");
		} catch (err: any) {
			setError(true);
			console.error("Error verifying email:", err);
			toast.error(err.response?.data?.error || "Failed to verify email");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">
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
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									></path>
								</svg>
							</div>
						</div>
						<h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
							Email Verification
						</h1>
						<p className="mt-2 text-sm text-gray-400">
							{loading
								? "Verifying your email..."
								: verified
								? "Your email has been successfully verified!"
								: error
								? "Verification failed. Invalid or expired token."
								: "Click the button below to verify your email."}
						</p>
					</div>

					<div className="mt-8 space-y-6 text-center">
						{loading && (
							<div className="flex items-center justify-center py-4">
								<svg
									className="animate-spin h-8 w-8 text-blue-500"
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
							</div>
						)}

						{!verified && !loading && token && (
							<button
								onClick={verifyEmail}
								className="w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-semibold transition duration-200 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							>
								Verify Email
							</button>
						)}

						{verified && (
							<button
								onClick={() => router.push("/login")}
								className="w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-semibold transition duration-200 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
							>
								Go to Login
							</button>
						)}

						{error && !loading && (
							<button
								onClick={() => router.push("/signup")}
								className="w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-semibold transition duration-200 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
							>
								Try Signing Up Again
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
