"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("../app"));
// Normalizar a porta
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port))
        return val;
    if (port >= 0)
        return port;
    return false;
}
const port = normalizePort(process.env.PORT || "3000");
app_1.default.set("port", port);
// Criar o servidor HTTP
const server = http_1.default.createServer(app_1.default);
// Tratar erros de inicialização
function onError(error) {
    if (error.syscall !== "listen")
        throw error;
    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(`${bind} requer maiores privilégios`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`${bind} já está em uso`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
// Evento de escuta
function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr === null || addr === void 0 ? void 0 : addr.port}`;
    console.log(`Servidor rodando em http://localhost:${port}`);
}
// Iniciar o servidor
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
