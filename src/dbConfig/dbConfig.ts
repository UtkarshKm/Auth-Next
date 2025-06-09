import mongoose from "mongoose";

export async function connectToDatabase() {
	try {
		await mongoose.connect(process.env.MONGO_URL!);
		const connection = mongoose.connection;
		connection.on("connected", () => {
			console.log("Connected to MongoDB successfully");
		});

    connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });
	} catch (error) {
		console.error(" Something went wrong in connect to MongoDB:", error);
		throw error;
	}
}
