const {mdlinks} = require('./mdlinks');


mdlinks(fileNamePath)
  .then((links) => {
    console.log('La promesa se resolvió correctamente y devolvio los siguientes links' + links);
  })
  .catch((err) => {
    console.log('La promesa se rechazó con el siguiente error: ' + err.message);
  });