"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const { DB_HOST, PORT = '8080' } = process.env;
mongoose_1.default.set('strictQuery', false);
mongoose_1.default
    .connect(DB_HOST)
    .then(() => {
    const server = app_1.default.listen(Number(PORT), () => {
        console.log(`Server running. Use our API on port: ${PORT}`);
    });
    process.on('SIGINT', async () => {
        await server.close();
        await mongoose_1.default.disconnect();
        process.exit(0);
    });
})
    .catch(error => {
    console.log(error.message);
    process.exit(1);
});
//# sourceMappingURL=index.js.map