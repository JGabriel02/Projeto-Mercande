const { Client } = require('pg');

const usuario = new Client({
    user: "postgres",
    password: "140502",
    host: "localhost",
    port: 2235,
    database: "usuarios"
  });

async function listar(){
    try{
    const usuarioConexao = new Client(usuario);
    const sql = "SELECT * FROM usuario";
    usuarioConexao.connect();
    
        const resultado = await usuarioConexao.query(sql);
        usuarioConexao.end();
        return resultado.rows;
    }
    catch(err){
        console.log("Ocorreu um erro inesperado", err);
    }
}

async function buscarPorId(id) {
    try {
        const conexaousuario = new Client(usuario);
        const sql = "SELECT * FROM usuario WHERE id=$1";
        const values = [id];
        conexaousuario.connect();
        const result = await conexaousuario.query(sql,values);
        conexaousuario.end();
        return result.rows[0];
    }
     catch(err){
        console.log("Ocorreu um erro inesperado", err);
    }

}

async function inserir(usuarioz) {
    const usuarioConexao = new Client(usuario);
    const sql = "INSERT INTO usuario(nome, email, senha, saldo) VALUES($1,$2,$3,$4) RETURNING *";
    const values = [usuarioz.nome, usuarioz.email, usuarioz.senha, usuarioz.saldo];
   usuarioConexao.connect();
    try {
        const resultado = await usuarioConexao.query(sql,values);
        //fechar a conexao
        await usuarioConexao.end();
        //trabalhar com o resultado.
        return resultado.rows[0];
    }
    catch(err){
        throw err;
    }
}

async function atualizar(id, usuarioz) {
    const conexaousuario = new Client(usuario);
    const sql = "UPDATE usuario SET nome=$1, email=$2, senha=$3, saldo=$4 WHERE id=$5 ";
    const values = [usuarioz.nome, usuarioz.email, usuarioz.senha, usuarioz.saldo, id];
    conexaousuario.connect();
    try {
        const resultado = await conexaousuario.query(sql,values);
        //fechar a conexao
        conexaousuario.end();
        //trabalhar com o resultado.
        return resultado.rows[0];
    }
    catch(err){
        throw err;
    }
}

async function deletar(id) {
    const cliente = new Client(usuario);
    const sql = "DELETE FROM usuario WHERE id=$1 RETURNING *";
    const values = [id];
    cliente.connect();
    try {
        const resultado = await cliente.query(sql,values);
        //fechar a conexao
        cliente.end();
        //trabalhar com o resultado.
        return resultado.rows[0];
    }
    catch(err){
        console.log("Ocorreu um erro inesperado", err);
    }
}

module.exports = { 
    listar, buscarPorId, inserir, atualizar, deletar
}