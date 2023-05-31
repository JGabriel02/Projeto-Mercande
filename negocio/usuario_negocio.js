const persistencia = require("../persistencia/usuario_perisistencia");

async function listar() { 
    try{ 
   
        const listausuario = await persistencia.listar();
        return listausuario;
    }
        catch(err) { throw err; } 
}

async function inserir(usuario) {
    
    if(usuario && usuario.nome && usuario.email && usuario.senha && usuario.saldo) {
        try {
            const usuarioInserido = await persistencia.inserir(usuario);
            return usuarioInserido;
        }
        catch(err) { throw err; }
    }
    else {
        const erro = new Error();
        erro.message = "Falta parametros no usuario";
        erro.status = 400;
        throw erro;
    }

}
async function buscarPorId(id) {
    try{ 
        const usuario = await persistencia.buscarPorId(id);
        if(!usuario) {
            let erro = new Error();
            erro.message = "Nenhum resultado encontrado para o ID fornecido";
            erro.status = 404;
            throw erro;
        }
        return usuario;
    }
    catch(err) { throw err; }
}

async function deletar(id) {
    try{ 
        const usuario = await persistencia.deletar(id);
        if(!usuario) {
            let erro = new Error();
            erro.message = "Nenhum resultado encontrado para o ID fornecido";
            erro.status = 404;
            throw erro;
        }
        return cliente;
    }
    catch(err) { throw err; }
}

async function atualizar(id, novousario) {
    if(novousario && novousario.nome && novousario.email && novousario.senha && novousario.saldo) {
        try {
            const usuarioatualizado = await persistencia.atualizar(id,novousario);
            if(!usuarioatualizado) {
                let erro = new Error();
                erro.message = "Nenhum resultado encontrado para o ID fornecido";
                erro.status = 404;
                throw erro;
            }
            return usuarioatualizado;
        }
        catch(err) { throw err; }
    }
    else {
        const erro = new Error();
        erro.message = "Falta parametros no cliente";
        erro.status = 400;
        throw erro;
    }

}

module.exports = { 
    listar, 
    inserir, 
    buscarPorId, 
    deletar, 
    atualizar
}