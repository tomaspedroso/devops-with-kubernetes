const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  updateImage();
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server started in port ${port}`);
});

const updateImage = async () => {
  if (fs.existsSync('./public/assets/image.jpg')) {
    const { mtimeMs } = fs.statSync('./public/assets/image.jpg');
    if (Date.now() - mtimeMs < 10 * 60 * 1000) return;
  }

  try {
    const response = await fetch(process.env.PICSUM_URL);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync('./public/assets/image.jpg', Buffer.from(buffer));
  } catch (err) {
    console.error('Failed to update image:', err);
  }
};