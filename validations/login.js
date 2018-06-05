const validator = require('validator');
const isEmpty = require('./isEmpty');

const vaidateLogin = ({ email, password }) => {
  /* eslint no-underscore-dangle: "error" */
  const errors = {};
  const _email = !isEmpty(email) ? email : '';
  const _password = !isEmpty(password) ? password : '';

  // For Email
  if (!validator.isEmail(_email)) {
    errors.email = 'Invalid email';
  }
  if (validator.isEmpty(_email)) {
    errors.email = 'Email field is required';
  }
  // For password
  if (validator.isEmpty(_password)) {
    errors.password = 'Password field is required';
  }
  /* eslint no-underscore-dangle:0 */

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = vaidateLogin;
