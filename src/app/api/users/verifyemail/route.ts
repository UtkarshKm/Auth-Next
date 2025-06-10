import {connectToDatabase} from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import {NextResponse, NextRequest} from "next/server";
import {log} from "node:console";

connectToDatabase();

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const {token} = body;
		log("Received token:", token);

		// Validate token
		const user = await User.findOne({
			verifyToken: token,
			verifyTokenExpiry: {$gt: Date.now()},
		});

		if (!user) {
			return NextResponse.json(
				{error: "Invalid or expired verification token"},
				{status: 400}
			);
		}

		// Update user verification status
		user.isVerified = true;
		user.verifyToken = undefined; // Clear the token
		user.verifyTokenExpiry = undefined; // Clear the expiry date
		const updatedUser = await user.save();
		log("User verification successful:", updatedUser);
		return NextResponse.json(
			{
				message: "Email verified successfully",
				user: {
					id: updatedUser._id,
					username: updatedUser.username,
					email: updatedUser.email,
					isVerified: updatedUser.isVerified,
				},
			},
			{status: 200}
		);
	} catch (error: any) {
		return NextResponse.json(
			{error: error.message || "Failed to verify email"},
			{status: 500}
		);
	}
}
