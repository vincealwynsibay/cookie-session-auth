import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import connectDB from "./config/db";

import session from "express-session";
import connectRedis from "connect-redis";
import { createClient } from "redis";
import { __prod__ } from "./constants";

// routes
import authRoute from "./routes/auth";

const app = express();

// init redis
const RedisStore = connectRedis(session);
const redisClient = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);

// configure middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cookieParser());

// configure db
connectDB();

// configure sessions
app.use(
	session({
		name: "uid",
		store: new RedisStore({ client: redisClient, disableTouch: true }),
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
			httpOnly: true,
			secure: __prod__,
			sameSite: "lax",
		},
		saveUninitialized: false,
		secret: process.env.REDIS_SECRET!,
		resave: false,
	})
);

// configure routes
app.use("/api/auth", authRoute);

app.get("/ping", (_req, res) => {
	res.json("pong");
});

app.use((err: any, _req: Request, res: Response, _next: any) => {
	return res.status(err.status || 500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`[server] Server running on ${PORT}`);
});
