const validator = require('validator');
const isEmpty = require('./isEmpty');

const vaidateLogin = ({ email, password }) => {
  /* eslint no-underscore-dangle: "error" */
  const errors = {};
  const _email = !isEmpty(email) ? email : '';
  const _password = !isEmpty(password) ? password : '';

  // For Email
  if (!validator.isEmail(_email)) {
    errors.emaili = 'Invalid email';
  }
  if (validator.isEmpty(_email)) {
    errors.emaili = 'Email field is required';
  }
  // For password
  if (validator.isEmpty(_password)) {
    errors.passwordi = 'Password field is required';
  }
  /* eslint no-underscore-dangle:0 */

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = vaidateLogin;
