const path = require('path');
const fs = require('fs');
const { callbackify } = require('util');
const { error } = require('console');
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

const readFileContent = (absolutePath) => {
  return fs.readFile(absolutePath, 'utf-8', (err, data) => {
    if (err) {
      throw err
    } else { 
      console.log('esto se esta ejecutando en la declaracion de la funcion ' + data);
    }
  })
};
  
const readFileAbsolutePath = (absolutePath) => {
  const fileContent = fs.readFileSync(absolutePath);
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

const readFileAbsolutePath2 =  async (absolutePath) => {
  let links = '';
  let arrayOfLinks = [];

  let linksAux = await fs.readFile(absolutePath, 'utf-8', (err, fileContent) => {
    if (err) {
      throw err;
    } 
  const tokens = md.parse(fileContent, {});
   links = tokens
    .filter(token => token.type === 'inline')
    .reduce((acc, token) => {
      const linkTokens = token.children.filter(child => child.type === 'link_open');
      const linkHrefs = linkTokens.map(linkToken => linkToken.attrGet('href'));
      arrayOfLinks.push(...linkHrefs);
      console.log(arrayOfLinks.length);
      return arrayOfLinks;
      //return [...acc, ...linkHrefs];
    }, []);
    // console.log('elarreglo de links es ' + arrayOfLinks);
  //console.log('se obtuvieron los siguientes links ' + links);
  });
  // console.log('elarreglo de links es ' + linksAux);
  
  return arrayOfLinks;
};


module.exports = {
  fileExist,
  transformRelativePath,
  transformRelativePath2,
  validateFileType,
  isPathAbsolute,
  readFileAbsolutePath,
  readFileAbsolutePath2,
  readFileContent
}
