import mongoose from "mongoose";
import { __prod__ } from "../constants";

export default function connectDB() {
	try {
		const uri = __prod__ ? "" : "mongodb://localhost:27017/cookie-session";
		mongoose.connect(uri).then(() => {
			console.log(`[server] Database connected`);
		});
	} catch (err) {
		console.error(err);
	}
}
