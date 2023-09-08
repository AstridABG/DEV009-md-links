const data = require('./data.js');
const fileNamePath = process.argv[2];
//const argv2 = process.argv[3];
//console.log('Esto es lo que se escribió en el argumento No. 3.. ' + argv2);

const initialization = (fileNamePath) => {
  if (data.fileExist(fileNamePath)) {
    console.log('La ruta existe y es.. ' + fileNamePath);
    if(data.transformRelativePath(fileNamePath) === false) {
      console.log('la ruta es relativa, convirtiendo en absoluta' + fileNamePath);
    }
    // if(data.validateFileType(fileNamePath)) {
    //   console.log('la extension del archivo es correcta');
    // } else {
    //   console.log('La extension del archivo es incorrecta');
    // }
  } else {
    console.log('La ruta no existe ');
  }
};


initialization(fileNamePath);
module.exports = {initialization,};
