const path = require('node:path');
const fs = require('node:fs');
const fsProm = require('fs').promises;
const axios = require('axios');

const fileExist = (pathName) => {
  return fs.existsSync(pathName);
};

const isPathAbsolute = (pathName) => {
  const verifyAbsolutePath = path.isAbsolute(pathName);
  return verifyAbsolutePath;
};

const transformRelativePath = (pathName) => {
  const absolutePath = path.resolve(pathName);
  return absolutePath;
};

const validateFileType = (pathName) => {
  const allowedExtensions = ['.md'];
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
    return err.message;
  }
};

const getLinksFromFile = (fileContent) => {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links = [];
  let match;
  while ((match = linkRegex.exec(fileContent))) {
    const linkText = match[1];
    const linkUrl = match[2];
    if (linkUrl.startsWith('http')) {
      links.push({ text: linkText, url: linkUrl });
    }
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
        link.info = 'ok';
        return link;
      })
      .catch(error => {
        if (error.code === 'ENOTFOUND') {
          link.status = 404;
          link.info = 'fail';
          return link;
        } else {
          link.status = error.code;
          link.info = 'fail';
          return link;
        }
      })
  })
  return Promise.all(verifyLinks);
};

const isFile = (pathName) => {
  const stats = fs.lstatSync(pathName);
  return stats.isFile();
};
const isDirectory = (pathName) => {
  const stats = fs.lstatSync(pathName);
  return stats.isDirectory();
};

const filterMdFiles = (files) => {
  const mdFiles = [];
  files.forEach(file => {
    if (path.extname(file) === ".md") {
      mdFiles.push(file);
    }
  });
  return mdFiles;
};

const readDir = (pathName) => {
  const files = fs.readdirSync(pathName);
  const mdFiles = filterMdFiles(files);
  return mdFiles;
};


const initialization = (fileNamePath) => {
  return new Promise((resolve, reject) => {
    let absolutePath = [];
    if (isPathAbsolute(fileNamePath)) {
      absolutePath = fileNamePath;
    } else {
      absolutePath = transformRelativePath(fileNamePath);
    }
    if (fileExist(absolutePath)) {
      if (validateFileType(absolutePath)) {
        resolve(absolutePath);
      } else {
        reject('La extension del archivo es incorrecta');
      }
    } else {
      reject('La ruta no existe ');
    }
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  })
};

const extractContentFromDirectoryOrFile = (fileNamePath) => {
  if (isDirectory(fileNamePath)) {
    const dirContent = readDir(fileNamePath);
    const arrayOfFiles = dirContent.map((file) => {
      return initialization(fileNamePath + '/' + file)
        .then((initializationResult) => {
          return initializationResult;
        })
        .catch((error) => {
          console.log('Error occurred:', error);
        });
    });
    return Promise.all(arrayOfFiles)
      .then((results) => {
        return results;
      })
      .catch((error) => {
        console.error('Promise rejected:', error);
      });
  } else if (isFile(fileNamePath)) {
    return initialization(fileNamePath)
      .then((initializationResult) => {
        const stringToArray = initializationResult.split( );
        return stringToArray;
      })
      .catch((error) => {
        console.log('Error occurred:', error);
      });
  }
};

const linksStats = (links) => {
  let unique = [];
  const verifyLinks = links.map(link => {
    if (!unique.includes(link.url)){
      unique.push(link.url);
    }
  })
  const statsResult = { Total: verifyLinks.length, Unique: unique.length };
  return statsResult;
};

const linkValidateStats = (links) => {
  let broken = 0;
  links.forEach(link => {
    if (link.info === 'fail'){
     broken++;
    }
  })
  return broken;
};

module.exports = {
  fileExist,
  transformRelativePath,
  validateFileType,
  isPathAbsolute,
  readFileAbsolutePath,
  getLinksFromFile,
  addPathToLinks,
  linksResponse,
  readDir,
  isFile,
  isDirectory,
  initialization,
  extractContentFromDirectoryOrFile,
  linksStats,
  linkValidateStats
}
