"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToPlaylist = exports.myProfile = exports.loginUser = exports.registerUser = void 0;
const model_js_1 = require("./model.js");
const TryCatch_js_1 = __importDefault(require("./TryCatch.js"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.registerUser = (0, TryCatch_js_1.default)(async (req, res) => {
    const { name, email, password } = req.body;
    let user = await model_js_1.User.findOne({ email });
    if (user) {
        res.status(400).json({
            message: "User Already exists",
        });
        return;
    }
    const hashPassword = await bcrypt_1.default.hash(password, 10);
    user = await model_js_1.User.create({
        name,
        email,
        password: hashPassword,
    });
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SEC, {
        expiresIn: "7d",
    });
    res.status(201).json({
        message: "User Registered",
        user,
        token,
    });
});
exports.loginUser = (0, TryCatch_js_1.default)(async (req, res) => {
    const { email, password } = req.body;
    const user = await model_js_1.User.findOne({ email });
    if (!user) {
        res.status(404).json({
            messsage: "User not exists",
        });
        return;
    }
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        res.status(400).json({
            message: "Invalid Password !!!",
        });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SEC, {
        expiresIn: "7d",
    });
    res.status(200).json({
        message: "LOGGED IN",
        user,
        token,
    });
});
exports.myProfile = (0, TryCatch_js_1.default)(async (req, res) => {
    const user = req.user;
    res.json(user);
});
exports.addToPlaylist = (0, TryCatch_js_1.default)(async (req, res) => {
    const userId = req.user?._id;
    const user = await model_js_1.User.findById(userId);
    if (!user) {
        res.status(404).json({
            message: "No user with this id",
        });
        return;
    }
    if (user?.playlist.includes(req.params.id)) {
        const index = user.playlist.indexOf(req.params.id);
        user.playlist.splice(index, 1);
        await user.save();
        res.json({
            message: " Removed from playlist",
        });
        return;
    }
    user.playlist.push(req.params.id);
    await user.save();
    res.json({
        message: "Added to PlayList",
    });
});
//# sourceMappingURL=controller.js.map