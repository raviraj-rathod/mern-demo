const BASE_URL = 'http://localhost:8000/';
export default class API {
  _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else if (response.status === 401) {
      return response;
    } else {
      throw new Error(response);
    }
  }

  async fetch(url, options) {
    try {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };
      const response = await fetch(`${BASE_URL}${url}`, {
        ...options,
        headers,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch Error:', error);
      throw new Error('Failed to fetch data');
    }
  }
}
