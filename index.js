#!/usr/bin/env node
const {mdlinks} = require('./src/mdlinks');
const fileNamePath = process.argv[2];
const option1 = process.argv[3];
const option2 = process.argv[4];
const options = {
  validate: option1 === '--validate' || option2 === '--validate' ? true : false,
  stats: option2 === '--stats' || option1 === '--stats' ? true : false
};

mdlinks(fileNamePath, options)
  .then((resolve) => {
    console.log(resolve);
  })
  .catch((error) => {
    console.error(error);
  });