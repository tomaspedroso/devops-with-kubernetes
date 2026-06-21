const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const randomHash = Math.random().toString(36).substr(2, 5);

const main = () => {
  console.log(new Date(), randomHash);

  setTimeout(main, 5000);
}

app.get('/status', (req, res) => {
  res.send(`${new Date().toISOString()} ${randomHash}`);
});

app.listen(port, () => {
  console.log(`log-output app listening on port ${port}`);
});

main();


