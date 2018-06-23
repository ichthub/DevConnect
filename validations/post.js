const validator = require('validator');
const isEmpty = require('./isEmpty');

const vaidatePost = ({ text }) => {
  /* eslint no-underscore-dangle: "error" */
  const errors = {};
  const _text = !isEmpty(text) ? text : '';

  if (!validator.isLength(_text, { min: 10, max: 300 })) {
    errors.text = 'Text field must be between 10 to 300 charcters';
  }
  if (validator.isEmpty(_text)) {
    errors.text = 'Text field is required';
  }
  /* eslint no-underscore-dangle:0 */

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = vaidatePost;
