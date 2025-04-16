"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./routes/index"));
const admin_1 = __importDefault(require("./routes/admin"));
const app = (0, express_1.default)();
// Configurar o EJS como motor de templates
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "../views"));
// Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
// Rotas
app.use("/", index_1.default);
app.use("/admin", admin_1.default);
// Tratamento de erro 404
app.use((req, res, next) => {
    res.status(404).render("erro", {
        message: "Página não encontrada",
        error: {},
    });
});
// Tratamento de erros gerais
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render("erro", {
        message: err.message,
        error: process.env.NODE_ENV === "development" ? err : {},
    });
});
exports.default = app;
