const express = require('express');
const fs = require('node:fs');
const app = express();
const port = process.env.PORT || 3000;

app.get('/logs', (req, res) => {
  fs.readFile('/shared/logs.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(`<pre>${data}</pre>`);
  });
});

app.listen(port, () => {
  console.log(`logoutput-webserver listening on port ${port}`);
});




