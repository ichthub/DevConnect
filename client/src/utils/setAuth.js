import axios from 'axios';

const setAuthToken = token => {
  // creat and delete headers
  if (token) {
    // Apply auth to every request
    axios.defaults.headers.common.Authorization = token;
  } else {
    // delete auth header
    delete axios.defaults.headers.common.Authorization;
  }
};
export default setAuthToken;
