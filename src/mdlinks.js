const data = require('./data.js');
const fileNamePath = process.argv[2];
const argv2 = process.argv[3];
const argv3 = process.argv[4];
//console.log('Esto es lo que se escribió en el argumento No. 3.. ' + argv2);
/* ------Funcion que da como resultado una ruta valida-------  */
const initialization = async (fileNamePath) => {
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
      // const pruebaForEach = data.getArrayOfLinksContent(fileContent);
      // console.log('prueba forEach' + pruebaForEach);
      // console.log('el archivo contiene la siguiente informacion ' + fileContent);
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
        const pruebagetLinks = data.addPathToLinks(data.getLinksFromFile(fileContent), absolutePathSolved); //esta es la funcion que imprime los objetos dentro del arreglo
        resolve(pruebagetLinks);
      })
      .catch((err) => {
        reject(err);
      });
  });
};


// const mdlinks = async (fileNamePath) => {
// const absolutePath = await initialization(fileNamePath);
// const fileContent = await data.readFileAbsolutePath(absolutePath);
// const pruebaForEach = data.getArrayOfLinksContent(fileContent);
// console.log('prueba forEach' + pruebaForEach);
// console.log('el archivo contiene la siguiente informacion ' + fileContent);
// }
mdlinks(fileNamePath);
module.exports = {initialization, mdlinks};
