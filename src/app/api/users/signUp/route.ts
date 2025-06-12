import {connectToDatabase} from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import {NextResponse, NextRequest} from "next/server";
import bcrypt from "bcryptjs";
import {sendEmail, EmailType} from "@/helper/mailer";

connectToDatabase();

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const {username, email, password} = body;
		//validation
		console.log("Received data:", body);

		const user = await User.findOne({email});
		if (user) {
			return NextResponse.json({error: "User already exists"}, {status: 400});
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});
		console.log("New user data:", newUser);

		const savedUser = await newUser.save();

		// Send verification email
		await sendEmail({
			email: savedUser.email,
			emailType: EmailType.Verification,
			userId: savedUser._id,
		});

		return NextResponse.json(
			{
				message: "User signed up successfully",
				savedUser,
			},
			{
				status: 201,
			}
		);
	} catch (error: any) {
		return NextResponse.json(
			{error: error.message || "Failed to sign up user"},
			{status: 500}
		);
	}
}

// Add this to your app/api/users/signup/route.ts
export async function GET() {
    return NextResponse.json({ message: "Signup route accessible" }, { status: 200 });
}
