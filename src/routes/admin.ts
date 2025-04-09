import express, { Request, Response } from "express";

const router = express.Router();

// Rota inicial para admin
router.get("/", (req: Request, res: Response) => {
    res.send("Painel de Administração - Twitter Clone");
});

export default router;
