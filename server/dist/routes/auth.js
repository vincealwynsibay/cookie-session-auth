"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router = express_1.default.Router();
router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            throw new Error("Invalid email or password");
        }
        let user = await User_1.default.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        const isValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isValid) {
            throw new Error("Invalid email or password");
        }
        req.session.userId = user._id;
        console.log(req.session);
        return res.json({ ok: true, user });
    }
    catch (err) {
        next(err);
    }
});
router.post("/register", async (req, res, next) => {
    const { email, password, name } = req.body;
    try {
        if (!email || !password || !name) {
            throw new Error("Invalid Credentials");
        }
        let user = await User_1.default.findOne({ email });
        if (user) {
            throw new Error("Email already taken");
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const encryptedPassword = await bcryptjs_1.default.hash(password, salt);
        user = new User_1.default({
            email,
            name,
            password: encryptedPassword,
        });
        await user.save();
        return res.json({ ok: true });
    }
    catch (err) {
        next(err);
    }
});
router.get("/me", async (req, res, next) => {
    try {
        console.log(req.session.userId);
        if (!req.session.userId) {
            return null;
        }
        const user = await User_1.default.findById(req.session.userId);
        return res.json({ user });
    }
    catch (err) {
        next(err);
    }
});
router.get("/logout", async (req, res, next) => {
    try {
        req.session.destroy((err) => {
            res.clearCookie("uid", {
                path: "/",
                domain: "localhost",
            });
            return res.send({ clearSession: "success" });
        });
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map