const path = require('path');
const data = require('../src/data');
const fs = require('fs');

describe('validateFileType', () => {
 it('Debe ser una funcion', () => {
  expect(typeof data.validateFileType).toBe('function');
 });

 it('Debe retornar true si recibe un archivo con una extension valida', () => {
 const filePath = 'ejemplo.md'
 expect(data.validateFileType(filePath)).toBe(true);
 })

 it('Debe retornar false si recibe un archivo con una extension valida', () => {
    const filePath = 'ejemplo.ppt'
    expect(data.validateFileType(filePath)).toBe(false);
    })
});

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