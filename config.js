"use strict";
exports.__esModule = true;
exports.jira = exports.setEmailApiToken = exports.AUTH = void 0;
var mail_1 = require("@sendgrid/mail");
var jira_client_1 = require("jira-client");
exports.AUTH = {
    JWT: '13U43CakwpVA6pQa1M7H'
};
var setEmailApiToken = function () {
    mail_1["default"].setApiKey('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');
};
exports.setEmailApiToken = setEmailApiToken;
exports.jira = new jira_client_1["default"]({
    protocol: 'https',
    host: 'barbori.atlassian.net',
    username: 'dariuux@gmail.com',
    password: 'Kiw5Chx3WibEAoRu1WWW314E',
    apiVersion: '3',
    strictSSL: true
});
