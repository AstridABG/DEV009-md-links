const data = require('./data.js');
const fileNamePath = process.argv[2];
const option1 = process.argv[3];
const option2 = process.argv[4];
const options = {
  validate: option1 === '--validate' || option2 === '--validate' ? true : false,
  stats: option2 === '--stats' || option1 === '--stats' ? true : false
}
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
        const pruebagetLinks = data.addPathToLinks(data.getLinksFromFile(fileContent), absolutePathSolved); //esta es la funcion que imprime los objetos dentro del arreglo
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
mdlinks(fileNamePath, options);
module.exports = {initialization, mdlinks};
