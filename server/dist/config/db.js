"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../constants");
function connectDB() {
    try {
        const uri = constants_1.__prod__ ? "" : "mongodb://localhost:27017/cookie-session";
        mongoose_1.default.connect(uri).then(() => {
            console.log(`[server] Database connected`);
        });
    }
    catch (err) {
        console.error(err);
    }
}
exports.default = connectDB;
//# sourceMappingURL=db.js.map