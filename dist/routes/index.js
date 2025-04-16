"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const express_1 = __importDefault(require("express"));
const userBD = __importStar(require("../bd/userDB"));
const router = express_1.default.Router();
// Rota inicial - Mostra a página inicial, que será um formulário de Login
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("index", { title: "Twitter Clone" });
}));
// Rota /novaconta - Mostra a página de cadastro, que será um formulário de cadastro
router.get("/novaconta", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("novaconta", { title: "twitter clone" });
}));
//
// ROTAS POST
//
// Rota /inscrever - cria uma nova conta no aplicativo
router.post("/inscrever", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // captura os dados do formulário de cadastro
    const { nome, usuario, email, senha } = req.body; // dessa forma, é a mesma coisa que fazer:
    // const nome = req.body.nome;
    // const usuario = req.body.usuario;
    // const email = req.body.email;
    // const senha = req.body.senha;
    // aqui, você pode fazer o que quiser com os dados, como salvar no banco de dados
    try {
        //verifica se o nome de usuario e/ou email já existem no BD.
        const userExists = yield userBD.verificarUsuario(usuario, email);
        if (userExists) {
            res.status(400).render("erro", {
                menssage: "Usuário ou email já cadastrados",
                error: {},
            });
        }
        res.send("Usuário cadastrado com sucesso");
        //await userBD.cadastrarUsuario(nome, usuario, email, senha);
    }
    catch (error) {
        res.status(500).render("erro", {
            menssage: "Erro ao cadastrar usuário",
            error: {},
        });
    }
}));
exports.default = router;
