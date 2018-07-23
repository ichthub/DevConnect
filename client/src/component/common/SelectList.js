import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectList = ({ name, value, error, info, onChange, options }) => {
  const selectedOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className="form-group">
      <select
        className={classnames(' form-control form-control-lg', {
          'is-invalid': error
        })}
        name={name}
        onChange={onChange}
        value={value}
      >
        {selectedOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
SelectList.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(String)
};

export default SelectList;
