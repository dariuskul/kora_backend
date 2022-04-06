"use strict";
exports.__esModule = true;
exports.createTransporter = void 0;
var nodemailer_1 = require("nodemailer");
var createTransporter = function () {
    var transporter = nodemailer_1["default"].createTransport({
        service: 'gmail',
        auth: {
            user: 'cidukascido@gmail.com',
            pass: 'Rekles123'
        }
    });
    return transporter;
};
exports.createTransporter = createTransporter;
