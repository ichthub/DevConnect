const validator = require('validator');
const isEmpty = require('./isEmpty');

const vaidateExperience = ({ company, title, from }) => {
  /* eslint no-underscore-dangle: "error" */
  const errors = {};
  const _company = !isEmpty(company) ? company : '';
  const _title = !isEmpty(title) ? title : '';
  const _from = !isEmpty(from) ? from : '';

  // for title
  if (validator.isEmpty(_title)) {
    errors.title = 'Title field is required';
  }
  // for company
  if (validator.isEmpty(_company)) {
    errors.company = 'Company field is required';
  }
  // for from field
  if (validator.isEmpty(_from)) {
    errors.from = 'From date field is required';
  }
  /* eslint no-underscore-dangle:0 */

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = vaidateExperience;
