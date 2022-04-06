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
exports.getUserTasks = exports.asignTaskToUser = exports.getTasksByProjectId = exports.getAll = exports.synchronizeTasks = exports.create = void 0;
var project_1 = require("../../db/models/project");
var task_1 = require("../../db/models/task");
var user_1 = require("../../db/models/user");
var error_1 = require("../../types/error");
var user_2 = require("../../utils/user");
var jira_service_1 = require("../integrations/jira/jira.service");
var project_service_1 = require("../project/project.service");
var create = function (payload, projectId) { return __awaiter(void 0, void 0, void 0, function () {
    var project, error_2, task, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!payload.description) {
                    throw new error_1.HttpError('BadRequest', 'Provide task description');
                }
                if (!projectId) return [3 /*break*/, 4];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, project_1["default"].findByPk(projectId)];
            case 2:
                project = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                throw new error_1.HttpError('ServerError');
            case 4:
                if (projectId && !project) {
                    throw new error_1.HttpError('NotFound', 'Project could not be found with provided id');
                }
                _a.label = 5;
            case 5:
                _a.trys.push([5, 9, , 10]);
                return [4 /*yield*/, task_1["default"].create(payload)];
            case 6:
                task = _a.sent();
                if (!(projectId && project)) return [3 /*break*/, 8];
                return [4 /*yield*/, project.addTask([task])];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8: return [2 /*return*/, task];
            case 9:
                error_3 = _a.sent();
                throw new error_1.HttpError('ServerError');
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.create = create;
var synchronizeTasks = function (boardId) { return __awaiter(void 0, void 0, void 0, function () {
    var boardIssues;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, jira_service_1.getIssues)(boardId)];
            case 1:
                boardIssues = _a.sent();
                boardIssues.issues.forEach(function (issue) { return __awaiter(void 0, void 0, void 0, function () {
                    var task, project, newTask;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, task_1["default"].findByPk(issue.id)];
                            case 1:
                                task = _a.sent();
                                return [4 /*yield*/, project_1["default"].findByPk(issue.fields.project.id)];
                            case 2:
                                project = _a.sent();
                                if (task || !project) {
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, task_1["default"].create({ id: issue.id, description: issue.fields.summary })];
                            case 3:
                                newTask = _a.sent();
                                if (!project) return [3 /*break*/, 5];
                                return [4 /*yield*/, project.addTask(newTask)];
                            case 4:
                                _a.sent();
                                _a.label = 5;
                            case 5: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); };
exports.synchronizeTasks = synchronizeTasks;
var getAll = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var user_3, tasks, filteredTasks, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, user_1["default"].findByPk(userId)];
            case 1:
                user_3 = _a.sent();
                if (!user_3) {
                    throw new error_1.HttpError('ServerError');
                }
                return [4 /*yield*/, (0, project_service_1.synchronizeProjects)(user_3)];
            case 2:
                _a.sent();
                return [4 /*yield*/, task_1["default"].findAll({ include: [{ model: project_1["default"], include: [{ model: user_1["default"] }] }] })];
            case 3:
                tasks = _a.sent();
                filteredTasks = tasks.filter(function (task) {
                    return (0, user_2.hasAccessToAllProjects)(user_3) ? task : task.project.users.filter(function (item) { return item.id === user_3.id; }).length > 0;
                });
                return [2 /*return*/, filteredTasks];
            case 4:
                error_4 = _a.sent();
                throw new error_1.HttpError('ServerError');
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getAll = getAll;
var getTasksByProjectId = function (projectId) { return __awaiter(void 0, void 0, void 0, function () {
    var project, tasks, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!projectId) {
                    throw new error_1.HttpError('BadRequest', 'Project id is missing!');
                }
                return [4 /*yield*/, project_1["default"].findByPk(projectId)];
            case 1:
                project = _a.sent();
                if (!project) {
                    throw new error_1.HttpError('NotFound', 'Project not found with that id');
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, project.getTasks({ where: {}, include: project_1["default"] })];
            case 3:
                tasks = _a.sent();
                return [2 /*return*/, tasks];
            case 4:
                error_5 = _a.sent();
                throw new error_1.HttpError('ServerError');
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getTasksByProjectId = getTasksByProjectId;
var asignTaskToUser = function (taskId, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var task, user, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!taskId || !userId) {
                    throw new error_1.HttpError('BadRequest', 'Provide task id and user id');
                }
                return [4 /*yield*/, task_1["default"].findByPk(taskId)];
            case 1:
                task = _a.sent();
                if (!task) {
                    throw new error_1.HttpError('NotFound', 'Task not found with that id');
                }
                return [4 /*yield*/, user_1["default"].findByPk(userId)];
            case 2:
                user = _a.sent();
                if (!user) {
                    throw new error_1.HttpError('NotFound', 'User not found with that id');
                }
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, user.addTask(task)];
            case 4:
                _a.sent();
                return [2 /*return*/, task];
            case 5:
                error_6 = _a.sent();
                console.log(error_6);
                throw new error_1.HttpError('ServerError');
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.asignTaskToUser = asignTaskToUser;
var getUserTasks = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var user, tasks, accessableTasks, assignedTasks, error_7;
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
                    throw new error_1.HttpError('NotFound', 'User not found with that id');
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, task_1["default"].findAll({ include: [{ model: project_1["default"], include: [{ model: user_1["default"] }] }] })];
            case 3:
                tasks = _a.sent();
                accessableTasks = tasks.filter(function (task) {
                    return (0, user_2.hasAccessToAllProjects)(user) ? task : task.project.users.filter(function (item) { return item.id === user.id; }).length > 0;
                });
                assignedTasks = accessableTasks.filter(function (task) { return task.assigneeId === userId; });
                return [2 /*return*/, assignedTasks];
            case 4:
                error_7 = _a.sent();
                throw new error_1.HttpError('ServerError');
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getUserTasks = getUserTasks;
