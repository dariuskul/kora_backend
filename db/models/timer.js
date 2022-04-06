"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var sequelize_typescript_1 = require("sequelize-typescript");
var task_1 = require("./task");
var user_1 = require("./user");
var Timer = /** @class */ (function (_super) {
    __extends(Timer, _super);
    function Timer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return user_1["default"]; }),
        sequelize_typescript_1.Column
    ], Timer.prototype, "userId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return user_1["default"]; })
    ], Timer.prototype, "user");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return task_1["default"]; }),
        sequelize_typescript_1.Column
    ], Timer.prototype, "taskId");
    __decorate([
        (0, sequelize_typescript_1.BelongsTo)(function () { return task_1["default"]; })
    ], Timer.prototype, "task");
    __decorate([
        sequelize_typescript_1.Column
    ], Timer.prototype, "startDate");
    __decorate([
        (0, sequelize_typescript_1.Column)({ allowNull: true })
    ], Timer.prototype, "endDate");
    __decorate([
        (0, sequelize_typescript_1.Column)({ allowNull: true })
    ], Timer.prototype, "time");
    Timer = __decorate([
        sequelize_typescript_1.Table
    ], Timer);
    return Timer;
}(sequelize_typescript_1.Model));
exports["default"] = Timer;
