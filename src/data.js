const path = require('path');
const fs = require('fs');

const fileExist = (pathName) => {
  console.log(fs.existsSync(pathName));
  return fs.existsSync(pathName);
};

// const fileExist = (pathName) => {
//   try {
//     fs.statSync(pathName);
//     return true;
//   } catch (err) {
//     console.log(err);
//     if (err.code === 'ENOENT') {
//       return false;
//     }
//   }
// };
const isPathAbsolute = (pathName) => {
  const pathNormalize = path.normalize(pathName);
  console.log(pathNormalize);
  const verifyAbsolutePath = path.isAbsolute(pathName);
  console.log(verifyAbsolutePath);
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
  return fs.readFileSync(absolutePath, 'utf-8');
};

module.exports = {
  fileExist,
  transformRelativePath,
  transformRelativePath2,
  validateFileType,
  isPathAbsolute,
  readFileAbsolutePath
};
