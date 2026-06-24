const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

let todos = [];

app.use(cors());
app.use(express.json());

app.get('/todos', (req, res) => {
  res.send(todos);
});

app.post('/todos', (req, res) => {
  todos.push(req.body.text);
  res.send('New todo added');
});

app.listen(port, () => {
  console.log(`todo-backend app listening on port ${port}`);
});