const validator = require('validator');
const isEmpty = require('./isEmpty');

const vaidateLogin = ({ email, password }) => {
  const errors = {};
  email = !isEmpty(email) ? email : '';
  password = !isEmpty(password) ? password : '';

  // For Email
  if (!validator.isEmail(email)) {
    errors.email = 'Invalid email';
  }
  if (validator.isEmpty(email)) {
    errors.email = 'Email field is required';
  }
  // For password
  if (validator.isEmpty(password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = vaidateLogin;
