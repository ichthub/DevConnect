const validator = require('validator');
const isEmpty = require('./isEmpty');

const vaidateRegister = ({ name, email, password, passwordConfirmation }) => {
  const errors = {};
  /* eslint no-underscore-dangle: "error" */
  const _email = !isEmpty(email) ? email : '';
  const _name = !isEmpty(name) ? name : '';
  const _passwordConfirmation = !isEmpty(passwordConfirmation)
    ? passwordConfirmation
    : '';
  const _password = !isEmpty(password) ? password : '';

  // For name
  if (!validator.isLength(_name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 charcter';
  }
  if (validator.isEmpty(_name)) {
    errors.name = 'Name field is required';
  }
  // For Email
  if (!validator.isEmail(_email)) {
    errors.email = 'Invalid email';
  }
  if (validator.isEmpty(_email)) {
    errors.email = 'Email field is required';
  }
  // For password
  if (!validator.isLength(_password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 charcter';
  }
  if (validator.isEmpty(_password)) {
    errors.password = 'Password field is required';
  }
  // For password confirmation
  if (validator.isEmpty(_passwordConfirmation)) {
    errors.passwordConfirmation = 'Confirmation field is required';
  }
  if (!validator.equals(_password, _passwordConfirmation)) {
    errors.passwordConfirmation = 'Password must match';
  }
  /* eslint no-underscore-dangle: 0 */

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = vaidateRegister;
