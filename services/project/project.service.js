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
exports.update = exports.getById = exports.getAll = exports.synchronizeProjects = exports.remove = exports.create = void 0;
var config_1 = require("../../db/config");
var project_1 = require("../../db/models/project");
var task_1 = require("../../db/models/task");
var timer_1 = require("../../db/models/timer");
var user_1 = require("../../db/models/user");
var error_1 = require("../../types/error");
var jira_1 = require("../../utils/jira");
var projects_1 = require("../../utils/projects");
var user_2 = require("../../utils/user");
var jira_service_1 = require("../integrations/jira/jira.service");
var task_service_1 = require("../task/task.service");
var create = function (userId, payload) { return __awaiter(void 0, void 0, void 0, function () {
    var projectName, project, user, project_2, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!payload.name || !userId) {
                    throw new error_1.HttpError('BadRequest', 'Provide required info');
                }
                projectName = payload.name.toLowerCase();
                return [4 /*yield*/, project_1["default"].findOne({
                        where: config_1["default"].where(config_1["default"].fn('lower', config_1["default"].col('name')), projectName)
                    })];
            case 1:
                project = _a.sent();
                if (project) {
                    throw new error_1.HttpError('BadRequest', 'Project already exists');
                }
                return [4 /*yield*/, user_1["default"].findByPk(userId)];
            case 2:
                user = _a.sent();
                if (!user) {
                    throw new error_1.HttpError('BadRequest', 'Could not find user');
                }
                _a.label = 3;
            case 3:
                _a.trys.push([3, 6, , 7]);
                return [4 /*yield*/, project_1["default"].create(payload)];
            case 4:
                project_2 = _a.sent();
                return [4 /*yield*/, project_1["default"].findByPk(project_2.id, {
                        include: [{ model: user_1["default"], as: 'users', attributes: ['id'] }, { model: task_1["default"] }]
                    })];
            case 5: return [2 /*return*/, _a.sent()];
            case 6:
                error_2 = _a.sent();
                throw new error_1.HttpError('ServerError');
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.create = create;
var remove = function (projectId) { return __awaiter(void 0, void 0, void 0, function () {
    var project, error_3, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!projectId) {
                    throw new error_1.HttpError('BadRequest', 'ProjectId was not provided');
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, project_1["default"].findByPk(projectId)];
            case 2:
                project = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                throw new error_1.HttpError('ServerError');
            case 4:
                if (!project) {
                    throw new error_1.HttpError('NotFound', 'Project with id was not found');
                }
                _a.label = 5;
            case 5:
                _a.trys.push([5, 7, , 8]);
                return [4 /*yield*/, project.destroy()];
            case 6:
                _a.sent();
                return [3 /*break*/, 8];
            case 7:
                error_4 = _a.sent();
                throw new error_1.HttpError('ServerError');
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.remove = remove;
var synchronizeProjects = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var boards;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, jira_service_1.getAllBoards)()];
            case 1:
                boards = _a.sent();
                boards.values.forEach(function (board) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, projectId, projectName, project, newProject;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = board.location, projectId = _a.projectId, projectName = _a.projectName;
                                return [4 /*yield*/, project_1["default"].findByPk(projectId)];
                            case 1:
                                project = _b.sent();
                                if (!project) return [3 /*break*/, 4];
                                return [4 /*yield*/, (0, jira_1.compareProjects)(board, project, user)];
                            case 2:
                                _b.sent();
                                return [4 /*yield*/, (0, task_service_1.synchronizeTasks)(String(board.id))];
                            case 3:
                                _b.sent();
                                return [2 /*return*/];
                            case 4: return [4 /*yield*/, project_1["default"].create({ id: projectId, name: projectName, budget: 0, isJiraProject: true })];
                            case 5:
                                _b.sent();
                                return [4 /*yield*/, project_1["default"].findByPk(projectId)];
                            case 6:
                                newProject = _b.sent();
                                if (newProject && (0, jira_1.checkIfCanAddWithoutRestrictions)(user)) {
                                    newProject.addUsers(user);
                                }
                                return [4 /*yield*/, (0, task_service_1.synchronizeTasks)(String(board.id))];
                            case 7:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); };
exports.synchronizeProjects = synchronizeProjects;
var getAll = function (userId, filters) { return __awaiter(void 0, void 0, void 0, function () {
    var user_3, allProjects, filteredProjects, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, user_1["default"].findByPk(userId)];
            case 1:
                user_3 = _a.sent();
                if (!user_3) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, exports.synchronizeProjects)(user_3)];
            case 2:
                _a.sent();
                return [4 /*yield*/, project_1["default"].findAll({
                        include: [
                            { model: user_1["default"], as: 'users', attributes: ['id'] },
                            { model: task_1["default"], include: [{ model: timer_1["default"] }] },
                        ]
                    })];
            case 3:
                allProjects = _a.sent();
                filteredProjects = allProjects.filter(function (project) {
                    return ((0, user_2.hasAccessToAllProjects)(user_3)
                        ? project
                        : !project.users.filter(function (projectUser) { return projectUser.id === user_3.id; })) && (0, projects_1.checkStatus)(project, filters);
                });
                return [2 /*return*/, filteredProjects];
            case 4:
                error_5 = _a.sent();
                throw new error_1.HttpError('ServerError');
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getAll = getAll;
var getById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var project, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!id)
                    throw new error_1.HttpError('BadRequest', 'Provide project id');
                return [4 /*yield*/, project_1["default"].findByPk(id, {
                        include: [{ model: task_1["default"], include: [{ model: timer_1["default"] }] }, { model: user_1["default"] }]
                    })];
            case 1:
                project = _a.sent();
                return [2 /*return*/, project];
            case 2:
                error_6 = _a.sent();
                throw new error_1.HttpError('ServerError');
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getById = getById;
var update = function (projectId, payload) { return __awaiter(void 0, void 0, void 0, function () {
    var budget, isPublic, name, tasks, users, isArchived, project_3, updatedProject, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                budget = payload.budget, isPublic = payload.isPublic, name = payload.name, tasks = payload.tasks, users = payload.users, isArchived = payload.isArchived;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                if (!projectId)
                    throw new error_1.HttpError('BadRequest', 'Provide project id');
                return [4 /*yield*/, project_1["default"].findByPk(projectId)];
            case 2:
                project_3 = _a.sent();
                if (!project_3) {
                    throw new error_1.HttpError('NotFound', 'Project not found');
                }
                return [4 /*yield*/, project_3.update({ budget: budget, isPublic: isPublic, name: name, isArchived: isArchived })];
            case 3:
                _a.sent();
                if (payload.users) {
                    users === null || users === void 0 ? void 0 : users.map(function (user) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, project_3.addUsers(user.id)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                }
                return [4 /*yield*/, project_1["default"].findByPk(projectId, {
                        include: [{ model: task_1["default"], include: [{ model: timer_1["default"] }] }, { model: user_1["default"] }]
                    })];
            case 4:
                updatedProject = _a.sent();
                return [2 /*return*/, updatedProject];
            case 5:
                error_7 = _a.sent();
                throw new error_1.HttpError('ServerError');
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.update = update;
