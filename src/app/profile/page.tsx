"use client";
import React, {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import axios from "axios";

interface UserData {
	_id: string;
	username: string;
	email: string;
	isVerified: boolean;
}

export default function ProfilePage() {
	const router = useRouter();
	const [user, setUser] = useState<UserData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				setLoading(true);
				const response = await axios.get<{data: UserData}>("/api/users/me");
				setUser(response.data.data);
			} catch (err: unknown) {
				let errorMessage = "Failed to fetch user data";
				if (axios.isAxiosError(err) && err.response?.data?.error) {
					errorMessage = err.response.data.error;
				} else if (err instanceof Error) {
					errorMessage = err.message;
				}
				console.error("Error fetching user data:", err);
				setError(errorMessage);
				toast.error(errorMessage);
				router.push("/login"); // Redirect to login if fetching user data fails (e.g., not logged in)
			} finally {
				setLoading(false);
			}
		};
		fetchUserData();
	}, [router]);

	const onLogout = async () => {
		try {
			setLoading(true);
			await axios.post("/api/users/logout");
			toast.success("Logout successful!");
			router.push("/login");
		} catch (err: unknown) {
			let errorMessage = "Failed to log out";
			if (err instanceof Error) {
				errorMessage = err.message;
			}
			console.error("Error during logout:", err);
			toast.error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">
			<div className="relative w-full max-w-md space-y-8 p-8 rounded-3xl shadow-2xl bg-gray-900/90 backdrop-filter backdrop-blur-lg border border-opacity-10 border-white">
				<div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 filter blur-3xl"></div>
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
										d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
									></path>
								</svg>
							</div>
						</div>
						<h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
							{loading ? "Loading Profile..." : "User Profile"}
						</h1>
						<p className="mt-2 text-sm text-gray-400">
							View your account details and status.
						</p>
					</div>

					<div className="mt-8 space-y-6 text-center">
						{loading ? (
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
						) : error ? (
							<p className="text-red-400">{error}</p>
						) : user ? (
							<div className="space-y-4">
								<p className="text-lg">
									<span className="font-semibold text-blue-400">Username:</span>{" "}
									{user.username}
								</p>
								<p className="text-lg">
									<span className="font-semibold text-blue-400">Email:</span>{" "}
									{user.email}
								</p>
								<p className="text-lg">
									<span className="font-semibold text-blue-400">
										Verification Status:
									</span>{" "}
									{user.isVerified ? (
										<span className="text-green-400 font-bold">Verified</span>
									) : (
										<span className="text-red-400 font-bold">Not Verified</span>
									)}
								</p>
							</div>
						) : (
							<p className="text-gray-400">No user data available.</p>
						)}

						<button
							onClick={onLogout}
							disabled={loading}
							className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-semibold transition duration-200 mt-8
            ${
							loading
								? "bg-gray-600 bg-opacity-50 cursor-not-allowed"
								: "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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
									Logging out...
								</span>
							) : (
								"Logout"
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
