import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken"; // Import the new helper
import User from "@/models/userModels"; 
import { connectToDatabase } from "@/dbConfig/dbConfig"; // Assuming your DB connection is here

connectToDatabase(); // Connect to the database

export async function GET(request: NextRequest) {
    try {
        // 1. Get user ID from token using the helper function
        const userId = await getDataFromToken(request);

        if (!userId) {
            return NextResponse.json({ error: "Invalid token or user ID not found" }, { status: 401 });
        }

        // 2. Get user data from the database
        // Exclude password and other sensitive fields
        const user = await User.findById(userId).select("-password -forgotPasswordToken -forgotPasswordTokenExpiry -verifyToken -verifyTokenExpiry");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // 3. Return user info
        return NextResponse.json({
            message: "User found",
            data: user,
            success: true,
        });

    } catch (error: any) {
        console.error("Error fetching user data:", error.message);
        return NextResponse.json({ error: error.message || "Failed to fetch user data" }, { status: 500 });
    }
}
