const path = require('path');
const data = require('../src/data');

describe('validateFileType', () => {
 it('Debe ser una funcion', () => {
  expect(typeof data.validateFileType).toBe('function');
 });

 it('Debe retornar true si recibe un archivo con una extension valida', () => {
  jest.spyOn(path).mockImplementationOnce(() => {

  })
 })
});
