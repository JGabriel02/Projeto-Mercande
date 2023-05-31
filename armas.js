const express = require('express');
const app = express();
const { Client } = require('pg');

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send("Olá, estranho!");
});

// GET - Ler uma arma pelo ID
app.get('/armas/:id', async (req, res) => {
  const getId = req.params.id;
  const armas = new Client({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "teste"
  });

  try {
    if (isNaN(getId)) {
      res.status(400).send("O ID fornecido deve ser um número");
      return;
    }

    console.log("Iniciando conexão...");
    await armas.connect();
    console.log("Conexão estabelecida com o banco de dados");

    const sql = `SELECT nome AS "Nome", dano AS "Dano", capacidade AS "Capacidade", sreload AS "Velocidade de Recarga", cadencia AS "Cadência", precisao AS "Precisão", valor AS "Valor" FROM armas WHERE id = ${getId}`;
    const result = await armas.query(sql);
    const data = result.rows;

    if (data.length === 0) {
      res.status(404).send("Nenhum resultado encontrado para o ID fornecido");
    } else {
      data.forEach(item => {
        const line = `Nome: ${item.Nome}, Dano: ${item.Dano}, Capacidade: ${item.Capacidade}, Velocidade de Recarga: ${item["Velocidade de Recarga"]}, Cadência: ${item.Cadência}, Precisão: ${item.Precisão}, Valor: ${item.Valor}`;
        res.write(line + "\n");
      });
      res.end();
    }
  } catch (err) {
    console.log("Ocorreu um erro inesperado", err);
    res.status(500).send("Ocorreu um erro inesperado");
  } finally {
    await armas.end();
    console.log("Conexão encerrada com o banco de dados");
  }
});

// POST - Criar uma nova arma
app.post('/armas', async (req, res) => {
  const { nome, dano, capacidade, sreload, cadencia, precisao, valor } = req.body;

  const armas = new Client({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "teste"
  });

  try {
    console.log("Iniciando conexão...");
    await armas.connect();
    console.log("Conexão estabelecida com o banco de dados");

    // Consulta para obter a última id existente e incrementar para a nova id
    const getLastIdSql = `SELECT MAX(id) FROM armas`;
    const lastIdResult = await armas.query(getLastIdSql);
    const lastId = lastIdResult.rows[0].max || 0;
    const newId = lastId + 1;

    // Inserir a nova arma com a nova id
    const insertSql = `INSERT INTO armas (id, nome, dano, capacidade, sreload, cadencia, precisao, valor) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    const insertValues = [newId, nome, dano, capacidade, sreload, cadencia, precisao, valor];
    await armas.query(insertSql, insertValues);

    res.status(201).send("Arma adicionada com sucesso");
  } catch (err) {
    console.log("Ocorreu um erro inesperado", err);
    res.status(500).send("Ocorreu um erro inesperado");
  } finally {
    await armas.end();
    console.log("Conexão encerrada com o banco de dados");
  }
});

// PUT - Atualizar uma arma pelo ID
app.put('/armas/:id', async (req, res) => {
  const getId = req.params.id;
  const { nome, dano, capacidade, sreload, cadencia, precisao, valor } = req.body;

  const armas = new Client({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "teste"
  });

  try {
    if (isNaN(getId)) {
      res.status(400).send("O ID fornecido deve ser um número");
      return;
    }

    console.log("Iniciando conexão...");
    await armas.connect();
    console.log("Conexão estabelecida com o banco de dados");

    // Verificar se a ID existe
    const checkIdSql = `SELECT id FROM armas WHERE id = $1`;
    const checkIdValues = [getId];
    const checkIdResult = await armas.query(checkIdSql, checkIdValues);
    const existingId = checkIdResult.rows.length > 0;

    if (!existingId) {
      res.status(404).send("Nenhum resultado encontrado para o ID fornecido");
      return;
    }

    // Atualizar os dados da arma
    const updateSql = `UPDATE armas SET nome = $2, dano = $3, capacidade = $4, sreload = $5, cadencia = $6, precisao = $7, valor = $8 WHERE id = $1`;
    const updateValues = [getId, nome, dano, capacidade, sreload, cadencia, precisao, valor];
    await armas.query(updateSql, updateValues);

    res.status(200).send("Arma atualizada com sucesso");
  } catch (err) {
    console.log("Ocorreu um erro inesperado", err);
    res.status(500).send("Ocorreu um erro inesperado");
  } finally {
    await armas.end();
    console.log("Conexão encerrada com o banco de dados");
  }
});
// DELETE - Excluir uma arma pelo ID
app.delete('/armas/:id', async (req, res) => {
  const getId = req.params.id;

  const armas = new Client({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "teste"
  });

  try {
    if (isNaN(getId)) {
      res.status(400).send("O ID fornecido deve ser um número");
      return;
    }

    console.log("Iniciando conexão...");
    await armas.connect();
    console.log("Conexão estabelecida com o banco de dados");

    // Verificar se a ID existe
    const checkIdSql = `SELECT id FROM armas WHERE id = $1`;
    const checkIdValues = [getId];
    const checkIdResult = await armas.query(checkIdSql, checkIdValues);
    const existingId = checkIdResult.rows.length > 0;

    if (!existingId) {
      res.status(404).send("Nenhum resultado encontrado para o ID fornecido");
      return;
    }

    // Excluir a arma
    const deleteSql = `DELETE FROM armas WHERE id = $1`;
    const deleteValues = [getId];
    await armas.query(deleteSql, deleteValues);

    res.status(200).send("Arma excluída com sucesso");
  } catch (err) {
    console.log("Ocorreu um erro inesperado", err);
    res.status(500).send("Ocorreu um erro inesperado");
  } finally {
    await armas.end();
    console.log("Conexão encerrada com o banco de dados");
  }
});

app.listen(8082, () => {
  console.log("Servidor rodando na url https://localhost:8082");
});
