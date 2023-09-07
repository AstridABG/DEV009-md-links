const path = require('path');
const fs = require('fs');

const fileExist = (pathName) => {
  try {
fs.statSync(pathName);
return true;
  } catch(err) {
    console.log(err);
  if(err.code === 'ENOENT') {
    return false;
  }
  }
}
module.exports = {
    fileExist,
}