"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_js_1 = require("./controller.js");
const middleware_js_1 = require("./middleware.js");
const router = express_1.default.Router();
router.post("/user/register", controller_js_1.registerUser);
router.post("/user/login", controller_js_1.loginUser);
router.get("/user/me", middleware_js_1.isAuth, controller_js_1.myProfile);
exports.default = router;
//# sourceMappingURL=route.js.map