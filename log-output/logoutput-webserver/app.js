const express = require('express');
const fs = require('node:fs');
const app = express();
const port = process.env.PORT || 3000;

app.get('/logs', async (req, res) => {
  try {
    const [logData, pingData] = await Promise.all([
      fs.promises.readFile('/shared/current-log.txt', 'utf8'),
      fetch(`${process.env.PING_PONG_URL}/pings`).then(r => r.text()),
    ]);

    res.send(`<pre>${logData}Ping / Pongs: ${pingData}</pre>`)
  } catch (err) {
    console.error(err);
    res.status(500).send('Error reading files');
  }
});

app.listen(port, () => {
  console.log(`logoutput-webserver listening on port ${port}`);
});