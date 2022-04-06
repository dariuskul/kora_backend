"use strict";
exports.__esModule = true;
exports.hasAccessToAllProjects = void 0;
var hasAccessToAllProjects = function (user) { return user.role.includes("admin" /* Admin */) || user.role.includes("moderator" /* Moderator */); };
exports.hasAccessToAllProjects = hasAccessToAllProjects;
