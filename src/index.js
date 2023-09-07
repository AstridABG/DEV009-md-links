const utils = require('./utils.js');
const fileNamePath = process.argv[2];
const argv2 = process.argv[3];

//console.log('Esto es lo que se escribió en el argumento No. 3.. ' + argv2);

const init = (filePath) => {
  if(utils.fileExist(filePath)) {
    console.log('La ruta existe y es.. ' + fileNamePath);

  } else {
    console.log('La ruta no existe ');

  }
}
init(fileNamePath);
module.exports = init;