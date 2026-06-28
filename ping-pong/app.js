const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const initDb = async () => {
  await pool.query('CREATE TABLE IF NOT EXISTS counter (count INTEGER NOT NULL DEFAULT 0)');
  await pool.query('INSERT INTO counter SELECT 0 WHERE NOT EXISTS (SELECT 1 FROM counter)');
};

app.get('/pingpong', async (req, res) => {
  const result = await pool.query('UPDATE counter SET count = count + 1 RETURNING count');
  res.send(`pong ${result.rows[0].count}`);
});

app.get('/pings', async (req, res) => {
  const result = await pool.query('SELECT count FROM counter');
  res.send(String(result.rows[0]?.count ?? 0));
});

initDb().then(() => {
  app.listen(port, () => {
    console.log(`Server started in port ${port}`);
  });
});
