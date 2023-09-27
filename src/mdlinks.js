const data = require('./data.js');
const fileNamePath = process.argv[2];
/* ------Funcion que da como resultado una ruta valida-------  */
const initialization = async (fileNamePath) => {
  let absolutePath = "";
  console.log("Se encontraron los siguientes archivos md en la carpeta seleccionada" + data.readDir(fileNamePath));
  if (data.isPathAbsolute(fileNamePath)) {
    absolutePath = fileNamePath;
    console.log('La ruta absoluta es... ' + absolutePath);
  } else {
    absolutePath = data.transformRelativePath(fileNamePath);
    console.log('la ruta es relativa, transformando en ' + absolutePath);
  }
  if (data.fileExist(absolutePath)) {
    console.log('La ruta existe y es.. ' + absolutePath);
    if (data.validateFileType(absolutePath)) {
      console.log('la extension del archivo es correcta');
    } else {
      console.log('La extension del archivo es incorrecta');
    }
  } else {
    console.log('La ruta no existe ');
  }
  return absolutePath;
};


const mdlinks = (fileNamePath, options) => { 
let absolutePathSolved = '';
  return new Promise((resolve, reject) => {
    initialization(fileNamePath)
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
initialization(fileNamePath);
module.exports = {initialization, mdlinks};
