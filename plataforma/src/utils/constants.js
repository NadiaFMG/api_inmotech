// // export const REACT_APP_API_BASE_URL = 'http://localhost:3000/api';

export const REACT_APP_API_BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api'
    : 'http://192.168.20.21:3000/api';

// export const REACT_APP_API_BASE_URL = 'http://192.168.20.21:3000/api';