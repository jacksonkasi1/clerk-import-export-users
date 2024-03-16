"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var validateEnv = function () {
    var _a = process.env, CLERK_API_KEY = _a.CLERK_API_KEY, CLERK_BASE_URL = _a.CLERK_BASE_URL, RATE_LIMIT_PAUSE_MS = _a.RATE_LIMIT_PAUSE_MS;
    if (!CLERK_API_KEY || !CLERK_BASE_URL || !RATE_LIMIT_PAUSE_MS) {
        throw new Error("Missing required environment variables. Please check your .env file.");
    }
    return {
        CLERK_API_KEY: CLERK_API_KEY,
        CLERK_BASE_URL: CLERK_BASE_URL,
        RATE_LIMIT_PAUSE_MS: parseInt(RATE_LIMIT_PAUSE_MS, 10),
    };
};
exports.env = validateEnv();
