const fileNamePath = process.argv[2];
const {mdlinks} = require('./mdlinks');


mdlinks(fileNamePath)
  .then((links) => {
    links.forEach((link, index) => {
      console.log(`Contenido del objeto en el índice ${index}:`);
      console.log(`Texto: ${link.text}`);
      console.log(`URL: ${link.url}`);
      console.log(`Ruta: ${link.path}`);
      console.log('');
    });
  })
  .catch((err) => {
    console.error(err);
  });