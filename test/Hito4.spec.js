const data = require('../src/data');

describe('linksStats', () => {
    it('should return an object with the total number of links and the number of unique links', () => {
      const links = [
        { url: 'https://www.google.com' },
        { url: 'https://www.facebook.com' },
        { url: 'https://www.amazon.com' },
        { url: 'https://www.google.com' },
      ];
      const expectedResult = { Total: 4, Unique: 3 };
      const result = data.linksStats(links);
      expect(result).toEqual(expectedResult);
    });
    it('should return the number of broken links', () => {
        const links = [
          { url: 'https://www.google.com', info: 'ok' },
          { url: 'https://www.facebook.com', info: 'fail' },
          { url: 'https://www.amazon.com', info: 'ok' },
          { url: 'https://www.microsoft.com', info: 'fail' },
        ];
        const expectedResult = 2;
        const result = data.linkValidateStats(links);
        expect(result).toEqual(expectedResult);
      });
  });

  