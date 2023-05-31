const express = require('express');
const app = express();
const port = process.env.port || 8082;
app.use(express.json())

const usuarioRota = require('./rotas/usuario')
const loginRota = require('./rotas/login')
app.use(express.urlencoded({extended:true}));

app.listen(port, () => {
    console.log(`Servidor: http://localhost:${port}`)
})


app.use("/usuario/login", loginRota);
app.use("/usuarios", usuarioRota);
const authMiddleware = require('./middleware/auth_middleware')
app.use(authMiddleware.verificarToken);




  
 
  