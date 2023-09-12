const path = require('path');
const fs = require('fs');
const md = require('markdown-it')();

const fileExist = (pathName) => {
  console.log(fs.existsSync(pathName));
  return fs.existsSync(pathName);
};

const isPathAbsolute = (pathName) => {
  console.log('ruta que esta entrando a la funcion es ' + pathName);
  const verifyAbsolutePath = path.isAbsolute(pathName);
  console.log('la ruta absoluta es ' + verifyAbsolutePath);
  return verifyAbsolutePath;
}

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

const readFileAbsolutePath = (absolutePath) => {
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  console.log('el contenido del archivo es ' + fileContent);
  const tokens = md.parse(fileContent, {});
  const links = tokens
    .filter(token => token.type === 'inline')
    .reduce((acc, token) => {
      const linkTokens = token.children.filter(child => child.type === 'link_open');
      const linkHrefs = linkTokens.map(linkToken => linkToken.attrGet('href'));
      console.log('el metodo map obtuvo lo siguiente de nuestro archivo md ' + linkHrefs);
      return [...acc, ...linkHrefs];
    }, []);
  console.log('se obtuvieron los siguientes links ' + links);
  return links;
};

// function extractLinksFromFile(absolutePath) {
//   const fileContent = fs.readFileSync(absolutePath, 'utf8');
//   const tokens = md.parse(fileContent, {});

//   const links = tokens
//     .filter(token => token.type === 'inline')
//     .reduce((acc, token) => {
//       const linkTokens = token.children.filter(child => child.type === 'link_open');
//       const linkHrefs = linkTokens.map(linkToken => linkToken.attrGet('href'));
//       return [...acc, ...linkHrefs];
//     }, []);

//   return links;
// }

module.exports = {
  fileExist,
  transformRelativePath,
  transformRelativePath2,
  validateFileType,
  isPathAbsolute,
  readFileAbsolutePath
};
