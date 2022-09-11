"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = __importDefault(require("./config/db"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const redis_1 = require("redis");
const constants_1 = require("./constants");
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
const redisClient = (0, redis_1.createClient)({ legacyMode: true });
redisClient.connect().catch(console.error);
app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
(0, db_1.default)();
app.use((0, express_session_1.default)({
    name: "uid",
    store: new RedisStore({ client: redisClient, disableTouch: true }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        secure: constants_1.__prod__,
        sameSite: "lax",
    },
    saveUninitialized: false,
    secret: process.env.REDIS_SECRET,
    resave: false,
}));
app.use("/api/auth", auth_1.default);
app.get("/ping", (_req, res) => {
    res.json("pong");
});
app.use((err, _req, res, _next) => {
    return res.status(err.status || 500).json({ error: err.message });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`[server] Server running on ${PORT}`);
});
//# sourceMappingURL=app.js.map