import axios from 'axios';
describe('linksResponse', () => {
  it('should return an array of links with their status and info', async () => {
    const links = [
      {
        url: 'https://www.google.com',
      },
      {
        url: 'https://www.facebook.com',
      },
      {
        url: 'https://www.amazon.com',
      },
    ];
    const expectedLinks = [
      {
        url: 'https://www.google.com',
        status: 200,
        info: 'valid',
      },
      {
        url: 'https://www.facebook.com',
        status: 200,
        info: 'valid',
      },
      {
        url: 'https://www.amazon.com',
        status: 200,
        info: 'valid',
      },
    ];
    const mockAxios = axios.create();
    mockAxios.get.mockImplementation((url) => {
      if (url === 'https://www.google.com') {
        return Promise.resolve({ status: 200 });
      } else if (url === 'https://www.facebook.com') {
        return Promise.resolve({ status: 200 });
      } else if (url === 'https://www.amazon.com') {
        return Promise.resolve({ status: 200 });
      } else {
        return Promise.reject({ code: 404 });
      }
    });
    const actualLinks = await linksResponse(links, mockAxios);
    expect(actualLinks).toEqual(expectedLinks);
  });
});

