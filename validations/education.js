const validator = require('validator');
const isEmpty = require('./isEmpty');

const vaidateEducation = ({ school, degree, fieldofstudy, from }) => {
  /* eslint no-underscore-dangle: "error" */
  const errors = {};
  const _school = !isEmpty(school) ? school : '';
  const _degree = !isEmpty(degree) ? degree : '';
  const _fieldOfStudy = !isEmpty(fieldofstudy) ? fieldofstudy : '';
  const _from = !isEmpty(from) ? from : '';

  if (validator.isEmpty(_school)) {
    errors.school = 'School field is required';
  }
  if (validator.isEmpty(_from)) {
    errors.from = 'From field is required';
  }
  if (validator.isEmpty(_degree)) {
    errors.degree = 'Degree field is required';
  }
  if (validator.isEmpty(_fieldOfStudy)) {
    errors.fieldofstudy = 'Field of study is required';
  }

  /* eslint no-underscore-dangle:0 */

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = vaidateEducation;
