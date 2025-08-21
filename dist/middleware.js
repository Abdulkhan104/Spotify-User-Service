"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const model_1 = require("./model");
const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            res.status(403).json({
                message: "Please Login",
            });
            return;
        }
        const decodedvalue = jsonwebtoken_1.default.verify(token, process.env.JWT_SEC);
        if (!decodedvalue || !decodedvalue._id) {
            res.status(403).json({
                message: "Invalid token",
            });
            return;
        }
        const userId = decodedvalue._id;
        const user = await model_1.User.findById(userId).select("-password");
        if (!user) {
            res.status(403).json({
                message: "User Not Found!!",
            });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(403).json({
            message: "Please Login",
        });
    }
};
exports.isAuth = isAuth;
//# sourceMappingURL=middleware.js.map