const express = require('express');
const fs = require('node:fs');
const app = express();
const port = process.env.PORT || 3000;
let counter = 0;

app.get('/pingpong', (req, res) => {
  counter++;
  res.send(`pong ${counter}`);

  fs.writeFile('/shared/ping-pong.txt', String(counter), err => {
    if (err) {
      console.error(err);
    } else {
      // done!
    }
  });
});

app.listen(port, () => {
  console.log(`Server started in port ${port}`);
});