"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (_) try {
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
exports.__esModule = true;
exports.getUserDashBoardInfo = exports.getUserByVerificationToken = exports.addUser = exports.update = exports.authenticate = exports.getAll = exports.create = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var config_1 = require("../../config");
var project_1 = require("../../db/models/project");
var task_1 = require("../../db/models/task");
var timer_1 = require("../../db/models/timer");
var user_1 = require("../../db/models/user");
var email_1 = require("../../others/templates/email");
var error_1 = require("../../types/error");
var auth_1 = require("../../utils/auth");
var timer_2 = require("../../utils/timer");
var create = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var user, newUser, passwordHash, userData, user_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!payload.email || !payload.fullName) {
                    throw new error_1.HttpError('BadRequest', 'Required fields were not provided');
                }
                return [4 /*yield*/, user_1["default"].findOne({ where: { email: payload.email } })];
            case 1:
                user = _a.sent();
                if (!(user && user.status === 'pending')) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, exports.update)(user.id, __assign(__assign({}, payload), { verificationToken: '', status: 'verified' }))];
            case 2:
                newUser = _a.sent();
                return [2 /*return*/, newUser];
            case 3:
                if (!user && payload.role === 'Admin') {
                    passwordHash = (0, auth_1.generateHash)(payload.password, 15);
                    userData = {
                        email: payload.email,
                        fullName: payload.fullName,
                        dateOfBirth: payload.dateOfBirth,
                        role: payload.role || "user" /* User */,
                        passwordHash: passwordHash
                    };
                    try {
                        user_2 = user_1["default"].create(userData);
                        return [2 /*return*/, user_2];
                    }
                    catch (error) {
                        throw new error_1.HttpError('ServerError');
                    }
                }
                else {
                    throw new error_1.HttpError('Unauthorized');
                }
                return [2 /*return*/];
        }
    });
}); };
exports.create = create;
var getAll = function () { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_1["default"].findAll({ attributes: { exclude: ['passwordHash'] }, include: { model: project_1["default"], as: 'projects' } })];
            case 1:
                users = _a.sent();
                return [2 /*return*/, users];
            case 2:
                error_2 = _a.sent();
                throw new error_1.HttpError('ServerError');
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAll = getAll;
var authenticate = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var payloadEmail, password, user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                payloadEmail = payload.email, password = payload.password;
                if (!payloadEmail || !password) {
                    throw new error_1.HttpError('BadRequest', 'Email and password are required');
                }
                return [4 /*yield*/, user_1["default"].findOne({ where: { email: payloadEmail } })];
            case 1:
                user = _a.sent();
                if (!user || !(0, auth_1.compareHash)(password, user.passwordHash) || user.status === 'pending') {
                    throw new error_1.HttpError('BadRequest', 'Provided credentials are not correct');
                }
                token = (0, jsonwebtoken_1.sign)({ sub: user.id }, config_1.AUTH.JWT, { expiresIn: '2h' });
                return [2 /*return*/, __assign(__assign({}, (0, auth_1.omitHash)(user.get())), { token: token })];
        }
    });
}); };
exports.authenticate = authenticate;
var update = function (userId, payload) { return __awaiter(void 0, void 0, void 0, function () {
    var user, passwordHash;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!userId) {
                    throw new error_1.HttpError('BadRequest', 'Provide user id');
                }
                return [4 /*yield*/, user_1["default"].findByPk(userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new error_1.HttpError('NotFound', 'User was not found');
                }
                if (payload.password) {
                    passwordHash = (0, auth_1.generateHash)(payload.password, 15);
                }
                Object.assign(user, __assign(__assign({}, payload), { passwordHash: passwordHash }));
                return [4 /*yield*/, user.save()];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.update = update;
var addUser = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1["default"].findOne({ where: { email: email } })];
            case 1:
                user = _a.sent();
                if (user) {
                    throw new error_1.HttpError('BadRequest', 'There is already user with provided email');
                }
                token = (0, auth_1.generateRandomToken)();
                return [4 /*yield*/, user_1["default"].create({ email: email, fullName: '', passwordHash: '', role: 'user', verificationToken: token, dateOfBirth: '' })];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, email_1.sendVerificationEmail)(email, token)];
            case 3:
                _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
exports.addUser = addUser;
var getUserByVerificationToken = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1["default"].findOne({ where: { verificationToken: token } })];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new error_1.HttpError('BadRequest', 'Token invalid');
                }
                return [2 /*return*/, user];
        }
    });
}); };
exports.getUserByVerificationToken = getUserByVerificationToken;
var getUserDashBoardInfo = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var user, timers, usersTimers, getLast6Months, topProjects, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1["default"].findByPk(userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new error_1.HttpError('BadRequest', 'User not found');
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, timer_1["default"].findAll({
                        // only get timers that belong to user
                        include: [
                            { model: task_1["default"], as: 'task', include: [{ model: project_1["default"], as: 'project' }] },
                        ]
                    })];
            case 3:
                timers = _a.sent();
                usersTimers = timers.filter(function (timer) { return timer.userId === Number(userId); });
                getLast6Months = (0, timer_2.getLast12Months)(usersTimers);
                topProjects = (0, timer_2.calculateMostTimeSpentOnProject)(usersTimers);
                return [2 /*return*/, { last6Months: getLast6Months, topProjects: topProjects }];
            case 4:
                error_3 = _a.sent();
                console.log('error', error_3);
                throw new error_1.HttpError('ServerError');
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getUserDashBoardInfo = getUserDashBoardInfo;
