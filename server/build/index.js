"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const { DB_HOST, PORT = 8080 } = process.env;
mongoose_1.default.set('strictQuery', false);
mongoose_1.default.connect(DB_HOST);
const start = () => {
    try {
        app_1.default.listen(PORT, () => {
            console.log(`Server running. Use our API on port: ${PORT}`);
        });
    }
    catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=index.js.map