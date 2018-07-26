const validator = require('validator');
const isEmpty = require('./isEmpty');

const vaidateProfile = ({
  handle,
  status,
  skills,
  youtube,
  website,
  facebook,
  twitter,
  instagram,
  linkedin,
  phone
}) => {
  const errors = {};
  /* eslint no-underscore-dangle: "error" */
  const _handle = !isEmpty(handle) ? handle : '';
  const _status = !isEmpty(status) ? status : '';
  const _skills = !isEmpty(skills) ? skills : '';
  const _phone = !isEmpty(phone) ? phone : '';

  // For handle
  if (validator.isEmpty(_handle)) {
    errors.handle = 'Handle field is required';
  }
  if (!validator.isLength(_handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle must be between 2 and 40';
  }
  // For phone
  if (validator.isEmpty(_phone)) {
    errors.phone = 'Phone field is required';
  }
  if (!validator.isLength(_phone, { min: 10, max: 10 })) {
    errors.phone = 'Phone must be 10 digits';
  }
  if (!_phone.match(/^\d{10}$/)) {
    errors.phone = 'Incorrect phone number';
  }
  // For status
  if (validator.isEmpty(_status)) {
    errors.status = 'Status field is required';
  }
  // For skills
  if (validator.isEmpty(_skills)) {
    errors.skills = 'Skills field is required';
  }
  // For website
  if (!isEmpty(website)) {
    // chechking for isURL from the beginng will cause an error
    if (!validator.isURL(website)) {
      errors.website = 'Not a valid URL';
    }
  }
  // For Youtube
  if (!isEmpty(youtube)) {
    if (!validator.isURL(youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }
  // For Facebook
  if (!isEmpty(facebook)) {
    if (!validator.isURL(facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }
  // For Instagram
  if (!isEmpty(instagram)) {
    if (!validator.isURL(instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }
  // For Twiter
  if (!isEmpty(twitter)) {
    if (!validator.isURL(twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }
  // For Linkedin
  if (!isEmpty(linkedin)) {
    if (!validator.isURL(linkedin)) {
      errors.linkedin = 'Not a valid URL';
    }
  }

  /* eslint no-underscore-dangle: 0 */

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = vaidateProfile;
