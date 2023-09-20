const data = require('../src/data');
const fs = require('fs');
//const fsProm = require('fs').promises;

describe('fileExist', () => {
  beforeAll(() => {
    // Crear un archivo de prueba antes de ejecutar los tests
    fs.writeFileSync('test.txt', 'Hola, mundo!');
  });
  afterAll(() => {
    // Eliminar el archivo de prueba después de ejecutar los tests
    fs.unlinkSync('test.txt');
  });
  it('debería devolver true si el archivo existe', () => {
    expect(data.fileExist('test.txt')).toBe(true);
  });

  it('debería devolver false si el archivo no existe', () => {
    expect(data.fileExist('noexiste.txt')).toBe(false);
  });
});

describe('isPathAbsolute', () => {
const relativePath = '../docs/textoprueba.md';
const absolutePath = 'C:\\Users\\LNAnd\\Documents\\Ejercicio-MDLinks\\DEV009-md-links\\docs\\textosinLinks.md';
const absolutePath2 = 'C:/Users/LNAnd/Documents/Ejercicio-MDLinks/DEV009-md-links/docs/textosinLinks.md';
  it('Debe retornar true si la ruta es absoluta', () => {
    expect(data.isPathAbsolute(absolutePath)).toBe(true);
  });
  it('Debe retornar true si la ruta es absoluta', () => {
    expect(data.isPathAbsolute(absolutePath2)).toBe(true);
  });
  it('Debe retornar false si la ruta no es absoluta', () => {
    expect(data.isPathAbsolute(relativePath)).toBe(false);
  });
});

describe('transformRelativePath', () => {
 const relativePath = '../DEV009-md-links/docs/textoprueba.md';
 const transformedPath = 'C:\\Users\\LNAnd\\Documents\\Ejercicio-MDLinks\\DEV009-md-links\\docs\\textoprueba.md'
it('Debe entrar una ruta relativa y regresar una ruta absoluta', () => {
  expect(data.transformRelativePath(relativePath)).toBe(transformedPath);
})
});

describe('readFileAbsolutePath', () => {
  test('should return the file content', async () => {
    const absolutePath = 'C:\\Users\\LNAnd\\Documents\\Ejercicio-MDLinks\\DEV009-md-links\\test\\archivoPrueba1.md';
    const expectedFileContent = 'Para comenzar este proyecto tendrás que hacer un fork y clonar este repositorio.';
    expect(await data.readFileAbsolutePath(absolutePath)).toBe(expectedFileContent);
  });
});

describe('getLinksFromFile', () => {
 test('debe retornar un arreglo con un objeto por cada link encontrado, el objeto contiene el texto que lo acompana y la url', () => {
 const fileContent = `[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
 ligero muy popular entre developers.
 [Node.js](https://nodejs.org/es/) es un entorno de ejecución para JavaScript.`;
 const expectedOutput = [{ text: 'Markdown', url: 'https://es.wikipedia.org/wiki/Markdown' }, { text: 'Node.js', url: 'https://nodejs.org/es/' }];
   expect(data.getLinksFromFile(fileContent)).toEqual(expectedOutput);
 })
});

describe('addPathToLinks', () => {
  test('debe aceptar un arreglo de objetos que contienen dos propiedades(text y url) y retornar esos objetos con una propiedad adicional(file)', () => {
    const receivedArray = [{ text: 'Markdown', url: 'https://es.wikipedia.org/wiki/Markdown' }, { text: 'Node.js', url: 'https://nodejs.org/es/' }];
    const receivedPath = 'C:\\Users\\LNAnd\\Documents\\Ejercicio-MDLinks\\DEV009-md-links\\test\\prueba.md';
    const expectedOutput = [{ text: 'Markdown', url: 'https://es.wikipedia.org/wiki/Markdown', file: 'C:\\Users\\LNAnd\\Documents\\Ejercicio-MDLinks\\DEV009-md-links\\test\\prueba.md' }, 
    { text: 'Node.js', url: 'https://nodejs.org/es/', file: 'C:\\Users\\LNAnd\\Documents\\Ejercicio-MDLinks\\DEV009-md-links\\test\\prueba.md' }];
    expect(data.addPathToLinks(receivedArray, receivedPath)).toEqual(expectedOutput);
  })
})

describe('validateFileType', () => {
  it('Debe retornar true si recibe un archivo con una extension valida', () => {
    const filePath = 'ejemplo.mkd'
    expect(data.validateFileType(filePath)).toBe(true);
  });

  it('Debe retornar false si recibe un archivo con una extension valida', () => {
    const filePath = 'ejemplo.ppt'
    expect(data.validateFileType(filePath)).toBe(false);
  });
});

