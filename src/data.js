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

const transformRelativePath = (pathName) => {
  const absolutePath = path.resolve(pathName);
  return absolutePath;
};

const validateFileType = (pathName) => {
  const allowedExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt',
   '.mdtext', '.markdown', '.text'];
  const fileExtension = path.extname(pathName);
return allowedExtensions.includes(fileExtension);
};

module.exports = {
  fileExist,
  transformRelativePath,
  validateFileType
};
