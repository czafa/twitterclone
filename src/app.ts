import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";
import indexRouter from "./routes/index";
import adminRouter from "./routes/admin";

const app: Application = express();

// Configurar o EJS como motor de templates
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));

// Rotas
app.use("/", indexRouter);
app.use("/admin", adminRouter);

// Tratamento de erro 404
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).render("erro", {
        message: "Página não encontrada",
        error: {},
    });
});

// Tratamento de erros gerais
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.render("erro", {
        message: err.message,
        error: process.env.NODE_ENV === "development" ? err : {},
    });
});

export default app;
