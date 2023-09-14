const path = require('node:path');
const fs = require('node:fs');
const fsProm = require('fs').promises;
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

const readFileAbsolutePath =  async (absolutePath) => {
  let links = '';
  let arrayOfLinks = [];
  let fileContent = '';
try {
  fileContent = await fsProm.readFile(absolutePath, 'utf-8', (err, insideFile) => { });
} catch (err) {
  console.log(err.message);
}
const tokens = md.parse(fileContent, {});
 links = tokens
  .filter(token => token.type === 'inline')
  .reduce((acc, token) => {
    const linkTokens = token.children.filter(child => child.type === 'link_open');
    const linkHrefs = linkTokens.map(linkToken => linkToken.attrGet('href'));
    arrayOfLinks.push(...linkHrefs);
    return arrayOfLinks;
  }, []);
console.log('se obtuvieron los siguientes links ' + links);
  return links;
};

const getArrayOfLinksContent = (links) => {
  let arrayOfLinksContent = []
links.forEach(link => {
  arrayOfLinksContent.push('texto de la liga :' + link);
})
return arrayOfLinksContent;
};

module.exports = {
  fileExist,
  transformRelativePath,
  transformRelativePath2,
  validateFileType,
  isPathAbsolute,
  readFileAbsolutePath,
  getArrayOfLinksContent,
}
