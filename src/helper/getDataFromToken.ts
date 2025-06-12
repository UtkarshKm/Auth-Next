import {NextRequest} from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest): string => {
	try {
		const token = request.cookies.get("token")?.value || "";
		if (!token) {
			throw new Error("No token found in cookies");
		}
		const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;

		if (typeof decodedToken === "string" || !decodedToken.id) {
			throw new Error("Invalid token structure: ID not found.");
		}

		return decodedToken.id;
	} catch (error: unknown) {
		// Consolidate error handling: if it's an error object, use its message, otherwise stringify
		if (error instanceof Error) {
			throw new Error(`Token verification failed: ${error.message}`);
		}
		throw new Error(`An unknown error occurred during token verification: ${String(error)}`);
	}
};
