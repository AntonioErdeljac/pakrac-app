import api from './api';
import client from './client';

export default {
  api,
  build: (path, ...params) => {
    params.reverse();
    return path.replace(/(:\w+)/g, () => params.pop());
  },
  client,
};
