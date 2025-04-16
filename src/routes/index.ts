import express, { Request, Response } from "express";
import * as userBD from "../bd/userDB";

const router = express.Router();

// Rota inicial - Mostra a página inicial, que será um formulário de Login
router.get("/", async (req: Request, res: Response) => {
    res.render("index", { title: "Twitter Clone" });
});

// Rota /novaconta - Mostra a página de cadastro, que será um formulário de cadastro
router.get("/novaconta", async (req: Request, res: Response) => {
    res.render("novaconta", { title: "twitter clone" });
});

//
// ROTAS POST
//

// Rota /inscrever - cria uma nova conta no aplicativo
router.post("/inscrever", async (req: Request, res: Response) => {
    console.log("Recebido:", req.body);
    const { nome, usuario, email, senha } = req.body;

    try {
        const userExists = await userBD.verificarUsuario(usuario, email);

        if (userExists) {
            return res.status(400).render("erro", {
                message: "Usuário ou email já cadastrados",
                error: {},
            });
        }

        await userBD.cadastrarUsuario(nome, usuario, email, senha);

        res.send("Usuário cadastrado com sucesso");
    } catch (error: any) {
        console.error("❌ Erro ao cadastrar:", error);

        res.status(500).render("erro", {
            message: "Erro ao cadastrar usuário",
            error: error,
        });
    }
});

export default router;
