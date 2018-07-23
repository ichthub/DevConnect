import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextareaField = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
  isDisabled
}) => (
  <div className="form-group">
    <textarea
      className={classnames(' form-control form-control-lg', {
        'is-invalid': error
      })}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      value={value}
    />
    {info && <small className="form-text text-muted">{info}</small>}
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);
TextareaField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextareaField;
