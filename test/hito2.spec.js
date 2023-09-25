const data = require('../src/data');
const axios = require('axios');

jest.mock('axios');

const arrayOfValids = [
    {
      text: 'Markdown-it',
      url: 'https://www.npmjs.com/package/markdown-it',
      file: 'C:\\Users\\LNAnd\\Documents\\Ejercicio-MDLinks\\DEV009-md-links\\docs\\textoprueba.md'
    },
    {
      text: 'marked',
      url: 'https://github.com/markedjs/marked',
      file: 'C:\\Users\\LNAnd\\Documents\\Ejercicio-MDLinks\\DEV009-md-links\\docs\\textoprueba.md'
    },
    {
      text: 'JSDOM',
      url: 'https://www.npmjs.com/package/jsdom',
      file: 'C:\\Users\\LNAnd\\Documents\\Ejercicio-MDLinks\\DEV009-md-links\\docs\\textoprueba.md'
    },
    {
      text: 'custom renderer de la librería marked',
      url: 'https://marked.js.org/using_pro#renderer',
      file: 'C:\\Users\\LNAnd\\Documents\\Ejercicio-MDLinks\\DEV009-md-links\\docs\\textoprueba.md'
    }
  ];
const resultValidStatus = [
    {
      text: 'Markdown-it',
      url: 'https://www.npmjs.com/package/markdown-it',
      file: 'C:\\Users\\LNAnd\\Documents\\Ejercicio-MDLinks\\DEV009-md-links\\docs\\textoprueba.md',
      status: 200,
      info: 'valid'
    },
    {
      text: 'marked',
      url: 'https://github.com/markedjs/marked',
      file: 'C:\\Users\\LNAnd\\Documents\\Ejercicio-MDLinks\\DEV009-md-links\\docs\\textoprueba.md',
      status: 200,
      info: 'valid'
    },
    {
      text: 'JSDOM',
      url: 'https://www.npmjs.com/package/jsdom',
      file: 'C:\\Users\\LNAnd\\Documents\\Ejercicio-MDLinks\\DEV009-md-links\\docs\\textoprueba.md',
      status: 200,
      info: 'valid'
    },
    {
      text: 'custom renderer de la librería marked',
      url: 'https://marked.js.org/using_pro#renderer',
      file: 'C:\\Users\\LNAnd\\Documents\\Ejercicio-MDLinks\\DEV009-md-links\\docs\\textoprueba.md',
      status: 200,
      info: 'valid'
    }
  ];

const wrongLink = [
    {
        text: 'Cheerio',
        url: 'https://cheerio.js./',
        file: 'C:\\Users\\LNAnd\\Documents\\Ejercicio-MDLinks\\DEV009-md-links\\docs\\textoprueba.md'
      }
];
const wrongResponse = [
    {
        text: 'Cheerio',
        url: 'https://cheerio.js./',
        file: 'C:\\Users\\LNAnd\\Documents\\Ejercicio-MDLinks\\DEV009-md-links\\docs\\textoprueba.md',
        status: 404,
        info: 'broken'
      }
]
describe('linksResponse', () => {
  test('Deberia regresar una respuesta del status en los links validos y agregarla a los objetos', () => {
    axios.get.mockResolvedValue({status: 200});
    return data.linksResponse(arrayOfValids).then(result => {
        expect(result).toEqual(resultValidStatus);
    })
  });
  test('Deberia rechazar con una respuesta del status en los links NO validos y agregarla a los objetos', () => {
    axios.get.mockRejectedValue({code: 'ENOTFOUND'});
    return data.linksResponse(wrongLink).then(result => {
        expect(result).toEqual(wrongResponse);
    })
  });
});
