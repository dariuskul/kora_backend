"use strict";
exports.__esModule = true;
exports.calculateMostTimeSpentOnProject = exports.convertDateToTime = exports.getLast12Months = exports.formatTopTimers = exports.checkIfHasTimerRunning = void 0;
var moment_1 = require("moment");
var checkIfHasTimerRunning = function (timers) {
    if (!timers) {
        return null;
    }
    var runningTimer = timers.find(function (item) { return item.endDate === ''; });
    if (runningTimer) {
        return runningTimer;
    }
    return null;
};
exports.checkIfHasTimerRunning = checkIfHasTimerRunning;
var formatTopTimers = function (timers) {
    return timers.map(function (item) { return ({ name: item.task.description, time: Number(item.endDate) - Number(item.startDate) }); });
};
exports.formatTopTimers = formatTopTimers;
var getLast12Months = function (timers) {
    var months = [];
    var currentMonth = (0, moment_1["default"])().format('MMMM');
    var currentYear = (0, moment_1["default"])().format('YYYY');
    var currentMonthTimers = timers.filter(function (item) { return (0, moment_1["default"])(item.startDate).format('MMMM') === currentMonth && (0, moment_1["default"])(item.startDate).format('YYYY') === currentYear; });
    var currentMonthTime = currentMonthTimers.reduce(function (acc, item) { return acc + Number(getTimeDuration(item.startDate, item.endDate) || 0); }, 0);
    var currentMonthObject = {
        month: currentMonth,
        time: currentMonthTime
    };
    months.push(currentMonthObject);
    var _loop_1 = function (i) {
        var month = (0, moment_1["default"])().subtract(i, 'months').format('MMMM');
        var year = (0, moment_1["default"])().subtract(i, 'months').format('YYYY');
        var monthTimers = timers.filter(function (item) { return (0, moment_1["default"])(item.startDate).format('MMMM') === month && (0, moment_1["default"])(item.startDate).format('YYYY') === year; });
        var monthTime = monthTimers.reduce(function (acc, item) { return acc + Number(getTimeDuration(item.startDate, item.endDate) || 0); }, 0);
        var monthObject = {
            month: month,
            time: monthTime
        };
        months.push(monthObject);
    };
    for (var i = 1; i < 6; i++) {
        _loop_1(i);
    }
    return months.reverse();
};
exports.getLast12Months = getLast12Months;
var getTimeDuration = function (startDate, endDate) {
    var start = (0, moment_1["default"])(startDate);
    var end = (0, moment_1["default"])(endDate);
    var duration = moment_1["default"].duration(end.diff(start));
    return duration.asMilliseconds();
};
// convert date to time in seconds
var convertDateToTime = function (date) {
    console.log((0, moment_1["default"])(date).format('X'));
    return (0, moment_1["default"])(date).format('X');
};
exports.convertDateToTime = convertDateToTime;
// calculate most time spent on project
// dont include month
var calculateMostTimeSpentOnProject = function (timers) {
    var projects = [];
    timers.forEach(function (item) {
        var project = projects.find(function (project) { return project.id === item.task.projectId; });
        if (project) {
            project.time += Number(getTimeDuration(item.startDate, item.endDate) || 0);
        }
        else {
            projects.push({
                id: item.task.projectId,
                name: item.task.project.name,
                time: Number(getTimeDuration(item.startDate, item.endDate) || 0)
            });
        }
    });
    // convert time to hours and minutes
    return projects.sort(function (a, b) { return b.time - a.time; });
};
exports.calculateMostTimeSpentOnProject = calculateMostTimeSpentOnProject;
