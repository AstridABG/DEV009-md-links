const data = require('./data.js');

const mdlinks = (fileNamePath, options) => { 
let absolutePathSolved = '';
  return new Promise((resolve, reject) => {
    data.extractContentFromDirectoryOrFile(fileNamePath)
      .then((absolutePath) => {
        absolutePathSolved = absolutePath;
        return data.readFileAbsolutePath(absolutePath);
      })
      .then((fileContent) => {
        const pruebaGetLinks = data.addPathToLinks(data.getLinksFromFile(fileContent), absolutePathSolved); //esta es la funcion que imprime los objetos dentro del arreglo
        if (pruebaGetLinks.length === 0){
          console.log('El archivo que intentas analizar no contiene links')
        } else {
          if(options.validate) {
            const linksStatus = data.linksResponse(pruebaGetLinks);
            resolve(linksStatus);
          } else {
            resolve(pruebaGetLinks);
          }
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//comentar la siguiente linea para que no se repita el initialize
//mdlinks(fileNamePath, options);
module.exports = {mdlinks};
