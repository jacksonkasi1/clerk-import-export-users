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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var promises_1 = require("fs/promises");
var envValidator_1 = require("./envValidator"); // Import environment variables validator
var formatDate = function (timestamp) {
    return new Date(timestamp).toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    });
};
var processUserData = function (users) {
    return users.map(function (user) {
        var _a;
        return ({
            first_name: user.first_name,
            last_name: user.last_name,
            email: (_a = user.email_addresses[0]) === null || _a === void 0 ? void 0 : _a.email_address, // Assumes the first email is the primary email
            last_active_at: formatDate(user.last_active_at)
        });
    });
};
var fetchAllUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var allUsers, offset, limit, fetchMore, response, users, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                allUsers = [];
                offset = 0;
                limit = 100;
                fetchMore = true;
                _a.label = 1;
            case 1:
                if (!fetchMore) return [3 /*break*/, 6];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, axios_1.default.get("".concat(envValidator_1.env.CLERK_BASE_URL, "/v1/users"), {
                        headers: {
                            Authorization: "Bearer ".concat(envValidator_1.env.CLERK_API_KEY)
                        },
                        params: {
                            limit: limit,
                            offset: offset,
                            order_by: "-created_at" // Order users by creation date, newest first
                        }
                    })];
            case 3:
                response = _a.sent();
                users = response.data;
                if (users.length > 0) {
                    allUsers = allUsers.concat(users);
                    offset += users.length;
                }
                else {
                    fetchMore = false;
                }
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.error('Failed to fetch users:', error_1);
                fetchMore = false;
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 1];
            case 6: return [2 /*return*/, allUsers];
        }
    });
}); };
var saveUsersToFile = function (users) { return __awaiter(void 0, void 0, void 0, function () {
    var error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, promises_1.writeFile)('./users.json', JSON.stringify(users, null, 2))];
            case 1:
                _a.sent();
                console.log('User data saved successfully.');
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error('Error saving user data to file:', error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var users, processedUsers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchAllUsers()];
            case 1:
                users = _a.sent();
                processedUsers = processUserData(users);
                return [4 /*yield*/, saveUsersToFile(processedUsers)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
main();
