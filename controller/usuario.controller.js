const negocio = require("../negocio/usuario_negocio");

async function listar(req, res) {    
    //Obtem os dados request
    //Trata a funcionalidade de negocio
    try{
        console.log("Iniciando conexão...")
        const listaUsuarios = await negocio.listar();
        //Gera o response adequadamente
        console.log(">> Controller")
        res.json(listaUsuarios);  
    } 
    catch(err) {
        console.log("Ocorreu um erro inesperado", err);
        res.status(500).json("Ocorreu um erro inesperado");
    }
}

async function buscarPorId(req, res) {    
    //Obtem os dados request (e da URI)
    const id = req.params.id
    try{ 
        //Trata a funcionalidade de negocio
        const usuario = await negocio.buscarPorId(id);
        //Gera o response adequadamente  
        res.json(usuario);
    }
    catch(err) {
            console.log("Ocorreu um erro inesperado", err);
            res.status(500).json("Ocorreu um erro inesperado");
        }
    }


async function inserir(req, res) {   
    //Obtem os dados request
    const usuario = req.body;
    //Trata a funcionalidade de negocio
    try{ 
        const usuarioInserido = await negocio.inserir(usuario);
        //Gera o response adequadamente  
        res.status(201).json(usuarioInserido);
    } 
    catch (err) {
        if(err.status) {
            res.status(err.status).json(err);
        }
        else {
            res.status(500).json({message: "Erro nao identificado"});
        }
    }
}

async function atualizar(req, res) {    
    //Obtem os dados request
    const id = req.params.id;
    const usuario = req.body;

    //Trata a funcionalidade de negocio
    try{ 
        const usuarioatualizado = await negocio.atualizar(id, usuario);
        //Gera o response adequadamente  
        res.json(usuarioatualizado);
    } 
    catch (err) {
        if(err.status) {
            res.status(err.status).json(err);
        }
        else {
            res.status(500).json({message: "Erro nao identificado"});
        }
    }
}

async function deletar(req, res) {    
    //Obtem os dados request
    const id = req.params.id;
    try{ 
        //Trata a funcionalidade de negocio
        const usuario = await negocio.deletar(id);
        //Gera o response adequadamente  
        res.json(usuario);
    }
    catch(err) {
        if(err.status) {
            res.status(err.status).json(err);
        }
        else {
            res.status(500).json({message: "Erro nao identificado"});
        }
    }
}

module.exports = {
    listar,
    buscarPorId,
    inserir,
    atualizar,
    deletar
}