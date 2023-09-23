const data = require('./data.js');
const fileNamePath = process.argv[2];
const param4 = process.argv[3];
const param5 = process.argv[4];
//console.log('Esto es lo que se escribió en el argumento No. 3.. ' + argv2);
/* ------Funcion que da como resultado una ruta valida-------  */
const initialization = async (fileNamePath) => {
  if(param4 === 'validate') {
    console.log('se van a validar que las url respondan');
  } else {
    console.log('No se escribio el 4to parametro');
  }
  let absolutePath = "";
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
      // const fileContent = await data.readFileAbsolutePath(absolutePath);
    } else {
      console.log('La extension del archivo es incorrecta');
    }
  } else {
    console.log('La ruta no existe ');
  }
  return absolutePath;
};


const mdlinks = (fileNamePath) => { 
let absolutePathSolved = '';
  return new Promise((resolve, reject) => {
    initialization(fileNamePath)
      .then((absolutePath) => {
        absolutePathSolved = absolutePath;
        return data.readFileAbsolutePath(absolutePath);
      })
      .then((fileContent) => {
        const pruebagetLinks = data.addPathToLinksAndLinkStatus(data.getLinksFromFile(fileContent), absolutePathSolved); //esta es la funcion que imprime los objetos dentro del arreglo
        return pruebagetLinks;
      })
      .then((links) => {
        const linksStatus = data.linksResponse(links);
        resolve(linksStatus);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//comentar la siguiente linea para que no se repita el initialize
mdlinks(fileNamePath, param4);
module.exports = {initialization, mdlinks};
