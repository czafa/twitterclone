import http from "http";
import app from "../app";

// Normalizar a porta
function normalizePort(val: string): number | string | boolean {
    const port = parseInt(val, 10);
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
}

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// Criar o servidor HTTP
const server = http.createServer(app);

// Tratar erros de inicialização
function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== "listen") throw error;

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
function onListening(): void {
    const addr = server.address();
    const bind =
        typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
    console.log(`Servidor rodando em http://localhost:${port}`);
}

// Iniciar o servidor
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
