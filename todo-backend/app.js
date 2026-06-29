const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3001;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const initDb = async () => {
  await pool.query('CREATE TABLE IF NOT EXISTS todos (id SERIAL PRIMARY KEY, text TEXT NOT NULL)');
};

app.use(cors());
app.use(express.json());

app.get('/todos', async (req, res) => {
  const result = await pool.query('SELECT text FROM todos ORDER BY id');
  res.send(result.rows.map(r => r.text));
});

app.post('/todos', async (req, res) => {
  const text = req.body.text?.trim();
  if (!text) {
    return res.status(400).send('Todo text cannot be empty');
  }

  await pool.query('INSERT INTO todos (text) VALUES ($1)', [text]);
  res.send('New todo added');
});

initDb().then(() => {
  app.listen(port, () => {
    console.log(`todo-backend app listening on port ${port}`);
  });
});
