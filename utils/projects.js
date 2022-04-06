"use strict";
exports.__esModule = true;
exports.checkStatus = exports.isUserAlreadyAdded = void 0;
var project_1 = require("../constants/project");
var isUserAlreadyAdded = function (users, user) {
    return users.includes(user);
};
exports.isUserAlreadyAdded = isUserAlreadyAdded;
var checkStatus = function (project, filters) {
    var _a = filters.status, status = _a === void 0 ? project_1.EProjectStatus.Active : _a, _b = filters.access, access = _b === void 0 ? 'All' : _b;
    return checkArchived(project, status) && checkAccess(project, access);
};
exports.checkStatus = checkStatus;
var checkArchived = function (project, status) {
    if (status === project_1.EProjectStatus.All) {
        return true;
    }
    if (status === project_1.EProjectStatus.Archived && project.isArchived) {
        return true;
    }
    if (status === project_1.EProjectStatus.Active && !project.isArchived) {
        return true;
    }
    return false;
};
var checkAccess = function (project, access) {
    if (access === 'All') {
        return true;
    }
    if (access === 'Public' && project.isPublic) {
        return true;
    }
    if (access === 'Private' && !project.isPublic) {
        return true;
    }
    return false;
};
