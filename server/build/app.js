"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const todos_1 = require("@routes/api/todos");
const users_1 = require("@routes/api/users");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.use('/api/users', users_1.usersRouter);
app.use('/api/todos', todos_1.todosRouter);
app.use((_req, res) => {
    res.status(404).json({ message: 'Not found' });
});
app.use((err, _req, res, _next) => {
    const { status = 500, message = 'Server error' } = err;
    res.status(status).json({ message });
});
exports.default = app;
//# sourceMappingURL=app.js.map