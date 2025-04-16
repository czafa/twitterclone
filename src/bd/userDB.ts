import bcrypt from "bcrypt";
import conectarBanco from "./bd";

//função para verificar se um usuario já existe no banco de dados
export async function verificarUsuario(user: string, email: string) {
    const banco = await conectarBanco();
    const sql = "select * from usuarios where usunomeusuario=? or usuemail=?";
    const [usuarios] = await banco.query(sql, [user, email]);

    //retorna true se o usuario já existe, false caso contrário
    return Array.isArray(usuarios) && usuarios.length > 0;
}

// função que grava um novo usuario no banco de dados
export async function cadastrarUsuario(
    nome: string,
    user: string,
    email: string,
    senha: string,
) {
    const banco = await conectarBanco();
    const hashSenha = await bcrypt.hash(senha, 10);
    const sql =
        "insert into usuarios (usunomecompleto, usunomeusuario, usuemail, ususenha) values (?,?,?,?);";
    await banco.execute(sql, [nome, user, email, hashSenha]);
}
