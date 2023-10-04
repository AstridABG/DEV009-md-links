const data = require('./data.js');
const fileNamePath = process.argv[2];
const option1 = process.argv[3];
const option2 = process.argv[4];
const options = {
  validate: option1 === '--validate' || option2 === '--validate' ? true : false,
  stats: option2 === '--stats' || option1 === '--stats' ? true : false
};

const mdlinks = (fileNamePath, options) => { 
  let absolutePathSolved = [];

  return new Promise((resolve, reject) => {
    data.extractContentFromDirectoryOrFile(fileNamePath)
      .then((absolutePath) => {
        absolutePathSolved = absolutePath;
        let promises = [];

        for (let i = 0; i < absolutePathSolved.length; i++) {
          promises.push(data.readFileAbsolutePath(absolutePathSolved[i]));
        }

        Promise.all(promises)
          .then((fileContents) => {
            let links = [];
            fileContents.forEach((fileContent, index) => {
              const absolutePath = absolutePathSolved[index];
              const pathLinks = data.getLinksFromFile(fileContent);
              const linksWithPath = data.addPathToLinks(pathLinks, absolutePath);

              links.push(...linksWithPath);
            });

            if (links.length > 0) {
              if (options.validate) {
                console.log('si se introdujo validate');
                let linksStatus = data.linksResponse(links);
                resolve(linksStatus);
              } else if (options.validate && options.stats){
                console.log('pusiste las dos opciones en cualquier orden para el analisis de links');
              } else if (options.stats) {
                console.log('pusiste la opcion stats para el analisis de los links');
              } else {
                console.log('No elegiste ninguna opcion solo obtendras los links en el directorio');
                resolve(links);
              }
            } else {
              console.log('No se encontraron links en la ruta', absolutePathSolved);
            } 
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};


//comentar la siguiente linea para que no se repita el initialize
//mdlinks(fileNamePath, options);
module.exports = {mdlinks};
