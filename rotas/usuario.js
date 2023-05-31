const express = require("express");
const clienteController = require("../controller/usuario.controller")

const router = express.Router();

//api/clientes
router.get('/',clienteController.listar)
router.get('/:id', clienteController.buscarPorId)
router.post('/',  clienteController.inserir)
router.put('/:id', clienteController.atualizar)
router.delete('/:id', clienteController.deletar)

module.exports = router;