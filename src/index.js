const fileNamePath = process.argv[2];
const {mdlinks} = require('./mdlinks');

mdlinks(fileNamePath)
  .then((resolve) => {
    console.log(resolve);
  })
  .catch((error) => {
    console.error(error);
  });