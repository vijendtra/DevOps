"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("logger");
const server_1 = __importDefault(require("./server"));
const port = process.env.PORT || 3001;
server_1.default.listen(port, () => {
    (0, logger_1.log)(`Server listening on port ${port}`);
});
