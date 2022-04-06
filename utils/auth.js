"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.generateRandomToken = exports.omitHash = exports.compareHash = exports.generateHash = void 0;
var bcryptjs_1 = require("bcryptjs");
var crypto_1 = require("crypto");
var generateHash = function (password, salt) {
    return (0, bcryptjs_1.hashSync)(password, salt);
};
exports.generateHash = generateHash;
var compareHash = function (password, hash) {
    return (0, bcryptjs_1.compareSync)(password, hash);
};
exports.compareHash = compareHash;
var omitHash = function (user) {
    var passwordHash = user.passwordHash, userWithoutHash = __rest(user, ["passwordHash"]);
    return userWithoutHash;
};
exports.omitHash = omitHash;
var generateRandomToken = function () {
    var token = crypto_1["default"].pseudoRandomBytes(48).toString('hex');
    return token;
};
exports.generateRandomToken = generateRandomToken;
