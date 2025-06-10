import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        });

        // Clear the token cookie by setting it to an empty string and expiring it immediately
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0), // Set expiry to a past date
            path: '/', // Ensure the cookie is cleared from the root path
        });

        return response;

    } catch (error: any) {
        console.error("Error during logout:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
