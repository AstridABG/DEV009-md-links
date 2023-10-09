const data = require('./data.js');

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
              if (options.validate && options.stats) {
                data.linksResponse(links)
                .then((linksSolved) => {
                  const brokenLinks = data.linkValidateStats(linksSolved);
                  let uniqueLinks = data.linksStats(links);
                uniqueLinks.Broken = brokenLinks;
                resolve(uniqueLinks);
                })
              } else if (options.validate){
                let linksStatus = data.linksResponse(links);
                resolve(linksStatus);
              } else if (options.stats) {
                const uniqueLinks = data.linksStats(links);
                resolve(uniqueLinks);
              } else {
                resolve(links);
              }
            } else {
              console.log('Linea 45 No se encontraron links en la ruta', absolutePathSolved);
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
