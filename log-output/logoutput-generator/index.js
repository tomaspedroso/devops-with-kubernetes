const fs = require('node:fs');
const randomHash = Math.random().toString(36).substr(2, 5);

const main = () => {
  const content = `${new Date().toISOString()} ${randomHash}\n`

  fs.writeFile('/shared/current-log.txt', content, err => {
    if (err) {
      console.error(err);
    } else {
      // done!
    }
  });

  setTimeout(main, 5000);
}

main();