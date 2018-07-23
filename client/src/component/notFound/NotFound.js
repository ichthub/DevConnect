import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default () => (
  <div id="notfound">
    <div className="c">
      <div className="_404">404</div>
      <hr />
      <div className="_1">THE PAGE</div>
      <div className="_2">WAS NOT FOUND</div>
      <Link to="/profiles" className="btns">
        Back To Profiles
      </Link>
    </div>
  </div>
);
