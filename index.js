"use strict";
exports.__esModule = true;
var express_1 = require("express");
var cors_1 = require("cors");
var body_parser_1 = require("body-parser");
var swagger_jsdoc_1 = require("swagger-jsdoc");
var swagger_ui_express_1 = require("swagger-ui-express");
var db_1 = require("./db");
var routes_1 = require("./routes");
var toad_scheduler_1 = require("toad-scheduler");
var notifier = require('node-notifier');
var scheduler = new toad_scheduler_1.ToadScheduler();
// Object
var app = (0, express_1["default"])();
var port = 3000;
(0, db_1.connectDb)();
var options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Kora',
            version: '1.0.0',
            description: 'Kora API'
        },
        servers: [{
                url: 'http://localhost:3000'
            }]
    },
    apis: ['./routes/users.js']
};
var specs = (0, swagger_jsdoc_1["default"])(options);
app.use('/swagger', swagger_ui_express_1["default"].serve, swagger_ui_express_1["default"].setup(specs));
app.use(express_1["default"].json());
app.use(body_parser_1["default"].json());
app.use((0, cors_1["default"])());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use('/api', routes_1["default"]);
var task = new toad_scheduler_1.Task('task', function () {
    notifier.notify({
        title: 'My notification',
        message: 'Hello, there!'
    });
});
var job = new toad_scheduler_1.SimpleIntervalJob({ seconds: 500 }, task);
scheduler.addSimpleIntervalJob(job);
app.listen(port, function () {
    console.log("Listening at http://localhost:" + port + "/");
});
