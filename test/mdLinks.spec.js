// const mdlinksPromise = require('../src/mdlinks');
// describe('mdlinks', () => {
//   it('should return an array of objects with links', () => {
//     const expectedResult = [
//         {
//           text: 'Markdown-it',
//           url: 'https://www.npmjs.com/package/markdown-it',
//           file: 'C:\\Users\\LNAnd\\Documents\\Ejercicio-MDLinks\\DEV009-md-links\\docs\\testFiles\\textoprueba2.md'
//         },
//         {
//           text: 'marked',
//           url: 'https://github.com/markedjs/marked',
//           file: 'C:\\Users\\LNAnd\\Documents\\Ejercicio-MDLinks\\DEV009-md-links\\docs\\testFiles\\textoprueba2.md'
//         },
//         {
//           text: 'JSDOM',
//           url: 'https://www.npmjs.com/package/jsdom',
//           file: 'C:\\Users\\LNAnd\\Documents\\Ejercicio-MDLinks\\DEV009-md-links\\docs\\testFiles\\textoprueba2.md'
//         },
//         {
//           text: 'Cheerio',
//           url: 'https://cheerio.js./',
//           file: 'C:\\Users\\LNAnd\\Documents\\Ejercicio-MDLinks\\DEV009-md-links\\docs\\testFiles\\textoprueba2.md'
//         },
//         {
//           text: 'custom renderer de la librería marked',
//           url: 'https://marked.js.org/using_pro#renderer',
//           file: 'C:\\Users\\LNAnd\\Documents\\Ejercicio-MDLinks\\DEV009-md-links\\docs\\testFiles\\textoprueba2.md'
//         },
//         {
//           text: 'milestones',
//           url: 'https://docs.github.com/es/issues/using-labels-and-milestones-to-track-work/about-milestones',
//           file: 'C:\\Users\\LNAnd\\Documents\\Ejercicio-MDLinks\\DEV009-md-links\\docs\\testFiles\\textoprueba2.md'
//         }
//       ];
//     mdlinksPromise.mdlinks('docs\\testFiles\\textoprueba2.md').then(links => {
//         expect(links).toEqual(expectedResult);
//     })
//   });
//   it('should return an array of links with stats', () => {
//     mdlinksPromise.mdlinks('docs\\testFiles\\textoprueba2.md', { stats: true }).then(links => {
//         expect(links).toEqual({ Total: 6, Unique: 6 });
//     })
//   });
//   it('should return an array of links with validation', () => {
//     const expectedResult = [
//         {
//           link: 'https://www.google.com',
//           status: 200,
//         },
//         {
//           link: 'https://www.facebook.com',
//           status: 200,
//         },
//         {
//           link: 'https://www.amazon.com',
//           status: 200,
//         },
//       ]
//     mdlinksPromise.mdlinks('docs\\testFiles\\textoprueba2.md', { validate: true }).then(links => {
//         expect(links).toBe(expectedResult);
//     })
    
//   });
// //   it('should return an array of links with validation and stats', async () => {
// //     const links = await mdlinks('./test/fixtures/links.txt', { validate: true, stats: true });
// //     expect(links).toEqual({
// //       Total: 3,
// //       Unique: 3,
// //       Broken: 0,
// //       Links: [
// //         {
// //           link: 'https://www.google.com',
// //           status: 200,
// //         },
// //         {
// //           link: 'https://www.facebook.com',
// //           status: 200,
// //         },
// //         {
// //           link: 'https://www.amazon.com',
// //           status: 200,
// //         },
// //       ],
// //     });
// //   });
// });