import {connectToDatabase} from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import {NextResponse, NextRequest} from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


connectToDatabase();

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const {email, password} = body;

    console.log("Received data:", body);

		// Check if user exists
		const user = await User.findOne({email});
		if (!user) {
			return NextResponse.json(
				{error: "User does not exist"},
				{status: 400}
			);
		}
    console.log("User found:", user);
		// Check if password is correct
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return NextResponse.json({error: "Invalid credentials"}, {status: 400});
		}

		// Create token data
		const tokenData = {
			id: user._id,
			username: user.username,
			email: user.email,
		};

		// Create token
		const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
			expiresIn: "1d",
		});

		const response = NextResponse.json(
			{
				message: "Login successful",
				success: true,
			},
			{status: 200}
		);

		response.cookies.set("token", token, {
			httpOnly: true,
		});

		return response;
	} catch (error: unknown) {
		let errorMessage = "Failed to login user";
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		return NextResponse.json(
			{error: errorMessage},
			{status: 500}
		);
	}
}
