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
exports.getCurrentRunningTimer = exports.getUserEntries = exports.stop = exports.start = exports.current = void 0;
var lodash_1 = require("lodash");
var moment_1 = require("moment");
var sequelize_1 = require("sequelize");
var project_1 = require("../../db/models/project");
var task_1 = require("../../db/models/task");
var timer_1 = require("../../db/models/timer");
var user_1 = require("../../db/models/user");
var error_1 = require("../../types/error");
var task_service_1 = require("../task/task.service");
var current = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var timers, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user.getTimers()];
            case 1:
                timers = _a.sent();
                return [2 /*return*/, timers];
            case 2:
                error_2 = _a.sent();
                console.error(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.current = current;
var start = function (taskId, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var task, user, timer, formattedTimer, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!taskId) {
                    throw new error_1.HttpError('BadRequest', 'Task was not provided');
                }
                return [4 /*yield*/, task_1["default"].findByPk(taskId)];
            case 1:
                task = _a.sent();
                return [4 /*yield*/, user_1["default"].findByPk(userId)];
            case 2:
                user = _a.sent();
                if (!task) {
                    throw new error_1.HttpError('NotFound', 'Task was not found');
                }
                if (!user) {
                    throw new error_1.HttpError('NotFound', 'Something went wrong');
                }
                _a.label = 3;
            case 3:
                _a.trys.push([3, 9, , 10]);
                return [4 /*yield*/, timer_1["default"].create({ startDate: (0, moment_1["default"])().format(), endDate: null })];
            case 4:
                timer = _a.sent();
                return [4 /*yield*/, task.addTimer(timer)];
            case 5:
                _a.sent();
                return [4 /*yield*/, user.addTimer(timer)];
            case 6:
                _a.sent();
                return [4 /*yield*/, (0, task_service_1.asignTaskToUser)(taskId, userId)];
            case 7:
                _a.sent();
                return [4 /*yield*/, timer_1["default"].findOne({
                        where: { id: timer.id },
                        include: [{ model: user_1["default"], where: { id: userId } }, { model: task_1["default"] }]
                    })];
            case 8:
                formattedTimer = _a.sent();
                return [2 /*return*/, formattedTimer];
            case 9:
                error_3 = _a.sent();
                throw new error_1.HttpError('ServerError');
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.start = start;
var stop = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var user, currentTimer, newTimer, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1["default"].findByPk(userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new error_1.HttpError('NotFound', 'Something went wrong');
                }
                return [4 /*yield*/, (0, exports.getCurrentRunningTimer)(userId)];
            case 2:
                currentTimer = _a.sent();
                if (!currentTimer) {
                    throw new error_1.HttpError('NotFound', 'Not timers exists');
                }
                _a.label = 3;
            case 3:
                _a.trys.push([3, 6, , 7]);
                return [4 /*yield*/, currentTimer.update({ endDate: (0, moment_1["default"])().format() })];
            case 4:
                _a.sent();
                return [4 /*yield*/, timer_1["default"].findOne({
                        where: { id: currentTimer.id },
                        include: [{ model: user_1["default"], where: { id: userId } }, { model: task_1["default"], include: [{ model: project_1["default"] }] }]
                    })];
            case 5:
                newTimer = _a.sent();
                return [2 /*return*/, newTimer];
            case 6:
                error_4 = _a.sent();
                throw new error_1.HttpError('ServerError');
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.stop = stop;
var getWeeklyEntries = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var user, timers, groupedTimers, groupedTimersArray, weeklyEntries;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1["default"].findByPk(userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, user.getTimers({ include: [{ model: task_1["default"], include: [{ model: project_1["default"] }] }] })];
            case 2:
                timers = _a.sent();
                groupedTimers = (0, lodash_1.groupBy)(timers, function (timer) { return (0, moment_1["default"])(timer.endDate).startOf('week').format('YYYY-MM-DD'); });
                groupedTimersArray = (0, lodash_1.toPairs)(groupedTimers);
                weeklyEntries = [];
                groupedTimersArray.forEach(function (group) {
                    var weeklyEntry = {
                        week: group[0],
                        startDate: (0, moment_1["default"])(group[0]).startOf('week').format('YYYY-MM-DD'),
                        endDate: (0, moment_1["default"])(group[0]).endOf('week').format('YYYY-MM-DD'),
                        projectEntries: []
                    };
                    group[1].forEach(function (timer) {
                        var projectEntry = {
                            project: timer.task.project.name,
                            task: timer.task,
                            startDate: timer.startDate,
                            endDate: timer.endDate
                        };
                        if (projectEntry.endDate) {
                            weeklyEntry.projectEntries.push(projectEntry);
                        }
                    });
                    if (!weeklyEntry.projectEntries.length) {
                        return;
                    }
                    var groupedProjectEntries = (0, lodash_1.groupBy)(weeklyEntry.projectEntries, function (projectEntry) { return (0, moment_1["default"])(projectEntry.endDate).format('YYYY-MM-DD'); });
                    var groupedProjectEntriesArray = (0, lodash_1.toPairs)(groupedProjectEntries);
                    var projectEntriesByDay = [];
                    groupedProjectEntriesArray.forEach(function (group) {
                        var projectEntriesByDayObject = {
                            day: group[0],
                            projectEntries: []
                        };
                        group[1].forEach(function (projectEntry) {
                            projectEntriesByDayObject.projectEntries.push(projectEntry);
                        });
                        projectEntriesByDay.push(projectEntriesByDayObject);
                    });
                    weeklyEntry.projectEntries = projectEntriesByDay;
                    weeklyEntries.push(weeklyEntry);
                });
                return [2 /*return*/, weeklyEntries];
        }
    });
}); };
var getUserEntries = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var user, projectEntries, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1["default"].findByPk(userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new error_1.HttpError('NotFound', 'Something went wrong');
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, getWeeklyEntries(userId)];
            case 3:
                projectEntries = _a.sent();
                return [2 /*return*/, projectEntries];
            case 4:
                error_5 = _a.sent();
                throw new error_1.HttpError('ServerError');
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getUserEntries = getUserEntries;
var getCurrentRunningTimer = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var timer, error_6;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, timer_1["default"].findOne({
                        where: { endDate: (_a = {}, _a[sequelize_1.Op.eq] = null, _a) },
                        include: [{ model: task_1["default"] }, { model: user_1["default"], where: { id: userId } }]
                    })];
            case 1:
                timer = _b.sent();
                return [2 /*return*/, timer];
            case 2:
                error_6 = _b.sent();
                throw new error_1.HttpError('ServerError');
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCurrentRunningTimer = getCurrentRunningTimer;
