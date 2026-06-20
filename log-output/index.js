const randomHash = Math.random().toString(36).substr(2, 5);

const main = () => {
  console.log(new Date(), randomHash);

  setTimeout(main, 5000);
}


main();