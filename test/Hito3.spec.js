const data = require('../src/data');
const fs = require('fs');

describe('isFile', () => {

    it('Debe ser una funcion', () => {
      expect(typeof data.isFile).toBe('function');
    });
  
    it('Debe retornar false si fs.lstatSync.isFile retorna false', () => {
      jest.spyOn(fs, 'lstatSync').mockImplementationOnce(() => {
        return {
          isFile: () => {
            return false;
          }
        }
      })
  
      const result = data.isFile('string');
  
      expect(result).toBe(false);
    })
  
    it('Debe llamar a la funcion fs.lstatSync', () => {
      jest.spyOn(fs, 'lstatSync').mockImplementationOnce(() => {
        return {
          isFile: () => {
            return false;
          }
        }
      })
  
      data.isFile('string');

      expect(fs.lstatSync).toHaveBeenCalledWith('string')
    })
  
  })