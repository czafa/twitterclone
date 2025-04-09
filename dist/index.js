"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//importa o express para criar um servidor http
// importa os tipos Request e Response que serão usados na rotas
const express_1 = __importDefault(require("express"));
// cria uma instancia do express chamada app, definir rotas midleware.
// define a porta 3000 na qual o servidor irá escutar requisições HTTP.
const app = (0, express_1.default)();
const port = 3000;
//configurar o EJS como motor de templates
app.set("view engine", "ejs"); //informa qual é o motor de renedrização
app.set("views", "./views"); //informa onde estão os arquivos de templates (HTML)
app.use(express_1.default.static("public")); //informa onde estão os arquivos estaticos (CSS, JS, imagens)
//Rota inicial
app.get("/", (req, res) => {
    res.render("index", { title: "Twitter Clone" });
});
//Inicia o Servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
