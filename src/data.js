const path = require('path');
const fs = require('fs');

const fileExist = (pathName) => {
  try {
    fs.statSync(pathName);
    return true;
  } catch (err) {
    console.log(err);
    if (err.code === 'ENOENT') {
      return false;
    }
  }
}

const validateFileType = (pathName) => {
  const allowedExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt',
   '.mdtext', '.markdown', '.text'];
  const fileExtension = path.extname(pathName);
return allowedExtensions.includes(fileExtension);

};

module.exports = {
  fileExist,
  validateFileType
};
