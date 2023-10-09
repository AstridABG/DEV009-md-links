const data = require('../src/data');
const path = require('node:path');

describe('isFile', () => {
  const filePath = 'C:\\Users\\LNAnd\\Documents\\Ejercicio-MDLinks\\DEV009-md-links\\docs\\textoprueba.md';
  const dirPath = 'C:\\Users\\LNAnd\\Documents\\Ejercicio-MDLinks\\DEV009-md-links\\docs';
  it('should return true if the path is a file', () => { 
    expect(data.isFile(filePath)).toBe(true);
 });
 it('should return false if the path is a directory', () => {
    expect(data.isFile(dirPath)).toBe(false);
 });
});

describe('isDirectory', () => {
  const filePath = 'C:\\Users\\LNAnd\\Documents\\Ejercicio-MDLinks\\DEV009-md-links\\docs\\textoprueba.md';
  const dirPath = 'C:\\Users\\LNAnd\\Documents\\Ejercicio-MDLinks\\DEV009-md-links\\docs';
  it('should return true if the path is a directory', () => { 
    expect(data.isDirectory(dirPath)).toBe(true);
 });

 it('should return false if the path is a file', () => {
    expect(data.isDirectory(filePath)).toBe(false);
 });
});

describe('readDir', () => {
  
  it('should return an array of markdown files', () => {
    const dirPath = 'C:\\Users\\LNAnd\\Documents\\Ejercicio-MDLinks\\DEV009-md-links\\docs';
    const mdFiles = data.readDir(dirPath);
    expect(mdFiles).toEqual(['textoprueba.md']);
    
  });
   it('should throw an error if the directory does not exist', () => {
    const dirPath = 'C:\\Users\\LNAnd\\Documents\\Ejercicio-MDLinks\\DEV009-md-links\\test\\nonExistentDir'
  expect(() => data.readDir(dirPath)).toThrowError();
   });
});

describe('extractContentFromDirectoryOrFile', () => {
  it('should throw an error if the file or directory does not exist', () => {
    const fileNamePath = path.join(__dirname, 'nonExistentFileOrDir');
    expect(() => data.extractContentFromDirectoryOrFile(fileNamePath)).toThrowError();
  });
  it('should return an array of strings if the file or directory is readable', () => {
    const fileNamePath = 'C://Users//LNAnd//Documents//Ejercicio-MDLinks//DEV009-md-links//docs/';
    const expectedResult = ['C://Users//LNAnd//Documents//Ejercicio-MDLinks//DEV009-md-links//docs//textoprueba.md'];
    return data.extractContentFromDirectoryOrFile(fileNamePath).then((result) => {
      expect(result).toEqual(expectedResult);
    });
  });
  it('should return an array of strings if the file path is a file', () => {
    const filePath = 'docs\\testFiles\\textoprueba2.md';
    const expectedResult = ['C:\\Users\\LNAnd\\Documents\\Ejercicio-MDLinks\\DEV009-md-links\\docs\\testFiles\\textoprueba2.md'];
    return data.extractContentFromDirectoryOrFile(filePath).then(result => {
      expect(result).toEqual(expectedResult);
  })
  });
});
