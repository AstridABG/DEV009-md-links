const data = require('./data.js');
const fileNamePath = process.argv[2];
const argv2 = process.argv[3];
const argv3 = process.argv[4];
//console.log('Esto es lo que se escribió en el argumento No. 3.. ' + argv2);

const initialization = (fileNamePath) => {
  let absolutePath = "";
  if (data.isPathAbsolute(fileNamePath)) {
    absolutePath = fileNamePath;
    console.log('La ruta es absoluta ' + absolutePath);
  } else {
    absolutePath = data.transformRelativePath(fileNamePath);
    console.log('la ruta es relativa, transformando en ' + absolutePath);
  }
  if (data.fileExist(absolutePath)) {
    console.log('La ruta existe y es.. ' + absolutePath);
    if (data.validateFileType(absolutePath)) {
      console.log('la extension del archivo es correcta');
      const fileContent = data.readFileContent(absolutePath);
      console.log('el archivo contiene la siguiente informacion ' + fileContent);
    } else {
      console.log('La extension del archivo es incorrecta');
    }
  } else {
    console.log('La ruta no existe ');
  }
};
initialization(fileNamePath);

module.exports = {initialization};
