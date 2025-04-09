import express, { Request, Response } from "express";

const router = express.Router();

// Rota inicial - Mostra a página inicial, que será um formulário de Login
router.get("/", async (req: Request, res: Response) => {
    res.render("index", { title: "Twitter Clone" });
});

export default router;
