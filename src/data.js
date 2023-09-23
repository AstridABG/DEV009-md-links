const path = require('node:path');
const fs = require('node:fs');
const fsProm = require('fs').promises;
const md = require('markdown-it')();
const axios = require('axios');

const fileExist = (pathName) => {
  console.log(fs.existsSync(pathName));
  return fs.existsSync(pathName);
};

const isPathAbsolute = (pathName) => {
  //console.log('ruta que esta entrando a la funcion es ' + pathName);
  const verifyAbsolutePath = path.isAbsolute(pathName);
  //console.log('la ruta absoluta es ' + verifyAbsolutePath);
  return verifyAbsolutePath;
};

const transformRelativePath = (pathName) => {
  const absolutePath = path.resolve(pathName);
  return absolutePath;
};

//segunda opcion para transformar ruta relativa en absoluta
const transformRelativePath2 = (pathName) => {
  return path.join(__dirname, pathName);
}

const validateFileType = (pathName) => {
  const allowedExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt',
    '.mdtext', '.markdown', '.text'];
  const fileExtension = path.extname(pathName);
  return allowedExtensions.includes(fileExtension);
};

const readFileAbsolutePath = async (absolutePath) => {
  let fileContent = '';
  try {
    fileContent = await fsProm.readFile(absolutePath, 'utf-8');
    return fileContent
  } catch (err) {
    console.log(err.message);
  }
};

const getLinksFromFile = (fileContent) => {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links = [];
  let match;
  while ((match = linkRegex.exec(fileContent))) {
    const linkText = match[1];
    const linkUrl = match[2];
    links.push({ text: linkText, url: linkUrl });
  }
  return links;
};

const addPathToLinks = (links, absolutePath) => {
  return links.map((link) => {
    return { ...link, file: absolutePath };
  });
};

const linksResponse = (links) => {
  const verifyLinks = links.map(link => {
    return axios.get(link.url)
      .then(response => {
        link.status = response.status;
        link.info = 'valid';
        return link;
      })
      .catch(error => {
        if (error.code === 'ENOTFOUND') {
          link.status = 404;
          link.info = 'broken';
          return link;
        } else {
          link.status = error.code;
          link.info = 'broken';
          return link;
        }
      })
  })
  return Promise.all(verifyLinks);
};

/* --------------------Panteon de las funciones no utilizadas------------------- */
// const printDataFromFile = (links, absolutePath) => {
//   links.forEach(link => {
//     links.push('texto de la liga :' + links);
//     console.log('href: ' + link.url);
//     console.log('text: ' + link.text);
//     console.log('file: ' + absolutePath);
//     console.log('');
//     })
//   };

// const getLinksFromFile = (fileContent) => {
//   let links = '';
//   let arrayOfLinks = [];
//   let linkTextsArray = [];
//   const tokens = md.parse(fileContent, {});
//  links = tokens
//   .filter(token => token.type === 'inline')
//   .reduce((acc, token) => {
//     const linkTokens = token.children.filter(child => child.type === 'link_open');
//     const linkHrefs = linkTokens.map(linkToken => linkToken.attrGet('href'));
//     const linkTexts = linkTokens.map(linkToken => {
//       const findText = /\[(.*?)\]/g;
//       const match = fileContent.match(findText);
//       return match ;
//     })
//     linkTextsArray.push(...linkTexts);
//     //console.log('Lo que se encuentra dentro de la funcion linkTexts es ' + linkTexts);
//     arrayOfLinks.push(...linkHrefs);
//     return arrayOfLinks;
//   }, []);
//   const arrayOfText = linkTextsArray.filter(function(item, pos, self) {
//     return self.indexOf(item) == pos;
// });
// console.log(linkTextsArray.length);
// console.log('se obtuvieron los siguientes links ' + arrayOfText[0]);
//   return links;
// };

// const getArrayOfLinksContent = (links) => {
//   let arrayOfLinksContent = []
// links.forEach(link => {
//   arrayOfLinksContent.push('texto de la liga :' + link);
// })
// return arrayOfLinksContent;
// };

// const addPathToLinksAndLinkStatus = async (links, absolutePath) => {
//   try {
//     const responses = await axios.all(links.map((link) => axios.get(link.url)));
//     return links.map((link, index) => {
//       return { ...link, file: absolutePath, status: responses[index].status };
//     });
//   } catch (error) {
//     // Este código se ejecutará si la promesa se rechaza.
//     const responses = await axios.all(links.map((link) => axios.get(link.url)));
//     return links.map((link, index) => {
//       return { ...link, file: absolutePath, status: responses[index].status };
//     });
//     //console.error('se encontro el siguiente error' + error);
//   }
// };


// let arrayLinks = await Promise.all(links.map(async (link) => {
//   console.log(link.url.value());
//   const jsonLink = JSON.parse(link); 
//   console.log(jsonLink);
//   const linksTocheck = link.url;
//   console.log(linksTocheck);
//   return await fetch(linksTocheck).then((resp) => {
//     return { ...link, file: absolutePath, status: resp.status };
//   }).catch((error) => {
//     console.log(link.url);
//     return { ...link, file: absolutePath, status: error.code };
//   });
// }))


module.exports = {
  fileExist,
  transformRelativePath,
  transformRelativePath2,
  validateFileType,
  isPathAbsolute,
  readFileAbsolutePath,
  getLinksFromFile,
  addPathToLinks,
  linksResponse
}
