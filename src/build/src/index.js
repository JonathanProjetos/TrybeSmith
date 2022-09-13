"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var PORT = 3000;
var server = app_1.default.listen(PORT, function () { return console.log("Server is running on PORT: " + PORT); });
exports.default = server;
