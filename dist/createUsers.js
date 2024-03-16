"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var fs_1 = require("fs");
var envValidator_1 = require("./envValidator"); // Adjust this import path as necessary
var transformUser = function (user) {
    return {
        external_id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email_address: user.email_addresses.map(function (email) { return email.email_address; }), // Assuming all emails need to be migrated
    };
};
var createUsers = function (users) { return __awaiter(void 0, void 0, void 0, function () {
    var axiosInstance, _i, users_1, user, transformedUser, error_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                axiosInstance = axios_1.default.create({
                    baseURL: envValidator_1.env.CLERK_BASE_URL,
                    headers: {
                        Authorization: "Bearer ".concat(envValidator_1.env.CLERK_API_KEY),
                        "Content-Type": "application/json",
                    },
                });
                _i = 0, users_1 = users;
                _c.label = 1;
            case 1:
                if (!(_i < users_1.length)) return [3 /*break*/, 7];
                user = users_1[_i];
                transformedUser = transformUser(user);
                _c.label = 2;
            case 2:
                _c.trys.push([2, 5, , 6]);
                return [4 /*yield*/, axiosInstance.post("/v1/users", transformedUser)];
            case 3:
                _c.sent();
                console.log("User created: ".concat(user.id));
                return [4 /*yield*/, new Promise(function (resolve) {
                        return setTimeout(resolve, envValidator_1.env.RATE_LIMIT_PAUSE_MS / 20);
                    })];
            case 4:
                _c.sent(); // Respect rate limit
                return [3 /*break*/, 6];
            case 5:
                error_1 = _c.sent();
                if (error_1 instanceof Error) {
                    // This checks if it's a standard JavaScript Error object
                    console.error("Error creating user ".concat(user.id, ":"), error_1.message);
                    console.log(JSON.stringify(error_1.message));
                }
                else if (axios_1.default.isAxiosError(error_1)) {
                    // This checks if it's an AxiosError, which has the 'response' property
                    console.error("Error creating user ".concat(user.id, ":"), ((_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data) || "Axios error without response data");
                    console.log(JSON.stringify((_b = error_1.response) === null || _b === void 0 ? void 0 : _b.data));
                }
                else {
                    // Fallback for any other types of errors
                    console.error("Error creating user ".concat(user.id, ":"), "An unexpected error occurred");
                }
                return [3 /*break*/, 6];
            case 6:
                _i++;
                return [3 /*break*/, 1];
            case 7: return [2 /*return*/];
        }
    });
}); };
// Reads 'users.json' from the root directory
var usersData = JSON.parse((0, fs_1.readFileSync)("./users.json", "utf-8"));
createUsers(usersData).then(function () {
    return console.log("User creation process completed.");
});
