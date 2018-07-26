import React from 'react';

export default ({ onChange, onSubmit, value }) => (
  <div>
    <form onSubmit={onSubmit}>
      <div className="input-group">
        <input
          className="form-control py-2 border-right-0 border mb-3"
          type="search"
          name="findStatus"
          value={value}
          onChange={onChange}
          placeholder="Search by occupation"
        />
        <span className="input-group-append mb-3">
          <div className="input-group-text bg-transparent">
            <button className="btn btn-primary">
              Search <i className="ml-2 fa fa-search" />
            </button>
          </div>
        </span>
      </div>
    </form>
  </div>
);
