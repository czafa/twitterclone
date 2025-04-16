import mysql from "mysql2/promise";

const bdConfig = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Oiac29198437!",
    database: "twitter_clone",
};

let connection: mysql.Connection | null = null;

//função para conectar com o banco de dados e retornar a conexão
export async function conectarBanco() {
    if (!connection) {
        connection = await mysql.createConnection(bdConfig);
        console.log("Conectado ao banco de dados");
    }
    return connection;
}

export default conectarBanco;
