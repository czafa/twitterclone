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
exports.verificarUsuario = verificarUsuario;
const bd_1 = __importDefault(require("./bd"));
//função para verificar se um usuario já existe no banco de dados
function verificarUsuario(user, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const banco = yield (0, bd_1.default)();
        const sql = "select * from usuarios where usunomeusuario=? or email=?";
        const [usuarios] = yield banco.query(sql, [user, email]);
        //retorna true se o usuario já existe, false caso contrário
        return Array.isArray(usuarios) && usuarios.length > 0;
    });
}
