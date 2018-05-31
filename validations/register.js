const validator = require('validator');
const isEmpty = require('./isEmpty');

const vaidateRegister = ({ name, email, password, passwordConfirmation }) => {
  const errors = {};
  email = !isEmpty(email) ? email : '';
  name = !isEmpty(name) ? name : '';
  passwordConfirmation = !isEmpty(passwordConfirmation)
    ? passwordConfirmation
    : '';
  password = !isEmpty(password) ? password : '';

  // For name
  if (!validator.isLength(name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 charcter';
  }
  if (validator.isEmpty(email)) {
    errors.name = 'Name field is required';
  }
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
  if (!validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 2 and 30 charcter';
  }

  // For password confirmation
  if (validator.isEmpty(passwordConfirmation)) {
    errors.passwordConfirmation = 'Confirmation field is required';
  }
  if (!validator.equals(password, passwordConfirmation)) {
    errors.passwordConfirmation = 'Password must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = vaidateRegister;
