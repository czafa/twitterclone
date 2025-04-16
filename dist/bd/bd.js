"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conectarBanco = conectarBanco;
const promise_1 = __importDefault(require("mysql2/promise"));
const bdConfig = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "twitter_clone",
};
let connection = null;
//função para conectar com o banco de dados e retornar a conexão
function conectarBanco() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!connection) {
            connection = yield promise_1.default.createConnection(bdConfig);
            console.log("Conectado ao banco de dados");
        }
        return connection;
    });
}
exports.default = conectarBanco;
